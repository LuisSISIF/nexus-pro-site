'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, DollarSign, Package, Users, BarChart, CreditCard, Landmark, CircleDollarSign, QrCode, Trophy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { getTotalClients, getNewClientsThisMonth, getProductStats, getMonthlySales, getPaymentMethodRanking, getTopCustomers, getStores } from '@/actions/dashboard-actions';
import { Skeleton } from '@/components/ui/skeleton';

type PaymentMethodRank = {
    name: string;
    count: number;
};

type TopCustomer = {
    nome: string;
    comprasRealizadas: number;
};

type Store = {
    name: string;
    status: string;
    users: number;
}

const DashboardPage = () => {
    const [totalClients, setTotalClients] = useState<number | null>(null);
    const [newClientsCount, setNewClientsCount] = useState<number | null>(null);
    const [totalProducts, setTotalProducts] = useState<number | null>(null);
    const [activeProductsCount, setActiveProductsCount] = useState<number | null>(null);
    const [monthlySales, setMonthlySales] = useState<number | null>(null);
    const [paymentRanking, setPaymentRanking] = useState<PaymentMethodRank[] | null>(null);
    const [topCustomers, setTopCustomers] = useState<TopCustomer[] | null>(null);
    const [stores, setStores] = useState<Store[] | null>(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            const companyId = localStorage.getItem('companyId');
            if (!companyId) {
                setLoading(false);
                // Maybe set an error state here in the future
                return;
            }

            try {
                const [
                    clientsResult, 
                    newClientsResult, 
                    productStatsResult, 
                    monthlySalesResult,
                    paymentRankingResult,
                    topCustomersResult,
                    storesResult
                ] = await Promise.all([
                    getTotalClients(Number(companyId)),
                    getNewClientsThisMonth(Number(companyId)),
                    getProductStats(Number(companyId)),
                    getMonthlySales(Number(companyId)),
                    getPaymentMethodRanking(Number(companyId)),
                    getTopCustomers(Number(companyId)),
                    getStores(Number(companyId))
                ]);
                
                setTotalClients(clientsResult.total);
                setNewClientsCount(newClientsResult.total);
                setTotalProducts(productStatsResult.total);
                setActiveProductsCount(productStatsResult.totalActive);
                setMonthlySales(monthlySalesResult.total);
                setPaymentRanking(paymentRankingResult);
                setTopCustomers(topCustomersResult);
                setStores(storesResult);

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
                 // Maybe set an error state here in the future
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

     const getPaymentMethodIcon = (method: string) => {
        const normalizedMethod = method.toLowerCase();
        if (normalizedMethod.includes('dinheiro')) return <CircleDollarSign className="h-5 w-5 text-green-500" />;
        if (normalizedMethod.includes('crédito') || normalizedMethod.includes('credito')) return <CreditCard className="h-5 w-5 text-blue-500" />;
        if (normalizedMethod.includes('débito') || normalizedMethod.includes('debito')) return <CreditCard className="h-5 w-5 text-red-500" />;
        if (normalizedMethod.includes('pix')) return <QrCode className="h-5 w-5 text-cyan-500" />;
        if (normalizedMethod.includes('crediário') || normalizedMethod.includes('crediario')) return <Landmark className="h-5 w-5 text-purple-500" />;
        return <DollarSign className="h-5 w-5 text-gray-400" />;
    };

  return (
    <div className="flex flex-col gap-6">
       <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Painel de Gestão</h1>
          <p className="text-muted-foreground">Visão geral e estratégica do seu negócio.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {loading ? (
                    <>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-1/3 mt-2" />
                    </>
                ) : (
                    <>
                        <div className="text-2xl font-bold">{totalClients ?? 'N/A'}</div>
                        <p className="text-xs text-muted-foreground">{newClientsCount ?? 0} novos clientes este mês</p>
                    </>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 {loading ? (
                    <>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-1/3 mt-2" />
                    </>
                ) : (
                    <>
                        <div className="text-2xl font-bold">{totalProducts ?? 'N/A'}</div>
                        <p className="text-xs text-muted-foreground">{activeProductsCount ?? 0} produtos ativos</p>
                    </>
                )}
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas no Mês</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 {loading ? (
                    <>
                        <Skeleton className="h-8 w-1/2" />
                        <Skeleton className="h-4 w-1/3 mt-2" />
                    </>
                ) : (
                    <>
                        <div className="text-2xl font-bold">{(monthlySales ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                        <p className="text-xs text-muted-foreground">Faturamento no mês atual</p>
                    </>
                )}
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ranking de Pagamentos (Mês)</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>
                ) : (
                    <ul className="space-y-2 text-sm">
                        {paymentRanking && paymentRanking.length > 0 ? (
                             paymentRanking.slice(0, 3).map((method, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        {getPaymentMethodIcon(method.name)}
                                        <span className="capitalize">{method.name}</span>
                                    </div>
                                    <span className="font-semibold">{method.count}</span>
                                </li>
                            ))
                        ) : (
                            <p className="text-xs text-muted-foreground">Nenhum dado de pagamento no mês.</p>
                        )}
                    </ul>
                )}
            </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Ranking de Clientes (Top 5)
                    </CardTitle>
                    <CardDescription>Clientes que mais compraram na sua loja.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead className="text-right">Compras</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-1/4 float-right" /></TableCell>
                                    </TableRow>
                                ))
                            ) : topCustomers && topCustomers.length > 0 ? (
                                topCustomers.map((customer, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{customer.nome}</TableCell>
                                        <TableCell className="text-right">{customer.comprasRealizadas}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} className="text-center">Nenhum cliente no ranking ainda.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Filiais Cadastradas
                    </CardTitle>
                    <CardDescription>Visão geral das suas lojas e status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Nome da Loja</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Usuários Vinculados</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {loading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton className="h-4 w-2/4" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-4 w-1/4 float-right" /></TableCell>
                                    </TableRow>
                                ))
                            ) : stores && stores.length > 0 ? (
                                stores.map(branch => (
                                    <TableRow key={branch.name}>
                                        <TableCell className="font-medium">{branch.name}</TableCell>
                                        <TableCell>
                                            <Badge variant={branch.status === 'Ativa' ? 'default' : 'destructive'}>
                                                {branch.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{branch.users}</TableCell>
                                    </TableRow>
                                ))
                             ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">Nenhuma filial cadastrada.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
