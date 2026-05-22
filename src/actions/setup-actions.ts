
'use server';

import { db } from '@/lib/db';
import { createAsaasCustomer, createAsaasSubscription, createAsaasProrataCharge } from './asaas-actions';

interface SetupData {
    preUserId: number;
    planId: number;
    cnpj: string;
    cpf: string;
    nomeAdmin: string;
    emailAdmin: string;
    login: string;
    companyName: string;
    companyAddress: string;
    legalRepresentative: string;
    mainActivity: string;
    phone: string;
    inscricaoEstadual: string;
    regimeTributario: string;
    segmentoMercado: string;
    diaVencimento: string;
    emailComercial: string;
}

export async function completeSetup(data: SetupData) {
    let connection;
    try {
        connection = await db();
        await connection.beginTransaction();

        // 1. Busca a senha do pré-usuário para migrar para a tabela definitiva
        const [preRows] = await connection.execute('SELECT senha FROM preUsers WHERE id = ?', [data.preUserId]);
        const preUser = (preRows as any[])[0];
        if (!preUser) throw new Error("Registro de pré-cadastro não encontrado ou já processado.");

        const hashedPassword = preUser.senha;

        // 2. Cria a Empresa e o Usuário usando a procedure interna do sistema
        // PROCEDURE `admFunctionsCadastraTeste` (nome_empresa, endereco, rep, atv, login, senha, email, nomeUser, contato, cpf, genero)
        await connection.execute(
            'CALL admFunctionsCadastraTeste(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                data.companyName, data.companyAddress, data.legalRepresentative, data.mainActivity,
                data.login, hashedPassword, data.emailAdmin, data.nomeAdmin, data.phone, data.cpf, 'other'
            ]
        );

        // 3. Recupera o ID da empresa recém-criada para os próximos passos
        const [compRows] = await connection.execute(
            'SELECT idempresa FROM empresa WHERE nome_empresa = ? AND representanteEmpresa = ? ORDER BY idempresa DESC LIMIT 1',
            [data.companyName, data.legalRepresentative]
        );
        const newCompany = (compRows as any[])[0];
        if (!newCompany) throw new Error("Falha ao recuperar ID da nova empresa criada.");
        const companyId = newCompany.idempresa;

        // 4. Lógica Seletiva do Asaas (Apenas para Planos Pagos)
        let asaasCustomerId = null;
        const isPaid = data.planId > 2;

        if (isPaid) {
            const asaasResult = await createAsaasCustomer({
                name: data.companyName,
                cpfCnpj: data.cnpj,
                email: data.emailComercial,
                phone: data.phone,
                address: data.companyAddress,
            });

            if (!asaasResult.success || !asaasResult.customerId) {
                throw new Error(asaasResult.message || "Erro ao criar registro no gateway de pagamento (Asaas).");
            }

            asaasCustomerId = asaasResult.customerId;
            
            const planPrices: Record<number, { price: number, name: string }> = {
                3: { price: 80, name: 'Essencial' },
                4: { price: 120, name: 'Profissional' },
                5: { price: 190, name: 'Empresarial' }
            };
            const planInfo = planPrices[data.planId];

            if (planInfo) {
                // Cria a assinatura mensal recorrente
                const subResult = await createAsaasSubscription({
                    customerId: asaasCustomerId,
                    planPrice: planInfo.price,
                    planName: planInfo.name,
                    dueDateDay: parseInt(data.diaVencimento)
                });

                if (!subResult.success) throw new Error(`Erro ao criar assinatura: ${subResult.message}`);

                // Cria a cobrança proporcional imediata
                const proResult = await createAsaasProrataCharge({
                    customerId: asaasCustomerId,
                    planPrice: planInfo.price,
                    planName: planInfo.name,
                    dueDateDay: parseInt(data.diaVencimento)
                });
                
                if (!proResult.success) throw new Error(`Erro ao criar cobrança proporcional: ${proResult.message}`);
            }
        }

        // 5. Atualiza dados fiscais e configura o plano (Teste ou Pago)
        const updateQuery = `
            UPDATE empresa SET 
                idPlano = ?,
                cnpj_empresa = ?, 
                inscricaoEstadual = ?, 
                regimeTributario = ?, 
                segmentoMercado = ?, 
                diaVencimento = ?, 
                emailComercial = ?, 
                idAsaas = ?,
                pagamentoMes = ?,
                periodoTesteInicio = ?,
                periodoTesteFim = ?,
                instagram = ''
            WHERE idempresa = ?
        `;

        // Lógica de datas do período de teste
        const today = new Date();
        const testStart = isPaid ? null : today;
        const testEnd = isPaid ? null : new Date(new Date().setDate(today.getDate() + 10));

        await connection.execute(updateQuery, [
            data.planId, 
            data.cnpj.replace(/[^\d]/g, ''), 
            data.inscricaoEstadual, 
            parseInt(data.regimeTributario),
            data.segmentoMercado, 
            parseInt(data.diaVencimento), 
            data.emailComercial,
            asaasCustomerId, 
            isPaid ? 'Pendente' : 'Pago', // No teste, marcamos como "Pago" pois não há boleto
            testStart, 
            testEnd, 
            companyId
        ]);

        // 6. Busca o ID do usuário real criado pela procedure
        const [userRows] = await connection.execute('SELECT idusuarios FROM usuarios WHERE idempresa = ? AND login = ?', [companyId, data.login]);
        const userId = (userRows as any[])[0]?.idusuarios;

        // 7. REMOÇÃO DO PRÉ-USUÁRIO (Crucial para concluir o ciclo)
        await connection.execute('DELETE FROM preUsers WHERE id = ?', [data.preUserId]);

        await connection.commit();
        return { success: true, companyId, userId };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error("Setup Completion Error:", error);
        return { success: false, message: error instanceof Error ? error.message : "Erro crítico ao finalizar configuração." };
    } finally {
        if (connection) await connection.end();
    }
}
