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

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await loginUser(values);
      if (result.success && result.user) {
        toast({
          title: "Login bem-sucedido!",
          description: "Redirecionando para o painel...",
        });
        
        // A proper session management system should be implemented
        if (typeof window !== 'undefined') {
            localStorage.setItem('companyId', result.user.idempresa.toString());
            localStorage.setItem('userId', result.user.idusuarios.toString());
        }

        router.push('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: "Erro de Login",
          description: result.message,
        });
      }
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro. Por favor, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold font-headline">Área do Cliente</CardTitle>
              <CardDescription>Acesse sua conta para gerenciar seu negócio.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="seuemail@exemplo.com" {...field} />
                        </FormControl>
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
                           <Link href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                            Esqueceu a senha?
                          </Link>
                        </div>
                        <FormControl>
                          <Input type="password" placeholder="Sua senha" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                    {loading ? (
                       <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    ) : (
                       <LogIn className="mr-2 h-5 w-5" />
                    )}
                    {loading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </Form>
              <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                        Não tem uma conta?{' '}
                        <Link href="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                            Cadastre-se aqui.
                        </Link>
                    </p>
                </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
