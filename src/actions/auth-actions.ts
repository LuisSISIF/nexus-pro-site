
'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import * as crypto from 'crypto';
import { isValidCPF, isValidCNPJ } from '@/lib/validators';

// --- Helper Functions ---

function sha256Hash(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

// --- Schemas ---

const preRegistrationSchema = z.object({
  nome: z.string().min(3, "Nome completo é obrigatório"),
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6),
  planId: z.number().optional(), // 2 para teste, 3-5 para pagos
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const loginSchema = z.object({
  email: z.string().min(1, "E-mail ou Login é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória."),
});

// --- Server Actions ---

export async function checkUserExists(login: string, email: string): Promise<{ success: boolean; message?: string }> {
    let connection;
    try {
        connection = await db();
        // Verifica em usuários reais e pré-usuários
        const [users] = await connection.execute('SELECT login, email FROM usuarios WHERE login = ? OR email = ?', [login, email]);
        const [preUsers] = await connection.execute('SELECT login, email FROM preUsers WHERE login = ? OR email = ?', [login, email]);
        
        const allUsers = [...(users as any[]), ...(preUsers as any[])];

        if (allUsers.length > 0) {
            const loginExists = allUsers.some(u => u.login === login);
            const emailExists = allUsers.some(u => u.email === email);

            if (loginExists && emailExists) return { success: false, message: 'O login e o e-mail informados já estão em uso.' };
            if (loginExists) return { success: false, message: 'O login informado já está em uso.' };
            if (emailExists) return { success: false, message: 'O e-mail informado já está em uso.' };
        }
        return { success: true };
    } catch (error) {
        console.error('Check User Exists Error:', error);
        return { success: false, message: 'Erro ao verificar disponibilidade dos dados.' };
    } finally {
        if (connection) await connection.end();
    }
}

export async function registerPreUser(data: unknown) {
    const validation = preRegistrationSchema.safeParse(data);
    if (!validation.success) {
        const firstError = Object.values(validation.error.flatten().fieldErrors)[0]?.[0];
        return { success: false, message: firstError || 'Dados inválidos.' };
    }

    const { nome, cnpj, cpf, email, password, planId } = validation.data;
    const hashedPassword = sha256Hash(password);
    const cleanedCnpj = cnpj.replace(/[^\d]/g, '');
    const cleanedCpf = cpf.replace(/[^\d]/g, '');

    let connection;
    try {
        connection = await db();
        // Usamos o e-mail como login inicial na tabela preUsers
        await connection.execute(
            'INSERT INTO preUsers (nome, cnpj, cpf, email, senha, login, planId) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nome, cleanedCnpj, cleanedCpf, email, hashedPassword, email, planId || 2]
        );
        return { success: true, message: 'Pré-cadastro realizado com sucesso!' };
    } catch (error) {
        console.error('Pre-Registration Error:', error);
        return { success: false, message: 'Falha ao realizar pré-cadastro no servidor.' };
    } finally {
        if (connection) await connection.end();
    }
}

export async function loginUser(data: unknown) {
  const validation = loginSchema.safeParse(data);
  if (!validation.success) return { success: false, message: 'Dados de login inválidos.' };

  const { email, password } = validation.data;
  const hashedPassword = sha256Hash(password);

  let connection;
  try {
    connection = await db();

    // 1. Tenta login como Pré-Usuário
    const [preRows] = await connection.execute(
        'SELECT * FROM preUsers WHERE (email = ? OR login = ?) AND senha = ?',
        [email, email, hashedPassword]
    );

    if ((preRows as any[]).length > 0) {
        const preUser = (preRows as any[])[0];
        return { 
            success: true, 
            needsSetup: true, 
            user: { 
                id: preUser.id, 
                nome: preUser.nome, 
                email: preUser.email, 
                cnpj: preUser.cnpj,
                planId: preUser.planId 
            } 
        };
    }

    // 2. Tenta login Normal
    const [rows] = await connection.execute(
        'SELECT * FROM usuarios WHERE (email = ? OR login = ?) AND senha = ? AND admUser = 1',
        [email, email, hashedPassword]
    );

    if ((rows as any[]).length > 0) {
      const user = (rows as any[])[0];
      return { success: true, needsSetup: false, user };
    } else {
      return { success: false, message: 'Credenciais inválidas ou acesso não autorizado.' };
    }
  } catch (error) {
    console.error('Login Error:', error);
    return { success: false, message: 'Erro no servidor durante o login.' };
  } finally {
    if (connection) await connection.end();
  }
}
