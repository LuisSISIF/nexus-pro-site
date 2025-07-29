'use server';

import { z } from 'zod';
import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

const registrationSchema = z.object({
  // Step 1 - User
  fullName: z.string().min(3),
  cpf: z.string(),
  rg: z.string(),
  dob: z.string(),
  gender: z.string(),
  login: z.string().min(3),
  password: z.string().min(6),
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
});


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
  
  const connection = await db();

  try {
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

    // Hash the password before sending to procedure
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1. Call the procedure to insert the company
    const fullAddress = `${street}, ${number}, ${neighborhood}, ${city} - ${state}, ${cep}`;
    const planId = 2; // Test plan
    const dayOfMonth = new Date().getDate();

    const [companyResult] = await connection.execute(
        'CALL admFunctionsEmpresas(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            0, // escolha = 0 for INSERT
            fullAddress, // endereco
            planId, // plano = 2 (teste)
            fantasyName, // nome_empresa
            cnpj, // cnpj_empresa
            website, // site
            commercialEmail, // emailComercial
            commercialPhone, // telefone
            stateInscription, // inscricaoEstadual
            dayOfMonth.toString(), // diaVencimento
            instagram, // instagram
            ownerName, // rep
            mainActivity, // atv
            marketSegment, // segmento
            taxRegime, // rTribut
            municipalInscription, // inscricaoMunicipal
            0, // maisUser (additional users)
            0, // catPlano (type of monthly payment)
            0.00, // valorMensal
            0, // mesesCobrar
        ]
    );
    
    // The procedure returns a result set with the new ID
    const companyId = (companyResult as any)[0][0]['ID'];

    if (!companyId) {
        throw new Error('Falha ao criar a empresa. O ID não foi retornado pela procedure.');
    }

    // 2. Call the procedure to insert the admin user and employee
    const [userResult] = await connection.execute(
        'CALL admFunctionsInsertADM(?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            companyId,      // idEmpresa
            fullName,       // nom_func
            cpf,            // cpf_func
            rg,             // rg
            gender,         // genero
            phone,          // celular
            email,          // email
            login,          // login
            hashedPassword  // senha
        ]
    );

    await connection.commit();

    return { success: true, message: 'Cadastro realizado com sucesso!', userId: null, companyId: companyId }; // userId from users table is not returned by procedure

  } catch (error) {
    await connection.rollback();
    console.error('Registration Error:', error);
    // Provide a more specific error message if possible
    if (error instanceof Error && (error as any).sqlMessage) {
       return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
    }
    return { success: false, message: 'Ocorreu um erro no servidor ao tentar realizar o cadastro.' };
  } finally {
    await connection.end();
  }
}
