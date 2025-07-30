'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import * as crypto from 'crypto';
import { isValidCPF } from '@/lib/validators';

// --- Helper Functions ---

function sha256Hash(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}


// --- Schemas ---

const registrationSchema = z.object({
  // User
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  gender: z.enum(["male", "female", "other"], { required_error: "Gênero é obrigatório"}),
  login: z.string().min(3, "Login deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  
  // Company
  companyName: z.string().min(2, "Nome da empresa é obrigatório"),
  companyAddress: z.string().min(10, "Endereço completo é obrigatório"),
  legalRepresentative: z.string().min(3, "Representante legal é obrigatório"),
  mainActivity: z.string().min(3, "Atividade principal é obrigatória"),

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
    const firstError = Object.values(validation.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: firstError || 'Dados de cadastro inválidos. Verifique os campos.' };
  }
  
  const { 
      // User data
      login, password, fullName, email, cpf, gender, phone,
      // Company data
      companyName, companyAddress, legalRepresentative, mainActivity
  } = validation.data;
  
  let connection;
  try {
    connection = await db();

    // Check if user or company already exists
    const [existingUser] = await connection.execute('SELECT idusuarios FROM usuarios WHERE login = ? OR email = ?', [login, email]);
    if ((existingUser as any[]).length > 0) {
      return { success: false, message: 'Login ou e-mail de usuário já cadastrado.' };
    }

    const hashedPassword = sha256Hash(password);

    // Call the new unified stored procedure
    // PROCEDURE `admFunctionsCadastraTeste` (nome_empresa, endereco, rep, atv, login, senha, email, nomeUser, contato, cpf, genero)
    const [result] = await connection.execute(
        'CALL admFunctionsCadastraTeste(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            companyName,
            companyAddress,
            legalRepresentative,
            mainActivity,
            login,
            hashedPassword,
            email,
            fullName, // nomeUser
            phone,    // contato
            cpf,
            gender
        ]
    );
    
    // Assuming the procedure returns some indication of success.
    // Adjust based on actual procedure return value if necessary.
    return { success: true, message: 'Cadastro realizado com sucesso!' }; 

  } catch (error) {
    console.error('Registration Error:', error);
    // Specific check for connection errors
    if (error instanceof Error && 'code' in error && (error as any).code.includes('CONN')) {
      return { success: false, message: 'Não foi possível conectar ao banco de dados. Verifique as credenciais no ambiente de produção.' };
    }
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
    // Specific check for connection errors
    if (error instanceof Error && 'code' in error && (error as any).code.includes('CONN')) {
       return { success: false, message: 'Não foi possível conectar ao banco de dados. Verifique as credenciais no ambiente de produção.' };
    }
     if (error instanceof Error && (error as any).sqlMessage) {
       return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
    }
    return { success: false, message: 'Ocorreu um erro no servidor durante o login.' };
  } finally {
    if (connection) await connection.end();
  }
}
