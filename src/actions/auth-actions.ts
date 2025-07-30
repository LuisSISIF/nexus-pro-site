'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import * as crypto from 'crypto';

// --- Helper Functions ---

function getTaxRegimeAsInt(taxRegime: string): number {
    const regimeMap: { [key: string]: number } = {
        'real': 1,
        'presumido': 2,
        'simples': 3,
        'mei': 4,
        'eireli': 5,
        'ltda': 6,
        'sa': 7,
        'coop': 8,
        'semfins': 9,
    };
    return regimeMap[taxRegime.toLowerCase()] || 0;
}


function sha256Hash(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}


// --- Schemas ---

const registrationSchema = z.object({
  // Step 1 - User
  fullName: z.string().min(3),
  cpf: z.string(),
  rg: z.string(),
  dob: z.string(),
  gender: z.string(),
  login: z.string().min(3),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  phone: z.string(),
  email: z.string().email(),
  
  // Step 2 - Company
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
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});


// --- Server Actions ---

export async function registerUserAndCompany(data: unknown) {
  const validation = registrationSchema.safeParse(data);

  if (!validation.success) {
    console.error('Validation Error:', validation.error.flatten().fieldErrors);
    return { success: false, message: 'Dados de cadastro inválidos.' };
  }
  
  const { 
      // User data
      login, password, fullName, email, cpf, rg, dob, gender, phone,
      // Company data
      fantasyName, cnpj, socialReason, taxRegime, stateInscription,
      municipalInscription, mainActivity, marketSegment, street, number,
      neighborhood, city, state, cep, ownerName, commercialEmail, website,
      commercialPhone, instagram
  } = validation.data;
  
  let connection;
  try {
    connection = await db();
    await connection.beginTransaction();

    // Check if user or company already exists
    const [existingUser] = await connection.execute('SELECT idusuarios FROM usuarios WHERE login = ? OR email = ?', [login, email]);
    if ((existingUser as any[]).length > 0) {
      await connection.rollback();
      return { success: false, message: 'Login ou e-mail de usuário já cadastrado.' };
    }

    const [existingCompany] = await connection.execute('SELECT idempresa FROM empresa WHERE cnpj_empresa = ?', [cnpj]);
    if ((existingCompany as any[]).length > 0) {
        await connection.rollback();
        return { success: false, message: 'CNPJ já cadastrado.' };
    }

    const hashedPassword = sha256Hash(password);

    const fullAddress = `${street}, ${number}, ${neighborhood}, ${city} - ${state}, ${cep}`;
    const planId = 2; 
    const dayOfMonth = new Date().getDate();
    const taxRegimeInt = getTaxRegimeAsInt(taxRegime);


    const [companyResult] = await connection.execute(
        'CALL admFunctionsEmpresas(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            0, 
            fullAddress, 
            planId, 
            fantasyName, 
            cnpj, 
            website || null, 
            commercialEmail, 
            commercialPhone, 
            stateInscription || null,
            dayOfMonth.toString(), 
            instagram || null, 
            ownerName, 
            mainActivity,
            marketSegment,
            taxRegimeInt,
            municipalInscription || null,
            0, // usersAdicionais
            1, // catPlano
            0.00,
            0,
        ]
    );
    
    const companyId = (companyResult as any)[0][0]['ID'];

    if (!companyId) {
        throw new Error('Falha ao criar a empresa. O ID não foi retornado pela procedure.');
    }

    const [userResult] = await connection.execute(
        'CALL admFunctionsInsertADM(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            companyId,
            fullName,
            cpf,
            rg,
            gender,
            phone,
            email,
            login,
            hashedPassword
        ]
    );

    await connection.commit();

    return { success: true, message: 'Cadastro realizado com sucesso!', userId: null, companyId: companyId }; 

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Registration Error:', error);
    if (error instanceof Error && (error as any).sqlMessage) {
       return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
    }
    return { success: false, message: 'Ocorreu um erro no servidor ao tentar realizar o cadastro.' };
  } finally {
    if (connection) await connection.end();
  }
}

export async function loginUser(data: unknown) {
  const validation = loginSchema.safeParse(data);

  if (!validation.success) {
    return { success: false, message: 'Dados de login inválidos.' };
  }

  const { email, password } = validation.data;
  const hashedPassword = sha256Hash(password);

  let connection;
  try {
    connection = await db();
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ? AND admUser = 1';
    const [rows] = await connection.execute(query, [email, hashedPassword]);

    if ((rows as any[]).length > 0) {
      const user = (rows as any[])[0];
      // Note: In a real app, you would create a session/JWT here.
      // We are returning the user object directly for simplicity.
      return { success: true, message: 'Login bem-sucedido!', user };
    } else {
      return { success: false, message: 'E-mail, senha ou permissão inválidos.' };
    }
  } catch (error) {
    console.error('Login Error:', error);
    if (error instanceof Error && 'code' in error && (error as any).code.includes('CONN')) {
       return { success: false, message: 'Não foi possível conectar ao banco de dados. Verifique as credenciais.' };
    }
    return { success: false, message: 'Ocorreu um erro no servidor durante o login.' };
  } finally {
    if (connection) await connection.end();
  }
}
