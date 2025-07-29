
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, BarChart3, Building, CreditCard, DollarSign, LineChart, Package, TrendingUp, UserCheck, UserX, Users } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Fev', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Abr', sales: 4500 },
  { month: 'Mai', sales: 6000 },
  { month: 'Jun', sales: 5500 },
];

const newClientsData = [
    { month: 'Jan', newClients: 20 },
    { month: 'Fev', newClients: 35 },
    { month: 'Mar', newClients: 40 },
    { month: 'Abr', newClients: 55 },
    { month: 'Mai', newClients: 60 },
    { month: 'Jun', newClients: 75 },
];


const topProducts = [
    { product: 'Produto A', sales: 120 },
    { product: 'Produto B', sales: 98 },
    { product: 'Produto C', sales: 86 },
    { product: 'Produto D', sales: 74 },
    { product: 'Produto E', sales: 62 },
]

const branches = [
    { name: 'Loja Matriz', status: 'Ativa', users: 5 },
    { name: 'Filial Centro', status: 'Ativa', users: 3 },
    { name: 'Filial Bairro', status: 'Inativa', users: 0 },
]

const DashboardPage = () => {
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
                <div className="text-2xl font-bold">1,254</div>
                <p className="text-xs text-muted-foreground">+20.1% do último mês</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clientes Inadimplentes</CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">87</div>
                 <p className="text-xs text-muted-foreground">Valor total: R$ 15.230,00</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5,320</div>
                <p className="text-xs text-muted-foreground">Em 150 categorias</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas no Mês</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">R$ 45.231,89</div>
                 <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
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
