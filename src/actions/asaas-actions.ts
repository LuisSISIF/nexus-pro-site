
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
    invoiceUrl?: string; // URL da fatura pode ser opcional
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
            // Se a empresa não tem um ID Asaas, não podemos consultar.
            // Isso pode significar que ela nunca teve uma cobrança gerada.
            return { success: true, data: { status: 'UNREGISTERED', dueDate: null, month: new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' }) }, message: 'Cliente não registrado para faturamento ainda.' };
        }

        const customerId = companyData.idAsaas;
        const today = new Date();
        // Busca cobranças com vencimento no mês e ano atuais
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
        const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];

        const response = await fetch(`${ASAAS_API_URL}/payments?customer=${customerId}&dueDate[ge]=${firstDay}&dueDate[le]=${lastDay}`, {
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
            // Nenhuma fatura encontrada para o mês atual.
             return { success: true, data: { status: 'NOT_FOUND', dueDate: null, month: new Date().toLocaleString('pt-BR', { month: 'long', year: 'numeric' }) }, message: 'Nenhuma fatura encontrada para o mês atual.' };
        }

        // Pega a fatura mais relevante (a primeira da lista, que geralmente é a mais recente)
        const payment: AsaasPayment = data.data[0]; 
        const dueDate = new Date(payment.dueDate);

        const billingStatus: BillingStatus = {
            status: payment.status,
            dueDate: dueDate.toLocaleDateString('pt-BR'),
            month: dueDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
            invoiceUrl: payment.invoiceUrl, // Retornamos a URL da fatura
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
