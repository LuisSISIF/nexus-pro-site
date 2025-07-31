
'use server';

import { db } from '@/lib/db';
import { z } from 'zod';
import { createAsaasSubscription, createAsaasProrataCharge } from './asaas-actions';

const updatePlanSchema = z.object({
  companyId: z.number().int().positive("ID da empresa inválido."),
  newPlanId: z.number().int().positive("ID do plano inválido."),
  newPlanPrice: z.number().positive("Preço do plano inválido."),
  newPlanName: z.string().min(1, "Nome do plano inválido."),
});

interface AsaasSubscription {
    id: string;
    status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
}

interface AsaasPayment {
    id: string;
    status: 'PENDING' | 'CONFIRMED' | 'RECEIVED' | 'RECEIVED_IN_CASH' | 'OVERDUE' | 'REFUNDED' | 'DUNNING_REQUESTED' | 'AWAITING_RISK_ANALYSIS';
    dueDate: string;
    value: number;
}


export async function updateCompanyPlan(
    companyId: number, 
    newPlanId: number, 
    newPlanPrice: number,
    newPlanName: string
): Promise<{ success: boolean; message: string }> {

    const validation = updatePlanSchema.safeParse({ companyId, newPlanId, newPlanPrice, newPlanName });
    if (!validation.success) {
        const firstError = validation.error.errors[0].message;
        return { success: false, message: firstError };
    }

    let connection;
    try {
        connection = await db();
        await connection.beginTransaction();

        // 1. Buscar dados da empresa, incluindo o plano atual e idAsaas
        const [companyRows] = await connection.execute(
            'SELECT idempresa, idPlano, idAsaas, diaVencimento, ultimaAlteracaoPlano FROM empresa WHERE idempresa = ?', 
            [companyId]
        );
        const company = (companyRows as any[])[0];

        if (!company || !company.idAsaas) {
            await connection.rollback();
            return { success: false, message: 'Dados da empresa ou ID de faturamento não encontrados.' };
        }
        
        const currentPlanId = company.idPlano;

        // SE O USUÁRIO ESTÁ SAINDO DO PLANO DE TESTE (ID 2)
        if (currentPlanId === 2) {
            // Criar a assinatura principal
            const subscriptionResult = await createAsaasSubscription({
                customerId: company.idAsaas,
                planPrice: newPlanPrice,
                planName: newPlanName,
                dueDateDay: company.diaVencimento
            });
            
            if (!subscriptionResult.success) {
                await connection.rollback();
                return { success: false, message: `Falha ao criar assinatura: ${subscriptionResult.message}` };
            }
            
            // Criar a cobrança proporcional
            const prorataResult = await createAsaasProrataCharge({
                customerId: company.idAsaas,
                planPrice: newPlanPrice,
                planName: newPlanName, // Passando o nome do plano
                dueDateDay: company.diaVencimento,
            });

            if (!prorataResult.success) {
                 await connection.rollback();
                 // Idealmente, aqui deveria cancelar a assinatura recém-criada, mas a API do Asaas pode não permitir isso instantaneamente.
                 // Por enquanto, apenas revertemos o banco e informamos o erro.
                 return { success: false, message: `Falha ao criar cobrança proporcional: ${prorataResult.message}` };
            }
            
        // LÓGICA PARA QUEM JÁ É CLIENTE PAGO E ESTÁ APENAS TROCANDO DE PLANO
        } else {
             // Verificar a regra de 30 dias para alteração
            if (company.ultimaAlteracaoPlano) {
                const lastChangeDate = new Date(company.ultimaAlteracaoPlano);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

                if (lastChangeDate > thirtyDaysAgo) {
                    await connection.rollback();
                    const nextAvailableDate = new Date(lastChangeDate);
                    nextAvailableDate.setDate(nextAvailableDate.getDate() + 30);
                    return { 
                        success: false, 
                        message: `Você só pode alterar seu plano a cada 30 dias. Próxima alteração disponível em: ${nextAvailableDate.toLocaleDateString('pt-BR')}.` 
                    };
                }
            }

            // ATUALIZAR A ASSINATURA PRINCIPAL no Asaas
            const subResponse = await fetch(`${process.env.ASAAS_API_URL}/subscriptions?customer=${company.idAsaas}`, {
                headers: { 'access_token': process.env.ASAAS_API_KEY! }
            });

            if (!subResponse.ok) {
                 await connection.rollback();
                 console.error('Erro ao buscar assinatura no Asaas:', await subResponse.text());
                 return { success: false, message: 'Não foi possível consultar a assinatura no provedor de pagamento. A alteração foi revertida.' };
            }

            const subData = await subResponse.json();
            const activeSubscription: AsaasSubscription | undefined = subData.data.find((s: AsaasSubscription) => s.status === 'ACTIVE');
            
            if (activeSubscription) {
                const updateSubResponse = await fetch(`${process.env.ASAAS_API_URL}/subscriptions/${activeSubscription.id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'access_token': process.env.ASAAS_API_KEY! },
                    body: JSON.stringify({ value: newPlanPrice }),
                });

                if (!updateSubResponse.ok) {
                    await connection.rollback();
                    console.error('Erro ao atualizar assinatura no Asaas:', await updateSubResponse.text());
                    return { success: false, message: 'Houve um erro ao atualizar sua assinatura. A alteração foi revertida.' };
                }
            } else {
                 console.warn(`Nenhuma assinatura ativa encontrada para o cliente Asaas ${company.idAsaas}. A cobrança pode precisar ser criada manualmente.`);
            }

            // ATUALIZAR AS COBRANÇAS PENDENTES FUTURAS
            const paymentsResponse = await fetch(`${process.env.ASAAS_API_URL}/payments?customer=${company.idAsaas}&status=PENDING`, {
                headers: { 'access_token': process.env.ASAAS_API_KEY! }
            });
            if (paymentsResponse.ok) {
                const paymentsData = await paymentsResponse.json();
                const pendingPayments: AsaasPayment[] = paymentsData.data;

                const today = new Date();
                const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

                for (const payment of pendingPayments) {
                    const dueDate = new Date(payment.dueDate);
                    if (dueDate >= firstDayOfNextMonth && payment.value !== newPlanPrice) {
                        console.log(`Atualizando cobrança futura ${payment.id} para o valor R$ ${newPlanPrice}`);
                        await fetch(`${process.env.ASAAS_API_URL}/payments/${payment.id}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'access_token': process.env.ASAAS_API_KEY! },
                            body: JSON.stringify({ value: newPlanPrice }),
                        });
                    }
                }
            } else {
                console.error('Erro ao buscar cobranças pendentes no Asaas:', await paymentsResponse.text());
            }
        }

        // Atualizar o plano no banco de dados local após o sucesso das operações no Asaas
        const [updateResult] = await connection.execute(
            'UPDATE empresa SET idPlano = ?, ultimaAlteracaoPlano = NOW() WHERE idempresa = ?',
            [newPlanId, companyId]
        );

        if ((updateResult as any).affectedRows === 0) {
            await connection.rollback();
            return { success: false, message: 'Nenhuma alteração foi necessária no banco de dados. O plano selecionado já pode ser o seu plano atual.' };
        }

        await connection.commit();
        
        const successMessage = currentPlanId === 2 
            ? 'Plano contratado e assinatura criada com sucesso! Verifique a cobrança proporcional e a sua nova assinatura.'
            : 'Plano alterado com sucesso! O novo valor será refletido na sua próxima fatura.';

        return { success: true, message: successMessage };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Error updating company plan:', error);
        const errorMessage = (error instanceof Error && (error as any).sqlMessage) 
            ? `Erro no banco de dados: ${(error as any).sqlMessage}`
            : 'Ocorreu um erro no servidor ao tentar alterar o plano.';
        return { success: false, message: errorMessage };
    } finally {
        if (connection) await connection.end();
    }
}

    