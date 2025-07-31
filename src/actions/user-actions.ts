
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
    email: z.string(),
});
type UserData = z.infer<typeof UserDataFromDB>;


const UpdateUserSchema = z.object({
    userId: z.number(),
    companyId: z.number(),
    nome: z.string().min(3, "O nome é obrigatório."),
    celular: z.string().min(10, "O celular é obrigatório."),
    login: z.string().min(6, "O login deve ter pelo menos 6 caracteres."),
    email: z.string().email("O e-mail é inválido."),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.").optional().or(z.literal('')),
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
    
    const { userId, companyId, nome, celular, login, email, senha } = validation.data;

    let connection;
    try {
        connection = await db();

        // PROCEDURE `USUARIOS_UPDATE`(idUser INT, idEmp INT, nomeUser VARCHAR(255), celularUser VARCHAR(45), loginUser VARCHAR(255), emailUser VARCHAR(255), senhaUser VARCHAR(255))
        // O último parâmetro (senha) pode ser NULL ou '' se não for para alterar.
        const hashedPassword = senha ? sha256Hash(senha) : null;
        
        await connection.execute(
            'CALL USUARIOS_UPDATE(?, ?, ?, ?, ?, ?, ?)',
            [userId, companyId, nome, celular, login, email, hashedPassword]
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
