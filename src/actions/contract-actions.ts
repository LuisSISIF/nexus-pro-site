'use server';

import { db } from '@/lib/db';

export interface ContractData {
    idempresa: number;
    nome_empresa: string;
    idPlano: number;
    periodoTesteInicio: string | null;
    periodoTesteFim: string | null;
    qtdFunc: number;
    qtdLojas: number;
    nomePlano: string;
    limiteUsuarios: number;
    limiteLojas: number;
    usersAdicionais: number;
    diaVencimento: number;
    pagamentoMes: string | null;
}

export async function getContractData(companyId: number): Promise<{ success: boolean; message: string; data?: ContractData }> {
  if (!companyId) {
    return { success: false, message: "ID da empresa não fornecido." };
  }

  const connection = await db();

  try {
    const query = `
        SELECT 
            e.idempresa,
            e.nome_empresa,
            e.idPlano,
            e.periodoTesteInicio,
            e.periodoTesteFim,
            e.qtdFunc,
            e.qtdLojas,
            e.usersAdicionais,
            e.diaVencimento,
            e.pagamentoMes,
            p.nomePlano,
            p.limiteUsuarios,
            p.limiteLojas
        FROM empresa e
        JOIN planos p ON e.idPlano = p.idplanos
        WHERE e.idempresa = ?
    `;
    
    const [rows] = await connection.execute(query, [companyId]);

    if ((rows as any[]).length > 0) {
      const data = (rows as any[])[0] as ContractData;
      return { success: true, message: 'Dados encontrados com sucesso.', data };
    } else {
      return { success: false, message: 'Nenhum dado contratual encontrado para esta empresa.' };
    }
  } catch (error) {
    console.error('Error fetching contract data:', error);
    if (error instanceof Error && (error as any).sqlMessage) {
        return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
    }
    return { success: false, message: 'Ocorreu um erro no servidor ao buscar os dados do contrato.' };
  } finally {
    await connection.end();
  }
}
