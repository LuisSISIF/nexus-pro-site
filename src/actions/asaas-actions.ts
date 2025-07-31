
'use server';

import { db } from '@/lib/db';
import { getContractData } from './contract-actions';

const ASAAS_API_URL = process.env.ASAAS_API_URL;
const ASAAS_API_KEY = "$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmFlOGZkNGIyLWRkMzktNGUyZS1iZmIxLTg2MjgyZjUxNWM0ZTo6JGFhY2hfMzhiZTZlZmQtODVmZi00YzgwLTlhOWUtNjVkNGJmZDIwY2U5";

interface AsaasCustomer {
    id: string;
    // other fields if needed
}
interface AsaasPaymentLink {
    url: string;
    // other fields if needed
}
interface AsaasPayment {
    status: 'PENDING' | 'CONFIRMED' | 'RECEIVED_IN_CASH' | 'OVERDUE' | 'REFUNDED' | 'DUNNING_REQUESTED' | 'AWAITING_RISK_ANALYSIS';
    dueDate: string;
    value: number;
}
interface AsaasError {
    description: string;
    code: string;
}
interface AsaasErrorResponse {
    errors: AsaasError[];
}

// --- Funções Internas ---

// Função para criar um novo cliente no ASAAS
async function createAsaasCustomer(companyData: any, userData: any) {
    const response = await fetch(`${ASAAS_API_URL}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'access_token': ASAAS_API_KEY!,
        },
        body: JSON.stringify({
            name: companyData.nome_empresa,
            cpfCnpj: companyData.cnpj_empresa, // Usar o CNPJ da empresa
            email: userData.email,
            phone: userData.contato,
            address: companyData.endereco,
            // Adicionar outros campos conforme necessário
        }),
    });
    return response.json();
}

async function getAsaasCustomerByCnpj(cnpj: string): Promise<AsaasCustomer | null> {
    const response = await fetch(`${ASAAS_API_URL}/customers?cpfCnpj=${cnpj}`, {
        method: 'GET',
        headers: {
            'access_token': ASAAS_API_KEY!,
        },
    });
    const data = await response.json();
    if (data.totalCount > 0) {
        return data.data[0];
    }
    return null;
}


// Função para buscar o cliente ASAAS no banco de dados local ou criá-lo
async function getOrCreateAsaasCustomer(companyId: number, connection: any) {
    // 1. Verificar se o idAsaas já existe na tabela `empresa`
    let [companyRows] = await connection.execute('SELECT idAsaas, nome_empresa, endereco, cnpj_empresa FROM empresa WHERE idempresa = ?', [companyId]);
    let companyResult = (companyRows as any[])[0];
    let asaasCustomerId = companyResult?.idAsaas;

    if (asaasCustomerId) {
        return asaasCustomerId;
    }

    // 2. Se não existir, buscar dados para criar o cliente
    const [userDataRows] = await connection.execute('SELECT nome, email, cpf, contato FROM usuarios WHERE idempresa = ? AND admUser = 1 LIMIT 1', [companyId]);
    const userData = (userDataRows as any[])[0];


    if (!userData || !companyResult) {
        throw new Error('Dados do usuário ou da empresa não encontrados para criar cliente no ASAAS.');
    }
     if (!companyResult.cnpj_empresa) {
        throw new Error('CNPJ da empresa não encontrado para criar cliente no ASAAS.');
    }
    
    // 3. Criar cliente no ASAAS
    const asaasCustomer: AsaasCustomer | AsaasErrorResponse = await createAsaasCustomer(companyResult, userData);

    if ('errors' in asaasCustomer) {
        console.error("Erro ao criar cliente ASAAS:", asaasCustomer.errors);
        throw new Error(`ASAAS: ${asaasCustomer.errors[0].description}`);
    }

    asaasCustomerId = asaasCustomer.id;

    // 4. Salvar o idAsaas no banco de dados local
    await connection.execute(
        'UPDATE empresa SET idAsaas = ? WHERE idempresa = ?',
        [asaasCustomerId, companyId]
    );

    return asaasCustomerId;
}

// --- Funções Exportadas ---

export interface BillingStatus {
    status: string;
    dueDate: string | null;
    month: string | null;
}

export async function getBillingStatusFromAsaas(companyId: number): Promise<{ success: boolean; data?: BillingStatus; message: string }> {
     if (!companyId) {
        return { success: false, message: 'ID da empresa não fornecido.' };
    }

    let connection;
    try {
        connection = await db();

        const [companyDataRows] = await connection.execute('SELECT idAsaas FROM empresa WHERE idempresa = ?', [companyId]);
        const companyData = (companyDataRows as any[])[0];

        if (!companyData?.idAsaas) {
            return { success: false, message: 'Cliente não encontrado no sistema de pagamentos.' };
        }

        const customerId = companyData.idAsaas;
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

        const response = await fetch(`${ASAAS_API_URL}/payments?customer=${customerId}&dueDate[ge]=${firstDay}&dueDate[le]=${lastDay}`, {
            method: 'GET',
            headers: { 'access_token': ASAAS_API_KEY! },
        });

        if (!response.ok) {
            return { success: false, message: 'Erro ao consultar faturas no Asaas.' };
        }

        const data = await response.json();
        
        if (data.totalCount === 0) {
            return { success: false, message: 'Nenhuma fatura encontrada para o mês atual.' };
        }

        const payment: AsaasPayment = data.data[0]; // Pega a primeira fatura do mês
        const dueDate = new Date(payment.dueDate);

        const billingStatus: BillingStatus = {
            status: payment.status,
            dueDate: dueDate.toLocaleDateString('pt-BR'),
            month: dueDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
        };
        
        return { success: true, data: billingStatus, message: 'Status da fatura encontrado.' };

    } catch (error) {
        console.error('ASAAS Billing Status Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
        return { success: false, message: errorMessage };
    } finally {
        if (connection) await connection.end();
    }
}

export async function createAsaasPaymentLink(companyId: number): Promise<{ success: boolean; message: string; paymentUrl?: string }> {
    if (!companyId) {
        return { success: false, message: 'ID da empresa não fornecido.' };
    }
    if (!ASAAS_API_KEY || !ASAAS_API_URL) {
        return { success: false, message: 'Credenciais do ASAAS não configuradas no servidor.' };
    }
    
    let connection;
    try {
        connection = await db();
        // 1. Obter dados do contrato para saber o valor a ser cobrado
        const contractInfo = await getContractData(companyId);
        if (!contractInfo.success || !contractInfo.data) {
            return { success: false, message: 'Não foi possível obter os dados do contrato.' };
        }
        
        // Simulação: Pegar o valor do plano. Substituir pela lógica real se houver.
        // Ex: Planos com valores diferentes.
        let amount = 0;
        switch (contractInfo.data.idPlano) {
            case 1: amount = 80.00; break; // Essencial
            case 3: amount = 120.00; break; // Profissional
            case 4: amount = 190.00; break; // Empresarial
            default: return { success: false, message: 'Plano não tem valor de cobrança definido.' };
        }

        // 2. Obter ou criar o cliente no ASAAS
        const asaasCustomerId = await getOrCreateAsaasCustomer(companyId, connection);

        // 3. Criar o Link de Pagamento no ASAAS (como cobrança avulsa)
        const paymentPayload = {
            name: `Mensalidade Plano ${contractInfo.data.nomePlano} - ${contractInfo.data.nome_empresa}`,
            description: `Referente à mensalidade do sistema NexusPro.`,
            value: amount,
            billingType: "BOLETO", // Define o tipo de cobrança principal
            allowedPaymentMethods: ["BOLETO", "PIX"], // Limita as opções de pagamento
            chargeType: "DETACHED",
            dueDateLimitDays: 5, // A cobrança expira em 5 dias se não for paga
            customer: asaasCustomerId,
        };

        const response = await fetch(`${ASAAS_API_URL}/paymentLinks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': ASAAS_API_KEY,
            },
            body: JSON.stringify(paymentPayload),
        });

        const paymentLink: AsaasPaymentLink | AsaasErrorResponse = await response.json();

        if ('errors' in paymentLink) {
             console.error("Erro ao criar link de pagamento ASAAS:", paymentLink.errors);
             return { success: false, message: `ASAAS: ${paymentLink.errors[0].description}` };
        }

        return { success: true, message: 'Link de pagamento criado com sucesso!', paymentUrl: paymentLink.url };

    } catch (error) {
        console.error('ASAAS Action Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
        return { success: false, message: errorMessage };
    } finally {
        if (connection) await connection.end();
    }
}
