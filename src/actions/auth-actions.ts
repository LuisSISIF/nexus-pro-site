
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
  planId: z.number().optional(),
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
        
        // 1. Verifica em usuários reais
        const [users] = await connection.execute('SELECT login, email FROM usuarios WHERE login = ? OR email = ?', [login, email]);
        
        // 2. Verifica em pré-usuários (com tratamento de erro caso a tabela não exista ainda)
        let preUsers: any[] = [];
        try {
            const [preRows] = await connection.execute('SELECT login, email FROM preUsers WHERE login = ? OR email = ?', [login, email]);
            preUsers = preRows as any[];
        } catch (e) {
            console.warn("Tabela preUsers não encontrada ou erro na consulta. Ignorando verificação em preUsers.");
        }
        
        const allUsers = [...(users as any[]), ...preUsers];

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
        // Retornamos sucesso aqui para não travar o cadastro se o erro for apenas de "tabela inexistente"
        // mas o log acima ajudará o desenvolvedor.
        return { success: true }; 
    } finally {
        if (connection) await connection.end();
    }
}

export async function registerPreUser(data: any) {
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
        
        // Tentamos inserir com planId. Se der erro de coluna, tentamos sem ele.
        try {
            await connection.execute(
                'INSERT INTO preUsers (nome, cnpj, cpf, email, senha, login, planId) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [nome, cleanedCnpj, cleanedCpf, email, hashedPassword, email, planId || 2]
            );
        } catch (sqlError: any) {
            if (sqlError.code === 'ER_BAD_FIELD_ERROR') {
                // Se a coluna planId não existir, gravamos sem ela
                await connection.execute(
                    'INSERT INTO preUsers (nome, cnpj, cpf, email, senha, login) VALUES (?, ?, ?, ?, ?, ?)',
                    [nome, cleanedCnpj, cleanedCpf, email, hashedPassword, email]
                );
            } else {
                throw sqlError;
            }
        }
        
        return { success: true, message: 'Pré-cadastro realizado com sucesso!' };
    } catch (error) {
        console.error('Pre-Registration Error:', error);
        return { success: false, message: 'Falha ao realizar cadastro. Verifique se a tabela preUsers existe no banco.' };
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
    try {
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
                    planId: preUser.planId || 2 // Fallback se a coluna não existir
                } 
            };
        }
    } catch (e) {
        console.warn("Tabela preUsers não encontrada. Pulando verificação de pré-usuário.");
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
