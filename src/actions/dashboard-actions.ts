'use server';

import { db } from '@/lib/db';

/**
 * Busca o número total de clientes para uma empresa específica.
 * @param companyId O ID da empresa.
 * @returns Uma promessa que resolve para um objeto com o total de clientes.
 */
export async function getTotalClients(companyId: number): Promise<{ total: number }> {
  if (!companyId) {
    throw new Error("ID da empresa não fornecido.");
  }

  const connection = await db();

  try {
    const query = 'SELECT COUNT(id) as total FROM clientes WHERE idempresa = ?';
    const [rows] = await connection.execute(query, [companyId]);
    
    const totalClients = (rows as any[])[0]?.total || 0;
    
    return { total: totalClients };

  } catch (error) {
    console.error('Error fetching total clients:', error);
    throw new Error('Ocorreu um erro no servidor ao buscar o total de clientes.');
  } finally {
    await connection.end();
  }
}

/**
 * Busca o número de novos clientes cadastrados no mês atual para uma empresa específica.
 * @param companyId O ID da empresa.
 * @returns Uma promessa que resolve para um objeto com o total de novos clientes.
 */
export async function getNewClientsThisMonth(companyId: number): Promise<{ total: number }> {
    if (!companyId) {
        throw new Error("ID da empresa não fornecido.");
    }

    const connection = await db();

    try {
        const query = `
            SELECT COUNT(id) as total 
            FROM clientes 
            WHERE idempresa = ? 
            AND MONTH(dataCadastro) = MONTH(CURDATE()) 
            AND YEAR(dataCadastro) = YEAR(CURDATE())
        `;
        const [rows] = await connection.execute(query, [companyId]);

        const totalNewClients = (rows as any[])[0]?.total || 0;

        return { total: totalNewClients };

    } catch (error) {
        console.error('Error fetching new clients this month:', error);
        throw new Error('Ocorreu um erro no servidor ao buscar os novos clientes.');
    } finally {
        await connection.end();
    }
}

/**
 * Busca estatísticas de produtos para uma empresa específica.
 * @param companyId O ID da empresa.
 * @returns Uma promessa que resolve para um objeto com o total de produtos e o total de produtos ativos.
 */
export async function getProductStats(companyId: number): Promise<{ total: number; totalActive: number }> {
    if (!companyId) {
        throw new Error("ID da empresa não fornecido.");
    }

    const connection = await db();

    try {
        const query = `
            SELECT 
                COUNT(idprodutos) as total, 
                SUM(CASE WHEN statusProd = 'Ativo' THEN 1 ELSE 0 END) as totalActive
            FROM produtos 
            WHERE idempresa = ?
        `;
        const [rows] = await connection.execute(query, [companyId]);

        const stats = (rows as any[])[0];
        
        return {
            total: Number(stats.total) || 0,
            totalActive: Number(stats.totalActive) || 0,
        };

    } catch (error) {
        console.error('Error fetching product stats:', error);
        throw new Error('Ocorreu um erro no servidor ao buscar as estatísticas de produtos.');
    } finally {
        await connection.end();
    }
}
