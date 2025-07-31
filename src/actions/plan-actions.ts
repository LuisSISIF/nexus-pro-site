'use server';

import { db } from '@/lib/db';
import { z } from 'zod';

const updatePlanSchema = z.object({
  companyId: z.number().int().positive("ID da empresa inválido."),
  newPlanId: z.number().int().positive("ID do plano inválido."),
});

/**
 * Atualiza o plano de uma empresa no banco de dados.
 * @param companyId O ID da empresa a ser atualizada.
 * @param newPlanId O ID do novo plano a ser atribuído.
 * @returns Um objeto indicando sucesso ou falha com uma mensagem.
 */
export async function updateCompanyPlan(companyId: number, newPlanId: number): Promise<{ success: boolean; message: string }> {
  const validation = updatePlanSchema.safeParse({ companyId, newPlanId });

  if (!validation.success) {
    const firstError = validation.error.errors[0].message;
    return { success: false, message: firstError };
  }

  let connection;
  try {
    connection = await db();

    // Primeiro, verifica se a empresa existe
    const [companyRows] = await connection.execute('SELECT idempresa FROM empresa WHERE idempresa = ?', [companyId]);
    if ((companyRows as any[]).length === 0) {
      return { success: false, message: 'Empresa não encontrada.' };
    }

    // Atualiza o plano da empresa
    const [updateResult] = await connection.execute(
      'UPDATE empresa SET idPlano = ? WHERE idempresa = ?',
      [newPlanId, companyId]
    );

    const affectedRows = (updateResult as any).affectedRows;

    if (affectedRows > 0) {
      // TODO: Futuramente, adicionar lógica para comunicar o Asaas sobre a mudança de plano.
      return { success: true, message: 'Plano alterado com sucesso!' };
    } else {
      return { success: false, message: 'A alteração do plano não pode ser concluída. O plano atual já pode ser o selecionado.' };
    }

  } catch (error) {
    console.error('Error updating company plan:', error);
    if (error instanceof Error && (error as any).sqlMessage) {
        return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
    }
    return { success: false, message: 'Ocorreu um erro no servidor ao tentar alterar o plano.' };
  } finally {
    if (connection) await connection.end();
  }
}
