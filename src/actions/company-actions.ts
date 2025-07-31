
'use server';

import { db } from '@/lib/db';
import { z } from 'zod';
import { isValidCNPJ } from '@/lib/validators';
import { createAsaasCustomer } from './asaas-actions';

const registrationSchema = z.object({
  companyId: z.number(),
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido."),
  inscricaoEstadual: z.string().min(1, "Inscrição Estadual é obrigatória."),
  regimeTributario: z.string(),
  segmentoMercado: z.string().min(3, "Segmento de mercado é obrigatório."),
  diaVencimento: z.string(),
  emailComercial: z.string().email("E-mail comercial inválido."),
  instagram: z.string().optional(),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export async function completeCompanyRegistration(data: RegistrationFormValues): Promise<{ success: boolean; message: string }> {
  const validation = registrationSchema.safeParse(data);

  if (!validation.success) {
    const firstError = validation.error.errors[0].message;
    return { success: false, message: firstError };
  }

  const {
    companyId,
    cnpj,
    inscricaoEstadual,
    regimeTributario,
    segmentoMercado,
    diaVencimento,
    emailComercial,
    instagram,
  } = validation.data;

  let connection;
  try {
    connection = await db();
    await connection.beginTransaction();
    
    // 1. Atualizar os dados da empresa no banco de dados
    const updateQuery = `
      UPDATE empresa SET 
        cnpj_empresa = ?, 
        inscricaoEstadual = ?, 
        regimeTributario = ?, 
        segmentoMercado = ?, 
        diaVencimento = ?, 
        emailComercial = ?, 
        instagram = ? 
      WHERE idempresa = ?
    `;
    await connection.execute(updateQuery, [
      cnpj,
      inscricaoEstadual,
      parseInt(regimeTributario),
      segmentoMercado,
      parseInt(diaVencimento),
      emailComercial,
      instagram || '',
      companyId,
    ]);

    // 2. Buscar dados atualizados para criar o cliente no Asaas
    const [companyRows] = await connection.execute('SELECT nome_empresa, endereco FROM empresa WHERE idempresa = ?', [companyId]);
    const companyInfo = (companyRows as any[])[0];
    
    // Precisamos buscar o telefone do usuário administrador que se cadastrou
    const [userRows] = await connection.execute('SELECT contato FROM usuarios WHERE idempresa = ? AND admUser = 1 ORDER BY idusuarios ASC LIMIT 1', [companyId]);
    const userInfo = (userRows as any[])[0];

    if (!companyInfo || !userInfo) {
      await connection.rollback();
      return { success: false, message: 'Não foi possível encontrar os dados da empresa ou usuário para o faturamento.' };
    }

    // 3. Criar cliente no Asaas
    const asaasResult = await createAsaasCustomer({
      name: companyInfo.nome_empresa,
      cpfCnpj: cnpj,
      email: emailComercial,
      phone: userInfo.contato, // Usando o telefone do usuário admin
      address: companyInfo.endereco,
    });

    if (!asaasResult.success || !asaasResult.customerId) {
      await connection.rollback(); 
      return { success: false, message: asaasResult.message };
    }

    // 4. Atualizar o idAsaas na tabela empresa
    await connection.execute('UPDATE empresa SET idAsaas = ? WHERE idempresa = ?', [asaasResult.customerId, companyId]);

    // Se tudo deu certo, comita a transação
    await connection.commit();
    return { success: true, message: 'Dados da empresa atualizados e cliente criado no Asaas com sucesso!' };

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Company Registration Error:', error);
    if (error instanceof Error && (error as any).sqlMessage) {
      return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
    }
    return { success: false, message: 'Ocorreu um erro no servidor ao tentar finalizar o cadastro.' };
  } finally {
    if (connection) await connection.end();
  }
}
