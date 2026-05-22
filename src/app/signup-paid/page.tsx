
'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, EyeOff, Loader2, Store, Briefcase, Building, CreditCard, User, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidCPF, isValidCNPJ } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerPreUser, checkUserExists } from '@/actions/auth-actions';
import { useToast } from '@/hooks/use-toast';
import AnimatedSection from '@/components/home/AnimatedSection';

const allPlans = [
    { id: 3, name: "Essencial", price: 80, icon: Store },
    { id: 4, name: "Profissional", price: 120, icon: Briefcase },
    { id: 5, name: "Empresarial", price: 190, icon: Building }
];

const registrationSchema = z.object({
  nome: z.string().min(3, "Nome completo é obrigatório"),
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  email: z.string().email("E-mail inválido"),
  login: z.string().min(3, "Login deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const SignUpPaidContent = () => {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const planId = searchParams.get('planId');
    const selectedPlan = allPlans.find(p => p.id === Number(planId)) || allPlans[1];

    const form = useForm<RegistrationFormValues>({
      resolver: zodResolver(registrationSchema),
      defaultValues: { nome: "", cnpj: "", cpf: "", login: "", password: "", confirmPassword: "", email: "" },
    });

    const formatCPF = (value: string) => {
        const v = value.replace(/\D/g, '').slice(0, 11);
        if (v.length <= 3) return v;
        if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
        if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
        return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
    };

    const formatCNPJ = (value: string) => {
        const v = value.replace(/\D/g, '').slice(0, 14);
        if (v.length <= 2) return v;
        if (v.length <= 5) return `${v.slice(0, 2)}.${v.slice(2)}`;
        if (v.length <= 8) return `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5)}`;
        if (v.length <= 12) return `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8)}`;
        return `${v.slice(0, 2)}.${v.slice(2, 5)}.${v.slice(5, 8)}/${v.slice(8, 12)}-${v.slice(12)}`;
    };

    const onSubmit = async (values: RegistrationFormValues) => {
        setLoading(true);
        try {
            const userCheck = await checkUserExists(values.login, values.email);
            if (!userCheck.success) {
                toast({ variant: "destructive", title: "Ops!", description: userCheck.message });
                setLoading(false);
                return;
            }

            const result = await registerPreUser({ ...values, planId: selectedPlan.id });
            if (result.success) {
                toast({ title: "Inscrição Iniciada!", description: "Agora faça login para configurar sua empresa e faturamento." });
                router.push('/login');
            } else {
                toast({ variant: "destructive", title: "Erro", description: result.message });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Erro", description: "Falha na comunicação com o servidor." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <AnimatedSection className="w-full max-w-xl">
                <Card className="shadow-2xl">
                    <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg py-10">
                        <CreditCard className="w-12 h-12 mx-auto mb-4" />
                        <CardTitle className="text-3xl font-bold font-headline">Assinar {selectedPlan.name}</CardTitle>
                        <CardDescription className="text-blue-100">R$ {selectedPlan.price}/mês. Crie seu acesso inicial abaixo.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField control={form.control} name="nome" render={({ field }) => (
                                    <FormItem><FormLabel>Seu Nome Completo</FormLabel><FormControl><div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input className="pl-10" {...field} /></div></FormControl><FormMessage /></FormItem>
                                )} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="cnpj" render={({ field }) => (
                                        <FormItem><FormLabel>CNPJ da Empresa</FormLabel><FormControl><div className="relative"><Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input className="pl-10" placeholder="00.000.000/0000-00" {...field} onChange={e => field.onChange(formatCNPJ(e.target.value))} /></div></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="cpf" render={({ field }) => (
                                        <FormItem><FormLabel>Seu CPF</FormLabel><FormControl><div className="relative"><ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input className="pl-10" placeholder="000.000.000-00" {...field} onChange={e => field.onChange(formatCPF(e.target.value))} /></div></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem><FormLabel>E-mail Principal</FormLabel><FormControl><Input type="email" placeholder="contato@empresa.com" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="login" render={({ field }) => (
                                    <FormItem><FormLabel>Escolha um Login</FormLabel><FormControl><Input placeholder="Como você entrará no sistema" {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField control={form.control} name="password" render={({ field }) => (
                                        <FormItem><FormLabel>Senha</FormLabel><FormControl><div className="relative"><Input type={showPassword ? "text" : "password"} {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</Button></div></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                        <FormItem><FormLabel>Confirmar Senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>
                                <Button type="submit" className="w-full text-xl py-8 bg-blue-600 hover:bg-blue-700 shadow-xl" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin mr-2" /> : <ArrowRight className="mr-2" />}
                                    {loading ? 'Processando...' : 'Próximo Passo'}
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
};

export default function SignUpPaidPage() {
    return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-blue-600" /></div>}><SignUpPaidContent /></Suspense>;
}
