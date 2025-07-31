'use server';

import { db } from '@/lib/db';
import { z } from 'zod';

const ASAAS_API_URL = process.env.ASAAS_API_URL;
const ASAAS_API_KEY = "$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmFlOGZkNGIyLWRkMzktNGUyZS1iZmIxLTg2MjgyZjUxNWM0ZTo6JGFhY2hfMzhiZTZlZmQtODVmZi00YzgwLTlhOWUtNjVkNGJmZDIwY2U5";

// Mapeamento centralizado de planos e seus preços
export const plans = [
    { id: 3, name: "Essencial", price: 80.00 },
    { id: 4, name: "Profissional", price: 120.00 },
    { id: 5, name: "Empresarial", price: 190.00 },
];

const updatePlanSchema = z.object({
  companyId: z.number().int().positive("ID da empresa inválido."),
  newPlanId: z.number().int().positive("ID do plano inválido."),
});

interface AsaasSubscription {
    id: string;
    status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
}


export async function updateCompanyPlan(companyId: number, newPlanId: number): Promise<{ success: boolean; message: string }> {
    const validation = updatePlanSchema.safeParse({ companyId, newPlanId });
    if (!validation.success) {
        const firstError = validation.error.errors[0].message;
        return { success: false, message: firstError };
    }

    const newPlan = plans.find(p => p.id === newPlanId);
    if (!newPlan) {
        return { success: false, message: 'Plano selecionado não é válido.' };
    }

    let connection;
    try {
        connection = await db();
        await connection.beginTransaction();

        // 1. Buscar dados da empresa, incluindo o idAsaas
        const [companyRows] = await connection.execute('SELECT idempresa, idAsaas FROM empresa WHERE idempresa = ?', [companyId]);
        const company = (companyRows as any[])[0];

        if (!company) {
            return { success: false, message: 'Empresa não encontrada.' };
        }

        // 2. Atualizar o plano no banco de dados local
        const [updateResult] = await connection.execute(
            'UPDATE empresa SET idPlano = ? WHERE idempresa = ?',
            [newPlanId, companyId]
        );

        if ((updateResult as any).affectedRows === 0) {
            await connection.rollback();
            return { success: false, message: 'Nenhuma alteração foi necessária. O plano selecionado já pode ser o seu plano atual.' };
        }
        
        // 3. Lógica para atualizar a assinatura no Asaas
        if (company.idAsaas) {
            // Buscar a assinatura ativa do cliente no Asaas
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
                // Se houver uma assinatura ativa, atualize-a
                const updateSubResponse = await fetch(`${ASAAS_API_URL}/subscriptions/${activeSubscription.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'access_token': ASAAS_API_KEY!,
                    },
                    body: JSON.stringify({
                        value: newPlan.price,
                        // Você pode adicionar mais campos aqui se necessário, como description
                        // description: `Novo plano: ${newPlan.name}`
                    }),
                });

                if (!updateSubResponse.ok) {
                    await connection.rollback();
                    console.error('Erro ao atualizar assinatura no Asaas:', await updateSubResponse.text());
                    return { success: false, message: 'Houve um erro ao atualizar sua assinatura no provedor de pagamento. A alteração foi revertida.' };
                }
            } else {
                 console.warn(`Nenhuma assinatura ativa encontrada para o cliente Asaas ${company.idAsaas}. A cobrança pode precisar ser criada manualmente.`);
                 // Se não houver assinatura, pode ser necessário criar uma nova.
                 // Por ora, apenas registramos o aviso. A lógica de criação pode ser adicionada aqui.
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
