
'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, DollarSign, Package, Users, AlertCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Bar, XAxis, YAxis, Tooltip, Legend, BarChart } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { getDashboardData, DashboardData } from '@/actions/dashboard-actions';
import { Skeleton } from '@/components/ui/skeleton';


const DashboardPage = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const companyId = localStorage.getItem('companyId');
            if (!companyId) {
                setError("ID da empresa não encontrado. Faça o login novamente.");
                setLoading(false);
                return;
            }

            try {
                const result = await getDashboardData(Number(companyId));
                if (result.success && result.data) {
                    setData(result.data);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError("Ocorreu um erro ao buscar os dados do dashboard.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-6">
                <div className="space-y-1.5">
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-5 w-1/3" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <Skeleton className="h-5 w-2/3" />
                                <Skeleton className="h-4 w-4" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-7 w-1/2 mb-2" />
                                <Skeleton className="h-4 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
                 <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Card><CardContent className="p-6"><Skeleton className="h-[250px] w-full" /></CardContent></Card>
                    <Card><CardContent className="p-6"><Skeleton className="h-[250px] w-full" /></CardContent></Card>
                </div>
                 <Card><CardHeader><Skeleton className="h-6 w-1/4 mb-2" /><Skeleton className="h-4 w-2/5" /></CardHeader><CardContent><Skeleton className="h-32 w-full" /></CardContent></Card>
            </div>
        );
    }
    
    if (error) {
        return (
             <div className="flex flex-col items-center justify-center text-center text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                <AlertCircle className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold">Ocorreu um Erro</h3>
                <p>{error}</p>
            </div>
        )
    }

    if (!data) {
        return <p>Nenhum dado encontrado.</p>;
    }


    const { totalClients, newClientsData, totalProducts, topProducts, monthlySales, branches } = data;


  return (
    <div className="flex flex-col gap-6">
       <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Painel de Gestão</h1>
          <p className="text-muted-foreground">Visão geral e estratégica do seu negócio.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalClients}</div>
                <p className="text-xs text-muted-foreground">{newClientsData[newClientsData.length -1]?.newClients || 0} novos clientes este mês</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">Cadastrados no sistema</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas no Mês</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{monthlySales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                 <p className="text-xs text-muted-foreground">Faturamento no mês atual</p>
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
                        <BarChart data={topProducts} accessibilityLayer>
                           <XAxis dataKey="product" tickLine={false} axisLine={false} fontSize={12} />
                           <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                           <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                           <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
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
                         <BarChart data={newClientsData} accessibilityLayer>
                           <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                           <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                           <Tooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                           <Bar dataKey="newClients" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
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
