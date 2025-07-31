
'use server';

import { db } from '@/lib/db';
import { getContractData } from './contract-actions';

const ASAAS_API_URL = process.env.ASAAS_API_URL;
const ASAAS_API_KEY = "$aact_hmlg_000MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmFlOGZkNGIyLWRkMzktNGUyZS1iZmIxLTg2MjgyZjUxNWM0ZTo6JGFhY2hfMzhiZTZlZmQtODVmZi00YzgwLTlhOWUtNjVkNGJmZDIwY2U5";

interface AsaasCustomer {
    id: string;
    // other fields if needed
}

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
