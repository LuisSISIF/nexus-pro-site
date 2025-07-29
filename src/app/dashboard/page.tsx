'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, DollarSign, Package, Users, BarChart, CreditCard, Landmark, CircleDollarSign, QrCode } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart as RechartsBarChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getTotalClients, getNewClientsThisMonth, getProductStats, getMonthlySales, getPaymentMethodRanking } from '@/actions/dashboard-actions';
import { Skeleton } from '@/components/ui/skeleton';

type PaymentMethodRank = {
    name: string;
    count: number;
};

const DashboardPage = () => {
    const [totalClients, setTotalClients] = useState<number | null>(null);
    const [newClientsCount, setNewClientsCount] = useState<number | null>(null);
    const [totalProducts, setTotalProducts] = useState<number | null>(null);
    const [activeProductsCount, setActiveProductsCount] = useState<number | null>(null);
    const [monthlySales, setMonthlySales] = useState<number | null>(null);
    const [paymentRanking, setPaymentRanking] = useState<PaymentMethodRank[] | null>(null);
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
                    paymentRankingResult
                ] = await Promise.all([
                    getTotalClients(Number(companyId)),
                    getNewClientsThisMonth(Number(companyId)),
                    getProductStats(Number(companyId)),
                    getMonthlySales(Number(companyId)),
                    getPaymentMethodRanking(Number(companyId))
                ]);
                
                setTotalClients(clientsResult.total);
                setNewClientsCount(newClientsResult.total);
                setTotalProducts(productStatsResult.total);
                setActiveProductsCount(productStatsResult.totalActive);
                setMonthlySales(monthlySalesResult.total);
                setPaymentRanking(paymentRankingResult);

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


    const newClientsData = [
        { month: 'Jan', newClients: 12 },
        { month: 'Fev', newClients: 25 },
        { month: 'Mar', newClients: 18 },
        { month: 'Abr', newClients: 32 },
        { month: 'Mai', newClients: 22 },
        { month: 'Jun', newClients: 45 },
    ];
   
    const topProducts = [
        { product: 'Produto A', sales: 120 },
        { product: 'Produto B', sales: 98 },
        { product: 'Produto C', sales: 86 },
        { product: 'Produto D', sales: 74 },
        { product: 'Produto E', sales: 65 },
    ];

    const branches = [
        { name: 'Loja Matriz', status: 'Ativa', users: 15 },
        { name: 'Filial Centro', status: 'Ativa', users: 8 },
        { name: 'Filial Norte', status: 'Inativa', users: 0 },
    ];


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
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Ranking de Produtos Mais Vendidos</CardTitle>
                    <CardDescription>Top 5 produtos no último mês.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{sales: { label: "Vendas", color: "hsl(var(--primary))"}}} className="h-[250px] w-full">
                        <RechartsBarChart data={topProducts} accessibilityLayer>
                           <XAxis dataKey="product" tickLine={false} axisLine={false} fontSize={12} />
                           <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                           <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                           <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                 <CardHeader>
                    <CardTitle>Evolução de Novos Clientes</CardTitle>
                    <CardDescription>Novos clientes cadastrados por mês.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={{newClients: { label: "Novos Clientes", color: "hsl(var(--primary))"}}} className="h-[250px] w-full">
                         <RechartsBarChart data={newClientsData} accessibilityLayer>
                           <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                           <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                           <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                           <Bar dataKey="newClients" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
      </div>
      
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
                        {branches.map(branch => (
                             <TableRow key={branch.name}>
                                <TableCell className="font-medium">{branch.name}</TableCell>
                                <TableCell>
                                    <Badge variant={branch.status === 'Ativa' ? 'default' : 'destructive'}>
                                        {branch.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">{branch.users}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    </div>
  );
};

export default DashboardPage;
