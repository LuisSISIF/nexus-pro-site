
'use server';

import { db } from '@/lib/db';
import { getContractData } from './contract-actions';

const ASAAS_API_URL = process.env.ASAAS_API_URL;
const ASAAS_API_KEY = "$aact_prod_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OjBhYjY3ZTNkLTA0YzgtNGU1MC05MzM2LWYxMWU5ZTcxODM2NTo6JGFhY2hfYjYzOWE0NzQtZWUwOS00ODkwLWI2MTItMjc2ZTNhOTA1N2Qx";


interface AsaasPayment {
    status: 'PENDING' | 'CONFIRMED' | 'RECEIVED' | 'RECEIVED_IN_CASH' | 'OVERDUE' | 'REFUNDED' | 'DUNNING_REQUESTED' | 'AWAITING_RISK_ANALYSIS';
    dueDate: string;
    value: number;
    invoiceUrl: string; // Link para a fatura
}
interface AsaasError {
    description: string;
    code: string;
}
interface AsaasErrorResponse {
    errors: AsaasError[];
}

export interface BillingStatus {
    status: string;
    dueDate: string | null;
    month: string | null;
    value: number | null;
    invoiceUrl?: string; // URL da fatura pode ser opcional
}



// Retorna uma lista de status de cobrança
export async function getBillingStatusFromAsaas(companyId: number): Promise<{ success: boolean; data?: BillingStatus[]; message: string }> {
     if (!companyId) {
        return { success: false, message: 'ID da empresa não fornecido.' };
    }

    let connection;
    try {
        connection = await db();

        const [companyDataRows] = await connection.execute('SELECT idAsaas FROM empresa WHERE idempresa = ?', [companyId]);
        const companyData = (companyDataRows as any[])[0];

        if (!companyData?.idAsaas) {
            // Se a empresa não tem um ID Asaas, não podemos consultar.
            return { success: true, data: [{ status: 'UNREGISTERED', dueDate: null, month: 'Não aplicável', value: null }], message: 'Cliente não registrado para faturamento ainda.' };
        }

        const customerId = companyData.idAsaas;
        
        // Busca todas as cobranças do cliente
        const response = await fetch(`${ASAAS_API_URL}/payments?customer=${customerId}`, {
            method: 'GET',
            headers: { 'access_token': ASAAS_API_KEY! },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro na API Asaas:", errorData);
            return { success: false, message: 'Erro ao consultar faturas no Asaas.' };
        }

        const data = await response.json();
        
        if (data.totalCount === 0) {
            // Nenhuma fatura encontrada.
             return { success: true, data: [{ status: 'NOT_FOUND', dueDate: null, month: 'Não aplicável', value: null }], message: 'Nenhuma fatura encontrada para este cliente.' };
        }

        const allPayments: AsaasPayment[] = data.data;

        // Ordena as cobranças pela data de vencimento
        const sortedPayments = allPayments.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        const billingStatuses: BillingStatus[] = sortedPayments.map(payment => {
            const dueDate = new Date(payment.dueDate);
            return {
                status: payment.status,
                dueDate: dueDate.toLocaleDateString('pt-BR'),
                month: dueDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
                value: payment.value,
                invoiceUrl: payment.invoiceUrl,
            };
        });
        
        return { success: true, data: billingStatuses, message: 'Status das faturas encontrado.' };

    } catch (error) {
        console.error('ASAAS Billing Status Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
        return { success: false, message: errorMessage };
    } finally {
        if (connection) await connection.end();
    }
}


export async function createAsaasCustomer(data: {
    name: string;
    cpfCnpj: string;
    email: string;
    phone: string;
    address: string;
}): Promise<{ success: boolean; customerId?: string; message: string }> {
    
    const { name, cpfCnpj, email, phone, address } = data;

    try {
        const response = await fetch(`${ASAAS_API_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': ASAAS_API_KEY!,
            },
            body: JSON.stringify({
                name,
                cpfCnpj,
                email,
                mobilePhone: phone,
                address,
            }),
        });
        
        const responseData = await response.json();

        if (!response.ok) {
            const errorMessages = responseData.errors ? responseData.errors.map((e: AsaasError) => e.description).join(', ') : 'Erro desconhecido';
            console.error('Erro ao criar cliente no Asaas:', errorMessages);
            return { success: false, message: `Falha ao criar cliente no gateway de pagamento: ${errorMessages}` };
        }

        const customerId = responseData.id;
        return { success: true, customerId: customerId, message: 'Cliente criado com sucesso!' };

    } catch (error) {
        console.error('Create Asaas Customer Error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.';
        return { success: false, message: `Erro de comunicação com o gateway de pagamento: ${errorMessage}` };
    }
}

const getPlanDescription = (planName: string): string => {
    switch (planName.toLowerCase()) {
        case 'essencial':
            return 'Licença de uso mensal do sistema NexusPro – Plano Básico.\nAcesso ao sistema de gestão empresarial com funcionalidades de controle de estoque, vendas, cadastro de clientes e relatórios básicos.';
        case 'profissional':
            return 'Licença de uso mensal do sistema NexusPro – Plano Profissional.\nAcesso completo ao sistema de gestão empresarial com recursos avançados, incluindo controle financeiro, crédito de clientes, controle de caixa e múltiplas filiais.';
        case 'empresarial':
            return 'Licença de uso mensal do sistema NexusPro – Plano Empresarial.\nAcesso total ao sistema de gestão empresarial com todos os módulos liberados, suporte prioritário e recursos personalizados conforme demanda da empresa.';
        default:
            return `Licença de uso mensal do sistema NexusPro – Plano ${planName}.`;
    }
};

export async function createAsaasSubscription(data: {
    customerId: string;
    planPrice: number;
    planName: string;
    dueDateDay: number;
}): Promise<{ success: boolean; message: string }> {
    
    const { customerId, planPrice, planName, dueDateDay } = data;
    
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0); // Vai para o próximo mês
    const nextDueDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), dueDateDay);
   
    const payload = {
        customer: customerId,
        billingType: "BOLETO_PIX",
        value: planPrice,
        nextDueDate: nextDueDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
        cycle: "MONTHLY",
        description: getPlanDescription(planName),
        fine: { value: 2, type: "PERCENTAGE" },
        interest: { value: 1, type: "PERCENTAGE" },
    };

    try {
        const response = await fetch(`${ASAAS_API_URL}/subscriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access_token': ASAAS_API_KEY! },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.errors ? errorData.errors.map((e: any) => e.description).join(', ') : 'Erro desconhecido';
            return { success: false, message: `Falha na API Asaas (Assinatura): ${errorMessage}` };
        }
        
        return { success: true, message: 'Assinatura criada com sucesso!' };
    } catch (error) {
        console.error("Create Subscription Error:", error);
        return { success: false, message: 'Erro de comunicação ao criar assinatura.' };
    }
}


export async function createAsaasProrataCharge(data: {
    customerId: string;
    planPrice: number;
    dueDateDay: number;
}): Promise<{ success: boolean; message: string }> {

    const { customerId, planPrice, dueDateDay } = data;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const nextDueDate = new Date(today.getFullYear(), today.getMonth() + 1, dueDateDay);
    
    // Calcula a diferença em dias
    const diffTime = Math.abs(nextDueDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    const dailyRate = planPrice / 30;
    const prorataValue = Math.max(dailyRate * diffDays, 1.00); // Garante um valor mínimo

     const payload = {
        customer: customerId,
        billingType: "BOLETO_PIX",
        value: parseFloat(prorataValue.toFixed(2)),
        dueDate: tomorrow.toISOString().split('T')[0],
        description: `Cobrança proporcional referente aos dias de uso até o início do ciclo de faturamento.`,
    };

     try {
        const response = await fetch(`${ASAAS_API_URL}/payments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'access_token': ASAAS_API_KEY! },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.errors ? errorData.errors.map((e: any) => e.description).join(', ') : 'Erro desconhecido';
            return { success: false, message: `Falha na API Asaas (Cobrança Proporcional): ${errorMessage}` };
        }
        
        return { success: true, message: 'Cobrança proporcional criada com sucesso!' };
    } catch (error) {
        console.error("Create Prorata Charge Error:", error);
        return { success: false, message: 'Erro de comunicação ao criar cobrança proporcional.' };
    }
}
