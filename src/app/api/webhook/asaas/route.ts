'use server';

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Este é o seu endpoint de webhook.
// O ASAAS enviará uma notificação (requisição POST) para esta URL 
// sempre que houver uma atualização em uma cobrança.

export async function POST(req: NextRequest) {
  try {
    const event = await req.json();

    // Log para depuração - você pode ver isso nos logs do seu servidor.
    console.log('Webhook do ASAAS recebido:', event);

    // TODO: Adicionar lógica para processar o evento.
    // Exemplo:
    // if (event.event === 'PAYMENT_RECEIVED') {
    //   const paymentId = event.payment.id;
    //   const customerId = event.payment.customer;
    //
    //   // Aqui você atualizaria o status do pagamento no seu banco de dados
    //   const connection = await db();
    //   await connection.execute(
    //     "UPDATE empresa SET pagamentoMes = 'Pago' WHERE asaasCustomerId = ?", 
    //     [customerId]
    //   );
    //   await connection.end();
    // }

    // É crucial retornar uma resposta 200 OK para o ASAAS
    // para que eles saibam que o webhook foi recebido com sucesso.
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error('Erro ao processar webhook do ASAAS:', error);
    // Retorna um erro, mas o ASAAS pode tentar reenviar o webhook.
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 });
  }
}
