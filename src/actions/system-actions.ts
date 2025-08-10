
'use server';

import { db } from '@/lib/db';

export async function getSystemVersion(): Promise<{ success: boolean; version?: string; message: string }> {
  let connection;
  try {
    connection = await db();
    const [rows] = await connection.execute('SELECT versaoAtual FROM dadossistema LIMIT 1');
    const systemData = (rows as any[])[0];

    if (systemData && systemData.versaoAtual) {
      return { success: true, version: systemData.versaoAtual, message: 'Versão encontrada.' };
    } else {
      return { success: false, message: 'Versão do sistema não encontrada no banco de dados.' };
    }
  } catch (error) {
    console.error('Get System Version Error:', error);
    if (error instanceof Error && (error as any).sqlMessage) {
        return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
    }
    return { success: false, message: 'Ocorreu um erro no servidor ao buscar a versão do sistema.' };
  } finally {
    if (connection) await connection.end();
  }
}
