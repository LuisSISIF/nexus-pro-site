
'use server';

import { db } from '@/lib/db';
import { z } from 'zod';
import * as crypto from 'crypto';

// --- Helper Functions ---

function sha256Hash(password: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

// --- Tipos internos para validação ---
const UserDataFromDB = z.object({
    nom_func: z.string(),
    celular: z.string(),
    login: z.string(),
    email: z.string().email(),
});
type UserData = z.infer<typeof UserDataFromDB>;


const UpdateUserSchema = z.object({
    userId: z.number(),
    companyId: z.number(), // Mantido para validação inicial, mas não usado na nova procedure
    nome: z.string().min(3, "O nome é obrigatório."),
    celular: z.string().min(10, "O celular é obrigatório."),
    login: z.string().min(6, "O login deve ter pelo menos 6 caracteres."),
    email: z.string().email("O e-mail é inválido."),
    senha: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres.").optional().or(z.literal('')),
    confirmarSenha: z.string().optional(),
}).refine(data => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem.",
    path: ["confirmarSenha"],
});


// --- Server Actions ---

export async function getUserData(userId: number, companyId: number): Promise<{ success: boolean; data?: UserData; message: string }> {
    if (!userId || !companyId) {
        return { success: false, message: 'ID do usuário ou da empresa não fornecido.' };
    }

    let connection;
    try {
        connection = await db();
        const query = 'CALL USUARIOS_LISTAR(?, ?)';
        const [rows] = await connection.execute(query, [userId, companyId]);

        if ((rows as any[]).length > 0 && (rows as any[])[0].length > 0) {
            const userData = (rows as any[])[0][0];
            // Validamos com o schema interno
            const validatedData = UserDataFromDB.parse(userData);
            return { success: true, data: validatedData, message: 'Dados do usuário encontrados.' };
        } else {
            return { success: false, message: 'Usuário não encontrado.' };
        }
    } catch (error) {
        console.error('Get User Data Error:', error);
        if (error instanceof z.ZodError) {
             return { success: false, message: `Dados inválidos recebidos do banco: ${error.errors.map(e => e.path).join(', ')}` };
        }
        if (error instanceof Error && (error as any).sqlMessage) {
            return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
        }
        return { success: false, message: 'Ocorreu um erro no servidor ao buscar os dados do usuário.' };
    } finally {
        if (connection) await connection.end();
    }
}


export async function updateUserData(data: unknown): Promise<{ success: boolean; message: string }> {
    const validation = UpdateUserSchema.safeParse(data);

    if (!validation.success) {
        const firstError = Object.values(validation.error.flatten().fieldErrors)[0]?.[0];
        return { success: false, message: firstError || 'Dados inválidos.' };
    }
    
    const { userId, nome, celular, login, email, senha } = validation.data;

    let connection;
    try {
        connection = await db();

        // PROCEDURE `USUARIOS_ALTERAR`(idUser int, nome varchar(150), cel varchar(15), emai varchar(150), log varchar(90), sen varchar(300))
        // A procedure requer a senha, mesmo que não seja alterada.
        // Se a senha não for alterada, precisamos buscar a senha atual para enviá-la.
        let finalPassword;
        if (senha) {
            finalPassword = sha256Hash(senha);
        } else {
            // Buscar a senha atual se não for fornecida uma nova
            const [userRows] = await connection.execute('SELECT senha FROM usuarios WHERE idusuarios = ?', [userId]);
            const currentUser = (userRows as any[])[0];
            if (!currentUser) {
                return { success: false, message: "Usuário não encontrado para atualização." };
            }
            finalPassword = currentUser.senha;
        }
        
        await connection.execute(
            'CALL USUARIOS_ALTERAR(?, ?, ?, ?, ?, ?)',
            [userId, nome, celular, email, login, finalPassword]
        );

        return { success: true, message: 'Dados atualizados com sucesso!' };

    } catch (error) {
        console.error('Update User Data Error:', error);
        if (error instanceof Error && (error as any).sqlMessage) {
            return { success: false, message: `Erro no banco de dados: ${(error as any).sqlMessage}` };
        }
        return { success: false, message: 'Ocorreu um erro no servidor ao atualizar os dados.' };
    } finally {
        if (connection) await connection.end();
    }
}
