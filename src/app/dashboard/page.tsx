'use client';

import React, { useEffect, useState, useCallback } from 'react';
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

// Types
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
};

// Custom Hook para controle granular de loading
const useDashboardData = (companyId: string | null) => {
    const [data, setData] = useState({
        totalClients: null as number | null,
        newClientsCount: null as number | null,
        totalProducts: null as number | null,
        activeProductsCount: null as number | null,
        monthlySales: null as number | null,
        paymentRanking: null as PaymentMethodRank[] | null,
        topCustomers: null as TopCustomer[] | null,
        stores: null as Store[] | null,
    });

    const [loadingStates, setLoadingStates] = useState({
        totalClients: true,
        newClients: true,
        products: true,
        monthlySales: true,
        paymentRanking: true,
        topCustomers: true,
        stores: true,
    });

    const [errors, setErrors] = useState<Record<string, string | null>>({});

    const updateLoadingState = useCallback((key: string, isLoading: boolean) => {
        setLoadingStates(prev => ({ ...prev, [key]: isLoading }));
    }, []);

    const setError = useCallback((key: string, error: string | null) => {
        setErrors(prev => ({ ...prev, [key]: error }));
    }, []);

    useEffect(() => {
        if (!companyId) return;

        const numericCompanyId = Number(companyId);

        // Fetch Total Clients
        getTotalClients(numericCompanyId)
            .then(result => {
                setData(prev => ({ ...prev, totalClients: result.total }));
                updateLoadingState('totalClients', false);
            })
            .catch(error => {
                console.error("Erro ao buscar total de clientes:", error);
                setError('totalClients', 'Erro ao carregar dados dos clientes');
                updateLoadingState('totalClients', false);
            });

        // Fetch New Clients
        getNewClientsThisMonth(numericCompanyId)
            .then(result => {
                setData(prev => ({ ...prev, newClientsCount: result.total }));
                updateLoadingState('newClients', false);
            })
            .catch(error => {
                console.error("Erro ao buscar novos clientes:", error);
                setError('newClients', 'Erro ao carregar novos clientes');
                updateLoadingState('newClients', false);
            });

        // Fetch Product Stats
        getProductStats(numericCompanyId)
            .then(result => {
                setData(prev => ({
                    ...prev,
                    totalProducts: result.total,
                    activeProductsCount: result.totalActive
                }));
                updateLoadingState('products', false);
            })
            .catch(error => {
                console.error("Erro ao buscar estatísticas de produtos:", error);
                setError('products', 'Erro ao carregar dados dos produtos');
                updateLoadingState('products', false);
            });

        // Fetch Monthly Sales
        getMonthlySales(numericCompanyId)
            .then(result => {
                setData(prev => ({ ...prev, monthlySales: result.total }));
                updateLoadingState('monthlySales', false);
            })
            .catch(error => {
                console.error("Erro ao buscar vendas mensais:", error);
                setError('monthlySales', 'Erro ao carregar vendas mensais');
                updateLoadingState('monthlySales', false);
            });

        // Fetch Payment Ranking
        getPaymentMethodRanking(numericCompanyId)
            .then(result => {
                setData(prev => ({ ...prev, paymentRanking: result }));
                updateLoadingState('paymentRanking', false);
            })
            .catch(error => {
                console.error("Erro ao buscar ranking de pagamentos:", error);
                setError('paymentRanking', 'Erro ao carregar métodos de pagamento');
                updateLoadingState('paymentRanking', false);
            });

        // Fetch Top Customers
        getTopCustomers(numericCompanyId)
            .then(result => {
                setData(prev => ({ ...prev, topCustomers: result }));
                updateLoadingState('topCustomers', false);
            })
            .catch(error => {
                console.error("Erro ao buscar top clientes:", error);
                setError('topCustomers', 'Erro ao carregar ranking de clientes');
                updateLoadingState('topCustomers', false);
            });

        // Fetch Stores
        getStores(numericCompanyId)
            .then(result => {
                setData(prev => ({ ...prev, stores: result }));
                updateLoadingState('stores', false);
            })
            .catch(error => {
                console.error("Erro ao buscar lojas:", error);
                setError('stores', 'Erro ao carregar filiais');
                updateLoadingState('stores', false);
            });

    }, [companyId, updateLoadingState, setError]);

    return { data, loadingStates, errors };
};

