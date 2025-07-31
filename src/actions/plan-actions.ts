
'use server';

import { db } from '@/lib/db';
import { z } from 'zod';

const ASAAS_API_URL = process.env.ASAAS_API_URL;
const ASAAS_API_KEY = "$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmFlOGZkNGIyLWRkMzktNGUyZS1iZmIxLTg2MjgyZjUxNWM0ZTo6JGFhY2hfMzhiZTZlZmQtODVmZi00YzgwLTlhOWUtNjVkNGJmZDIwY2U5";

const updatePlanSchema = z.object({
  companyId: z.number().int().positive("ID da empresa inválido."),
  newPlanId: z.number().int().positive("ID do plano inválido."),
  newPlanPrice: z.number().positive("Preço do plano inválido."),
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


export async function updateCompanyPlan(companyId: number, newPlanId: number, newPlanPrice: number): Promise<{ success: boolean; message: string }> {
    const validation = updatePlanSchema.safeParse({ companyId, newPlanId, newPlanPrice });
    if (!validation.success) {
        const firstError = validation.error.errors[0].message;
        return { success: false, message: firstError };
    }

    let connection;
    try {
        connection = await db();
        await connection.beginTransaction();

        // 1. Buscar dados da empresa, incluindo o idAsaas e a data da última alteração
        const [companyRows] = await connection.execute(
            'SELECT idempresa, idAsaas, ultimaAlteracaoPlano FROM empresa WHERE idempresa = ?', 
            [companyId]
        );
        const company = (companyRows as any[])[0];

        if (!company) {
            await connection.rollback();
            return { success: false, message: 'Empresa não encontrada.' };
        }
        
        // 2. Verificar a regra de 30 dias para alteração
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


        // 3. Atualizar o plano no banco de dados local
        const [updateResult] = await connection.execute(
            'UPDATE empresa SET idPlano = ?, ultimaAlteracaoPlano = NOW() WHERE idempresa = ?',
            [newPlanId, companyId]
        );

        if ((updateResult as any).affectedRows === 0) {
            await connection.rollback();
            return { success: false, message: 'Nenhuma alteração foi necessária. O plano selecionado já pode ser o seu plano atual.' };
        }
        
        // 4. Lógica para atualizar a assinatura e cobranças futuras no Asaas
        if (company.idAsaas) {
            // A. ATUALIZAR A ASSINATURA PRINCIPAL
            const subResponse = await fetch(`${ASAAS_API_URL}/subscriptions?customer=${company.idAsaas}`, {
                headers: { 'access_token': ASAAS_API_KEY! }
            });

            if (!subResponse.ok) {
                 await connection.rollback();
                 console.error('Erro ao buscar assinatura no Asaas:', await subResponse.text());
                 return { success: false, message: 'Não foi possível consultar a assinatura no provedor de pagamento. A alteração foi revertida.' };
            }

            const subData = await subResponse.json();
            const activeSubscription: AsaasSubscription | undefined = subData.data.find((s: AsaasSubscription) => s.status === 'ACTIVE');
            
            if (activeSubscription) {
                const updateSubResponse = await fetch(`${ASAAS_API_URL}/subscriptions/${activeSubscription.id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'access_token': ASAAS_API_KEY! },
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

            // B. ATUALIZAR AS COBRANÇAS PENDENTES FUTURAS
            const paymentsResponse = await fetch(`${ASAAS_API_URL}/payments?customer=${company.idAsaas}&status=PENDING`, {
                headers: { 'access_token': ASAAS_API_KEY! }
            });
            if (paymentsResponse.ok) {
                const paymentsData = await paymentsResponse.json();
                const pendingPayments: AsaasPayment[] = paymentsData.data;

                const today = new Date();
                const firstDayOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

                for (const payment of pendingPayments) {
                    const dueDate = new Date(payment.dueDate);
                    // Se a cobrança vencer a partir do próximo mês e o valor for diferente
                    if (dueDate >= firstDayOfNextMonth && payment.value !== newPlanPrice) {
                        console.log(`Atualizando cobrança futura ${payment.id} para o valor R$ ${newPlanPrice}`);
                        await fetch(`${ASAAS_API_URL}/payments/${payment.id}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'access_token': ASAAS_API_KEY! },
                            body: JSON.stringify({ value: newPlanPrice }),
                        });
                         // Não vamos reverter o processo por falha em atualizar uma cobrança, apenas logar.
                    }
                }
            } else {
                console.error('Erro ao buscar cobranças pendentes no Asaas:', await paymentsResponse.text());
            }

        } else {
            console.warn(`Empresa ${companyId} não possui um idAsaas. A alteração de plano não foi refletida no gateway de pagamento.`);
        }

        await connection.commit();
        return { success: true, message: 'Plano alterado com sucesso! O novo valor será refletido na sua próxima fatura.' };

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
