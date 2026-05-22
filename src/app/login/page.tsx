
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { LogIn, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginUser } from '@/actions/auth-actions';
import { useToast } from '@/hooks/use-toast';
import AnimatedSection from '@/components/home/AnimatedSection';

const loginSchema = z.object({
  email: z.string().min(1, { message: "E-mail ou Login é obrigatório." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await loginUser(values);
      if (result.success) {
        if (typeof window !== 'undefined') {
            // Se for pré-usuário, guardamos os dados básicos para o setup
            if (result.needsSetup) {
                localStorage.setItem('preUser', JSON.stringify(result.user));
                toast({ title: "Bem-vindo!", description: "Vamos configurar seu sistema NexusPro." });
                router.push('/setup');
                return;
            }

            // Login normal
            localStorage.setItem('companyId', result.user.idempresa.toString());
            localStorage.setItem('userId', result.user.idusuarios.toString());
        }

        toast({ title: "Login realizado!", description: "Acessando painel..." });
        router.push('/dashboard');
      } else {
        toast({ variant: "destructive", title: "Erro de Login", description: result.message });
      }
    } catch (error) {
       toast({ variant: "destructive", title: "Erro inesperado", description: "Tente novamente mais tarde." });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <AnimatedSection className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold font-headline">Acessar NexusPro</CardTitle>
              <CardDescription>Insira suas credenciais para gerenciar seu negócio.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail ou Login</FormLabel>
                        <FormControl><Input placeholder="seuemail@exemplo.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center justify-between">
                           <FormLabel>Senha</FormLabel>
                           <Link href="#" className="text-xs text-blue-600 hover:underline">Esqueceu a senha?</Link>
                        </div>
                        <FormControl><Input type="password" placeholder="Sua senha" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
                    {loading ? 'Autenticando...' : 'Entrar'}
                  </Button>
                </form>
              </Form>
              <div className="mt-6 text-center text-sm">
                    <p className="text-muted-foreground">Não tem uma conta? <Link href="/signup" className="font-semibold text-blue-600 hover:underline">Comece agora.</Link></p>
                </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