// Componente de Card Otimizado
const DashboardCard = React.memo(({
    title,
    icon: Icon,
    value,
    subtitle,
    isLoading,
    error
}: {
    title: string;
    icon: React.ComponentType<any>;
    value: React.ReactNode;
    subtitle: React.ReactNode;
    isLoading: boolean;
    error?: string | null;
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            {error ? (
                <div className="text-red-500 text-sm">{error}</div>
            ) : isLoading ? (
                <>
                    <Skeleton className="h-8 w-20 mb-2" />
                    <Skeleton className="h-4 w-32" />
                </>
            ) : (
                <>
                    <div className="text-2xl font-bold">{value}</div>
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                </>
            )}
        </CardContent>
    </Card>
));

DashboardCard.displayName = 'DashboardCard';

const DashboardPage = () => {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const { data, loadingStates, errors } = useDashboardData(companyId);

    useEffect(() => {
    const companyIdToken = typeof window !== 'undefined' ? localStorage.getItem('companyId') : null;

        if (companyIdToken) {
            setCompanyId(companyIdToken);
        }
    }, []);

    const getPaymentMethodIcon = useCallback((method: string) => {
        const normalizedMethod = method.toLowerCase();
        if (normalizedMethod.includes('dinheiro')) return <CircleDollarSign className="h-4 w-4" />;
        if (normalizedMethod.includes('crédito') || normalizedMethod.includes('credito')) return <CreditCard className="h-4 w-4" />;
        if (normalizedMethod.includes('débito') || normalizedMethod.includes('debito')) return <Landmark className="h-4 w-4" />;
        if (normalizedMethod.includes('pix')) return <QrCode className="h-4 w-4" />;
        if (normalizedMethod.includes('crediário') || normalizedMethod.includes('crediario')) return <BarChart className="h-4 w-4" />;
        return <DollarSign className="h-4 w-4" />;
    }, []);

    if (!companyId) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Empresa não encontrada</h2>
                    <p className="text-muted-foreground">Faça login novamente</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Painel de Gestão</h2>
                <div className="flex items-center space-x-2">
                    {/* Header actions aqui se necessário */}
                </div>
            </div>
            <p className="text-muted-foreground">
                Visão geral e estratégica do seu negócio.
            </p>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    title="Total de Clientes"
                    icon={Users}
                    value={data.totalClients ?? 'N/A'}
                    subtitle={`${data.newClientsCount ?? 0} novos clientes este mês`}
                    isLoading={loadingStates.totalClients || loadingStates.newClients}
                    error={errors.totalClients || errors.newClients}
                />

                <DashboardCard
                    title="Total de Produtos"
                    icon={Package}
                    value={data.totalProducts ?? 'N/A'}
                    subtitle={`${data.activeProductsCount ?? 0} produtos ativos`}
                    isLoading={loadingStates.products}
                    error={errors.products}
                />

                <DashboardCard
                    title="Vendas no Mês"
                    icon={DollarSign}
                    value={data.monthlySales ?
                        data.monthlySales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) :
                        'N/A'
                    }
                    subtitle="Faturamento no mês atual"
                    isLoading={loadingStates.monthlySales}
                    error={errors.monthlySales}
                />

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ranking de Pagamentos (Mês)</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {errors.paymentRanking ? (
                            <div className="text-red-500 text-sm">{errors.paymentRanking}</div>
                        ) : loadingStates.paymentRanking ? (
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/6" />
                            </div>
                        ) : (
                            <ul className="space-y-2 text-sm">
                                {errors.paymentRanking ? (
                                    <div className="text-red-500 text-sm">{errors.paymentRanking}</div>
                                ) : (
                                    <>
                                        {data.paymentRanking && data.paymentRanking.length > 0 ? (
                                            data.paymentRanking.slice(0, 3).map((method, index) => (
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
                                    </>
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
                                { loadingStates.topCustomers ? (
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Skeleton className="h-4 w-3/4" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-4 w-1/4 float-right" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : data.topCustomers && data.topCustomers.length > 0 ? (
                                    data.topCustomers.map((customer, index) => (
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
                                {loadingStates.stores ? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Skeleton className="h-4 w-2/4" /></TableCell>
                                            <TableCell><Skeleton className="h-6 w-16" /></TableCell>
                                            <TableCell className="text-right"><Skeleton className="h-4 w-1/4 float-right" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : data.stores && data.stores.length > 0 ? (
                                    data.stores.map(branch => (
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
