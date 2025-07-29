
'use server';

import { db } from '@/lib/db';

// --- Interfaces ---

interface KpiData {
    totalClients: number;
    monthlySales: number;
    totalProducts: number;
}

interface TopProduct {
    product: string;
    sales: number;
}

interface NewClientsData {
    month: string;
    newClients: number;
}

interface Branch {
    name: string;
    status: 'Ativa' | 'Inativa';
    users: number;
}

export interface DashboardData extends KpiData {
    topProducts: TopProduct[];
    newClientsData: NewClientsData[];
    branches: Branch[];
}


// --- Main Server Action ---

export async function getDashboardData(companyId: number): Promise<{ success: boolean; message: string; data?: DashboardData }> {
    if (!companyId) {
        return { success: false, message: "ID da empresa não fornecido." };
    }

    const connection = await db();

    try {
        await connection.beginTransaction();

        const kpis = await getKpis(connection, companyId);
        const topProducts = await getTopProducts(connection, companyId);
        const newClientsData = await getNewClientsData(connection, companyId);
        const branches = await getBranches(connection, companyId);

        await connection.commit();
        
        const dashboardData: DashboardData = {
            ...kpis,
            topProducts,
            newClientsData,
            branches,
        };

        return { success: true, message: 'Dados do dashboard carregados.', data: dashboardData };

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('Dashboard Data Error:', error);
        return { success: false, message: 'Ocorreu um erro no servidor ao buscar os dados do dashboard.' };
    } finally {
        if (connection) await connection.end();
    }
}


// --- Helper Functions for Data Fetching ---

async function getKpis(connection: any, companyId: number): Promise<KpiData> {
    const query = `
        SELECT
            (SELECT COUNT(id) FROM clientes WHERE idempresa = ?) as totalClients,
            (SELECT SUM(valorFinal) FROM relatoriovenda WHERE idempresa = ? AND MONTH(dataVenda) = MONTH(CURDATE()) AND YEAR(dataVenda) = YEAR(CURDATE())) as monthlySales,
            (SELECT COUNT(idprodutos) FROM produtos WHERE idempresa = ?) as totalProducts
    `;
    const [rows] = await connection.execute(query, [companyId, companyId, companyId]);
    const data = (rows as any[])[0];
    return {
        totalClients: Number(data.totalClients) || 0,
        monthlySales: Number(data.monthlySales) || 0,
        totalProducts: Number(data.totalProducts) || 0,
    };
}

async function getTopProducts(connection: any, companyId: number): Promise<TopProduct[]> {
    const query = `
        SELECT 
            v.produtoVendido as product, 
            SUM(v.quantidade) as sales
        FROM vendas v
        JOIN relatoriovenda rv ON v.idVenda = rv.idVenda
        WHERE rv.idempresa = ? AND MONTH(rv.dataVenda) = MONTH(CURDATE()) AND YEAR(rv.dataVenda) = YEAR(CURDATE())
        GROUP BY v.produtoVendido
        ORDER BY sales DESC
        LIMIT 5;
    `;
    const [rows] = await connection.execute(query, [companyId]);
    return rows as TopProduct[];
}

async function getNewClientsData(connection: any, companyId: number): Promise<NewClientsData[]> {
     const query = `
        SELECT 
            DATE_FORMAT(dataCadastro, '%b') as month,
            COUNT(id) as newClients
        FROM clientes
        WHERE idempresa = ? AND dataCadastro >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(dataCadastro, '%Y-%m')
        ORDER BY DATE_FORMAT(dataCadastro, '%Y-%m');
    `;
    const [rows] = await connection.execute(query, [companyId]);
    
    const monthMap = new Map<string, number>();
    (rows as any[]).forEach(row => monthMap.set(row.month, Number(row.newClients)));

    const result: NewClientsData[] = [];
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    let date = new Date();
    date.setMonth(date.getMonth() - 5); 
    
    for (let i = 0; i < 6; i++) {
        const monthName = monthNames[date.getMonth()];
        result.push({
            month: monthName,
            newClients: monthMap.get(monthName) || 0,
        });
        date.setMonth(date.getMonth() + 1);
    }
    
    return result;
}


async function getBranches(connection: any, companyId: number): Promise<Branch[]> {
    const query = `
        SELECT 
            l.nomeLoja as name,
            CASE WHEN l.status = 1 THEN 'Ativa' ELSE 'Inativa' END as status,
            COUNT(DISTINCT v.idFuncionario) as users
        FROM lojas l
        LEFT JOIN vendas v ON l.id = v.idLoja
        WHERE l.idempresa = ?
        GROUP BY l.id, l.nomeLoja, l.status;
    `;
     const [rows] = await connection.execute(query, [companyId]);
     return rows as Branch[];
}
