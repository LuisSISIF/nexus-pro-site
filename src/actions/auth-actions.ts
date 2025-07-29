'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

const registrationSchema = z.object({
  // Step 1
  fullName: z.string().min(3),
  cpf: z.string(),
  rg: z.string(),
  dob: z.string(),
  gender: z.string(),
  login: z.string().min(3),
  password: z.string().min(6),
  phone: z.string(),
  email: z.string().email(),
  
  // Step 2
  fantasyName: z.string().min(2),
  cnpj: z.string(),
  socialReason: z.string().min(3),
  taxRegime: z.string(),
  stateInscription: z.string().optional(),
  municipalInscription: z.string().optional(),
  mainActivity: z.string().min(3),
  marketSegment: z.string().min(3),
  street: z.string().min(3),
  number: z.string().min(1),
  neighborhood: z.string().min(3),
  city: z.string().min(3),
  state: z.string().length(2),
  cep: z.string().min(8),
  ownerName: z.string().min(3),
  commercialEmail: z.string().email(),
  website: z.string().optional(),
  commercialPhone: z.string(),
  instagram: z.string().optional(),
});


export async function registerUserAndCompany(data: unknown) {
  const validation = registrationSchema.safeParse(data);

  if (!validation.success) {
    console.error('Validation Error:', validation.error.flatten().fieldErrors);
    return { success: false, message: 'Dados de cadastro inválidos.' };
  }
  
  const { 
      login, password, fullName, email, cpf, rg, dob, gender, phone,
      fantasyName, cnpj, socialReason, taxRegime, stateInscription,
      municipalInscription, mainActivity, marketSegment, street, number,
      neighborhood, city, state, cep, ownerName, commercialEmail, website,
      commercialPhone, instagram
  } = validation.data;
  
  const connection = await db();

  try {
    await connection.beginTransaction();

    // Check if user or company already exists
    const [existingUser] = await connection.execute('SELECT id FROM users WHERE login = ? OR email = ? OR cpf = ?', [login, email, cpf]);
    if ((existingUser as any[]).length > 0) {
      await connection.rollback();
      return { success: false, message: 'Usuário, e-mail ou CPF já cadastrado.' };
    }

    const [existingCompany] = await connection.execute('SELECT id FROM companies WHERE cnpj = ?', [cnpj]);
    if ((existingCompany as any[]).length > 0) {
        await connection.rollback();
        return { success: false, message: 'CNPJ já cadastrado.' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into companies table
    const [companyResult] = await connection.execute(
        `INSERT INTO companies (fantasy_name, cnpj, social_reason, tax_regime, state_inscription, municipal_inscription, main_activity, market_segment, street, number, neighborhood, city, state, cep, owner_name, commercial_email, website, commercial_phone, instagram) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [fantasyName, cnpj, socialReason, taxRegime, stateInscription, municipalInscription, mainActivity, marketSegment, street, number, neighborhood, city, state, cep, ownerName, commercialEmail, website, commercialPhone, instagram]
    );

    const companyId = (companyResult as any).insertId;

    if (!companyId) {
        throw new Error('Falha ao criar a empresa.');
    }

    // Insert into users table
    const [userResult] = await connection.execute(
        `INSERT INTO users (company_id, full_name, email, login, password, cpf, rg, dob, gender, phone, role) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [companyId, fullName, email, login, hashedPassword, cpf, rg, dob, gender, phone, 'admin']
    );

    const userId = (userResult as any).insertId;

     if (!userId) {
        throw new Error('Falha ao criar o usuário.');
    }

    await connection.commit();

    return { success: true, message: 'Cadastro realizado com sucesso!', userId, companyId };

  } catch (error) {
    await connection.rollback();
    console.error('Registration Error:', error);
    return { success: false, message: 'Ocorreu um erro no servidor ao tentar realizar o cadastro.' };
  } finally {
    await connection.end();
  }
}
