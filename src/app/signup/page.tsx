
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, EyeOff, Loader2, User, Building, ShieldCheck } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidCPF, isValidCNPJ } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerPreUser, checkUserExists } from '@/actions/auth-actions';
import { useToast } from '@/hooks/use-toast';
import AnimatedSection from '@/components/home/AnimatedSection';

const registrationSchema = z.object({
  nome: z.string().min(3, "Nome completo é obrigatório"),
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const SignUpPage = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const form = useForm<RegistrationFormValues>({
      resolver: zodResolver(registrationSchema),
      defaultValues: { nome: "", cnpj: "", cpf: "", password: "", confirmPassword: "", email: "" },
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
            // Verifica apenas o e-mail inicial, o login será verificado no setup
            const userCheck = await checkUserExists(values.email, values.email);
            if (!userCheck.success) {
                toast({ variant: "destructive", title: "Ops!", description: userCheck.message });
                setLoading(false);
                return;
            }

            const result = await registerPreUser({ ...values, planId: 2 });
            if (result.success) {
                toast({ title: "Quase lá!", description: "Pré-cadastro realizado. Faça login para configurar seu sistema." });
                router.push('/login');
            } else {
                toast({ variant: "destructive", title: "Erro", description: result.message });
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Erro", description: "Ocorreu um erro inesperado." });
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <AnimatedSection className="w-full max-w-xl">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-headline">Teste Grátis por 10 Dias</CardTitle>
              <CardDescription>Crie seu acesso rápido e configure seu sistema em segundos.</CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField control={form.control} name="nome" render={({ field }) => (
                        <FormItem><FormLabel>Seu Nome Completo</FormLabel><FormControl><div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input className="pl-10" placeholder="Como devemos te chamar?" {...field} /></div></FormControl><FormMessage /></FormItem>
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
                        <FormItem><FormLabel>E-mail (Será seu login inicial)</FormLabel><FormControl><Input type="email" placeholder="seu-email@exemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem><FormLabel>Senha</FormLabel><FormControl><div className="relative"><Input type={showPassword ? "text" : "password"} {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</Button></div></FormControl><FormMessage /></FormItem>
                      )} />
                       <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                         <FormItem><FormLabel>Confirmar Senha</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                    <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ArrowRight className="mr-2 h-5 w-5" />}
                        {loading ? 'Processando...' : 'Criar Conta e Iniciar'}
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

export default SignUpPage;
