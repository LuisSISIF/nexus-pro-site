
'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import * as crypto from 'crypto';
import { isValidCPF, isValidCNPJ } from '@/lib/validators';
import { createAsaasCustomer } from './asaas-actions';

// --- Helper Functions ---

function sha256Hash(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}


// --- Schemas ---

// Base schema without refinement, so it can be extended.
const baseRegistrationSchema = z.object({
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
});

// Final free registration schema with password confirmation refinement.
const registrationSchema = baseRegistrationSchema.refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

// Paid registration schema extends the base and adds its own refinement.
const paidRegistrationSchema = baseRegistrationSchema.extend({
  // Additional Company Data
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido."),
  inscricaoEstadual: z.string().min(1, "Inscrição Estadual é obrigatória."),
  regimeTributario: z.string({ required_error: "Regime Tributário é obrigatório." }),
  segmentoMercado: z.string().min(3, "Segmento de mercado é obrigatório."),
  diaVencimento: z.string({ required_error: "Dia de vencimento é obrigatório." }),
  emailComercial: z.string().email("E-mail comercial inválido."),
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

export async function checkUserExists(login: string, email: string): Promise<{ success: boolean; message?: string }> {
    let connection;
    try {
        connection = await db();
        const [existingUsers] = await connection.execute('SELECT login, email FROM usuarios WHERE login = ? OR email = ?', [login, email]);
        const users = existingUsers as any[];

        if (users.length > 0) {
            const loginExists = users.some(u => u.login === login);
            const emailExists = users.some(u => u.email === email);

            if (loginExists && emailExists) {
                return { success: false, message: 'O login e o e-mail informados já estão em uso.' };
            }
            if (loginExists) {
                return { success: false, message: 'O login informado já está em uso.' };
            }
            if (emailExists) {
                return { success: false, message: 'O e-mail informado já está em uso.' };
            }
        }
        return { success: true };
    } catch (error) {
        console.error('Check User Exists Error:', error);
        return { success: false, message: 'Ocorreu um erro no servidor ao verificar os dados.' };
    } finally {
        if (connection) await connection.end();
    }
}


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

    // Re-check just in case of a race condition
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
            companyName,         // nome_empresa
            companyAddress,      // endereco
            legalRepresentative, // rep
            mainActivity,        // atv
            login,               // login
            hashedPassword,      // senha
            email,               // email
            fullName,            // nomeUser
            phone,               // contato
            cpf,                 // cpf
            gender               // genero
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

export async function registerPaidUserAndCompany(data: unknown) {
  const validation = paidRegistrationSchema.safeParse(data);

  if (!validation.success) {
    console.error('Validation Error:', validation.error.flatten().fieldErrors);
    const firstError = Object.values(validation.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: firstError || 'Dados de cadastro inválidos. Verifique os campos.' };
  }
  
  const { 
      // User data
      login, password, fullName, email, cpf, gender, phone,
      // Company basic data
      companyName, companyAddress, legalRepresentative, mainActivity,
      // Company fiscal/commercial data
      cnpj, inscricaoEstadual, regimeTributario, segmentoMercado, diaVencimento, emailComercial, instagram
  } = validation.data;
  
  let connection;
  try {
    connection = await db();
    await connection.beginTransaction();

    // 1. Re-check for existing user
    const [existingUser] = await connection.execute('SELECT idusuarios FROM usuarios WHERE login = ? OR email = ?', [login, email]);
    if ((existingUser as any[]).length > 0) {
      await connection.rollback();
      return { success: false, message: 'Login ou e-mail de usuário já cadastrado.' };
    }

    // 2. Hash password
    const hashedPassword = sha256Hash(password);

    // 3. Call the stored procedure to create user and company
    const [result] = await connection.execute(
        'CALL admFunctionsCadastraTeste(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            companyName, companyAddress, legalRepresentative, mainActivity,
            login, hashedPassword, email, fullName, phone, cpf, gender
        ]
    );

    // 4. Get the newly created company's ID
    // The procedure doesn't return the ID, so we need to fetch it.
    // We assume the combination of name and legal rep is unique enough for this context.
    const [companyRows] = await connection.execute(
      'SELECT idempresa FROM empresa WHERE nome_empresa = ? AND rep_legal = ? ORDER BY idempresa DESC LIMIT 1',
      [companyName, legalRepresentative]
    );
    const newCompany = (companyRows as any[])[0];
    if (!newCompany || !newCompany.idempresa) {
        await connection.rollback();
        return { success: false, message: 'Falha ao recuperar a empresa recém-criada.' };
    }
    const companyId = newCompany.idempresa;

    // 5. Update company with additional fiscal/commercial data
    const cleanedCnpj = cnpj.replace(/[^\d]/g, '');
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
      cleanedCnpj, inscricaoEstadual, parseInt(regimeTributario), segmentoMercado,
      parseInt(diaVencimento), emailComercial, instagram || '', companyId,
    ]);

    // 6. Create customer in Asaas
    const asaasResult = await createAsaasCustomer({
      name: companyName,
      cpfCnpj: cleanedCnpj,
      email: emailComercial,
      phone: phone, 
      address: companyAddress,
    });

    if (!asaasResult.success || !asaasResult.customerId) {
      await connection.rollback(); 
      return { success: false, message: `Falha ao criar cliente no gateway de pagamento: ${asaasResult.message}` };
    }
    
    // 7. Update company with Asaas customer ID
    await connection.execute('UPDATE empresa SET idAsaas = ? WHERE idempresa = ?', [asaasResult.customerId, companyId]);

    // If all steps succeed, commit the transaction
    await connection.commit();

    return { success: true, message: 'Cadastro e cliente de faturamento criados com sucesso!' }; 

  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Paid Registration Error:', error);
    if (error instanceof Error && 'code' in error && (error as any).code.includes('CONN')) {
      return { success: false, message: 'Não foi possível conectar ao banco de dados.' };
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
