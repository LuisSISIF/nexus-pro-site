
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Rocket, Loader2, Save, MapPin, Building, ShieldCheck, Phone, UserCircle, LogIn } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { completeSetup } from '@/actions/setup-actions';
import { checkUserExists } from '@/actions/auth-actions';
import AnimatedSection from '@/components/home/AnimatedSection';

const setupSchema = z.object({
  companyName: z.string().min(2, "Nome da empresa é obrigatório"),
  companyAddress: z.string().min(10, "Endereço completo é obrigatório"),
  legalRepresentative: z.string().min(3, "Representante legal é obrigatório"),
  mainActivity: z.string().min(3, "Atividade principal é obrigatória"),
  phone: z.string().min(10, "Telefone inválido"),
  login: z.string().min(3, "O login deve ter pelo menos 3 caracteres"),
  inscricaoEstadual: z.string().min(1, "Inscrição Estadual é obrigatória"),
  regimeTributario: z.string({ required_error: "Regime é obrigatório" }),
  segmentoMercado: z.string().min(3, "Segmento é obrigatório"),
  diaVencimento: z.string({ required_error: "Vencimento é obrigatório" }),
  emailComercial: z.string().email("E-mail comercial inválido"),
});

type SetupFormValues = z.infer<typeof setupSchema>;

export default function SetupPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [preUser, setPreUser] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('preUser');
        if (!stored) {
            router.push('/login');
            return;
        }
        setPreUser(JSON.parse(stored));
    }, [router]);

    const form = useForm<SetupFormValues>({
        resolver: zodResolver(setupSchema),
        defaultValues: {
            companyName: "", companyAddress: "", legalRepresentative: "", mainActivity: "", phone: "",
            login: "", inscricaoEstadual: "", regimeTributario: "3", segmentoMercado: "", diaVencimento: "10",
            emailComercial: "",
        }
    });

    useEffect(() => {
        if (preUser && !form.getValues('legalRepresentative')) {
            form.setValue('legalRepresentative', preUser.nome);
            form.setValue('emailComercial', preUser.email);
        }
    }, [preUser, form]);

    const onSubmit = async (values: SetupFormValues) => {
        setLoading(true);
        try {
            // Verifica se o login escolhido já existe na tabela de usuários definitivos
            const loginCheck = await checkUserExists(values.login, values.emailComercial);
            if (!loginCheck.success && loginCheck.message?.includes('login')) {
                toast({ variant: "destructive", title: "Login indisponível", description: "Este nome de usuário já está sendo usado por outro cliente. Por favor, escolha outro." });
                setLoading(false);
                return;
            }

            const result = await completeSetup({
                ...values,
                preUserId: preUser.id,
                planId: preUser.planId,
                cnpj: preUser.cnpj,
                cpf: preUser.cpf,
                nomeAdmin: preUser.nome,
                emailAdmin: preUser.email,
            });

            if (result.success) {
                localStorage.removeItem('preUser');
                localStorage.setItem('companyId', result.companyId.toString());
                localStorage.setItem('userId', result.userId.toString());
                toast({ title: "Configuração Concluída!", description: "Sua conta NexusPro foi ativada. Bem-vindo ao sistema!" });
                router.push('/dashboard');
            } else {
                toast({ variant: "destructive", title: "Erro na configuração", description: result.message });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Erro inesperado", description: "Falha ao processar os dados de configuração." });
        } finally {
            setLoading(false);
        }
    };

    if (!preUser) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <AnimatedSection className="w-full max-w-4xl">
                    <div className="text-center mb-10">
                        <div className="inline-flex p-3 bg-blue-600 rounded-2xl mb-4 text-white shadow-xl">
                            <Rocket className="w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-bold font-headline">Finalizar Configuração</h1>
                        <p className="text-muted-foreground text-lg">Olá {preUser.nome}, complete os dados da sua empresa para liberar o acesso ao NexusPro.</p>
                    </div>

                    <Card className="shadow-2xl border-none">
                        <CardHeader className="border-b bg-gray-50/50 dark:bg-gray-800/50">
                            <CardTitle className="text-2xl">Dados da Empresa e Acesso</CardTitle>
                            <CardDescription>Estes dados serão utilizados para faturamento e login definitivo no sistema.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                                    {/* Seção Empresa */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                                            <Building className="w-5 h-5 text-blue-600" />
                                            <h3 className="text-xl font-bold">Informações do Negócio</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="companyName" render={({ field }) => (
                                                <FormItem><FormLabel>Razão Social / Nome da Loja</FormLabel><FormControl><Input placeholder="Ex: Nexus Pro Store" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="mainActivity" render={({ field }) => (
                                                <FormItem><FormLabel>Ramo de Atividade</FormLabel><FormControl><Input placeholder="Ex: Varejo de Eletrônicos" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                        <FormField control={form.control} name="companyAddress" render={({ field }) => (
                                            <FormItem><FormLabel>Endereço Completo</FormLabel><FormControl><div className="relative"><MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Textarea className="pl-10" placeholder="Rua, Número, Bairro, Cidade - UF" {...field} /></div></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>

                                    {/* Seção Fiscal */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                                            <ShieldCheck className="w-5 h-5 text-blue-600" />
                                            <h3 className="text-xl font-bold">Dados Fiscais e Cobrança</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="inscricaoEstadual" render={({ field }) => (
                                                <FormItem><FormLabel>Inscrição Estadual</FormLabel><FormControl><Input placeholder="Número ou 'Isento'" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="regimeTributario" render={({ field }) => (
                                                <FormItem><FormLabel>Regime Tributário</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent><SelectItem value="1">Lucro Real</SelectItem><SelectItem value="2">Lucro Presumido</SelectItem><SelectItem value="3">Simples Nacional</SelectItem><SelectItem value="4">MEI</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="segmentoMercado" render={({ field }) => (
                                                <FormItem><FormLabel>Segmento de Mercado</FormLabel><FormControl><Input placeholder="Ex: Vestuário" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="diaVencimento" render={({ field }) => (
                                                <FormItem><FormLabel>Dia de Vencimento Desejado</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="5">Dia 5</SelectItem><SelectItem value="10">Dia 10</SelectItem><SelectItem value="15">Dia 15</SelectItem><SelectItem value="20">Dia 20</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                    </div>

                                    {/* Seção Contato e Acesso */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                                            <UserCircle className="w-5 h-5 text-blue-600" />
                                            <h3 className="text-xl font-bold">Credenciais de Acesso</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="legalRepresentative" render={({ field }) => (
                                                <FormItem><FormLabel>Representante Legal</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="phone" render={({ field }) => (
                                                <FormItem><FormLabel>WhatsApp / Telefone</FormLabel><FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField control={form.control} name="emailComercial" render={({ field }) => (
                                                <FormItem><FormLabel>E-mail Comercial (para cobrança)</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                            )} />
                                            <FormField control={form.control} name="login" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Escolha seu Nome de Usuário (Login)</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <LogIn className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                            <Input className="pl-10" placeholder="Este será seu login de acesso" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormDescription>Mínimo 3 caracteres. Você usará este nome para entrar no sistema.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </div>
                                    </div>

                                    <Button type="submit" className="w-full text-xl py-8 bg-blue-600 hover:bg-blue-700 shadow-2xl transition-all hover:scale-[1.01]" disabled={loading}>
                                        {loading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
                                        {loading ? 'Finalizando...' : 'Finalizar Configuração e Entrar'}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </AnimatedSection>
            </main>
            <Footer />
        </div>
    );
}
