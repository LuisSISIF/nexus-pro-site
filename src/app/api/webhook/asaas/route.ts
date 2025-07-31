
'use server';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Este é o seu endpoint de webhook.
// O ASAAS enviará uma notificação (requisição POST) para esta URL 
// sempre que houver uma atualização em uma cobrança.

interface AsaasEvent {
    event: string;
    payment: {
        id: string;
        customer: string;
        // Outros campos do pagamento que podem ser úteis
    }
}

export async function POST(req: NextRequest) {
  let connection;
  try {
    const event: AsaasEvent = await req.json();

    // Log para depuração - você pode ver isso nos logs do seu servidor.
    console.log('Webhook do ASAAS recebido:', JSON.stringify(event, null, 2));

    // Verifica se o evento é de pagamento recebido
    if (event.event === 'PAYMENT_RECEIVED') {
      const customerId = event.payment.customer;

      if (!customerId) {
        console.error('Webhook do Asaas: ID do cliente não encontrado no evento.');
        // Retornamos 200 para o Asaas não reenviar, mas logamos o erro.
        return NextResponse.json({ received: true, message: "ID do cliente não fornecido no payload." }, { status: 200 });
      }
      
      console.log(`Processando pagamento recebido para o cliente Asaas ID: ${customerId}`);

      // Atualiza o status do pagamento no banco de dados
      connection = await db();
      const [result] = await connection.execute(
        "UPDATE empresa SET pagamentoMes = 'Pago' WHERE idAsaas = ?", 
        [customerId]
      );
      
      const updateResult = result as any;

      if (updateResult.affectedRows > 0) {
        console.log(`Status de pagamento atualizado para 'Pago' para o cliente Asaas ID: ${customerId}`);
      } else {
        console.warn(`Nenhuma empresa encontrada com o ID Asaas: ${customerId}. Nenhuma atualização realizada.`);
      }

    }

    // É crucial retornar uma resposta 200 OK para o ASAAS
    // para que eles saibam que o webhook foi recebido com sucesso.
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Erro ao processar webhook do ASAAS:', error);
    // Retorna um erro, mas o ASAAS pode tentar reenviar o webhook.
    // Mesmo em caso de erro no nosso processamento, retornamos 200 para evitar reenvios em loop.
    // A depuração deve ser feita através dos logs.
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ received: true, error: errorMessage }, { status: 200 });
  } finally {
      if (connection) await connection.end();
  }
}
