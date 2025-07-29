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
