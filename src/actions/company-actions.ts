
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
      instagram,
      companyId,
    ]);

    // 2. Buscar dados atualizados para criar o cliente no Asaas
    const [companyRows] = await connection.execute('SELECT nome_empresa, endereco, telefone FROM empresa WHERE idempresa = ?', [companyId]);
    const companyInfo = (companyRows as any[])[0];

    if (!companyInfo) {
      await connection.rollback();
      return { success: false, message: 'Não foi possível encontrar os dados da empresa após a atualização.' };
    }

    // 3. Criar cliente no Asaas
    const asaasResult = await createAsaasCustomer({
      name: companyInfo.nome_empresa,
      cpfCnpj: cnpj,
      email: emailComercial,
      phone: companyInfo.telefone,
      address: companyInfo.endereco,
      companyId: companyId, // Passa o companyId para a função do Asaas fazer o update final
    });

    if (!asaasResult.success) {
      await connection.rollback(); // Desfaz a atualização dos dados da empresa se a criação no Asaas falhar
      return { success: false, message: asaasResult.message };
    }

    // A função createAsaasCustomer já atualiza o idAsaas na tabela, então só precisamos comitar a transação.
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

    