
'use client';

import React, { useState } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidCPF } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerUserAndCompany } from '@/actions/auth-actions';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const registrationSchema = z.object({
  // User
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  gender: z.enum(["male", "female", "other"], { required_error: "Gênero é obrigatório"}),
  login: z.string().min(3, "Login deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  
  // Company
  companyName: z.string().min(2, "Nome da empresa é obrigatório"),
  companyAddress: z.string().min(10, "Endereço completo é obrigatório"),
  legalRepresentative: z.string().min(3, "Representante legal é obrigatório"),
  mainActivity: z.string().min(3, "Atividade principal é obrigatória"),

}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;


const SignUpPage = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const form = useForm<RegistrationFormValues>({
      resolver: zodResolver(registrationSchema),
      defaultValues: {
          fullName: "",
          cpf: "",
          gender: undefined,
          login: "",
          password: "",
          confirmPassword: "",
          phone: "",
          email: "",
          companyName: "",
          companyAddress: "",
          legalRepresentative: "",
          mainActivity: "",
      },
    });

    const onSubmit = async (values: RegistrationFormValues) => {
        setLoading(true);
        try {
            const result = await registerUserAndCompany(values);
            if (result.success) {
                toast({
                    title: "Cadastro realizado com sucesso!",
                    description: "Seu conta foi criada e você já pode fazer o login.",
                });
                // TODO: Redirect to login page or dashboard
            } else {
                toast({
                    variant: "destructive",
                    title: "Erro no cadastro",
                    description: result.message,
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro inesperado",
                description: "Ocorreu um erro ao processar seu cadastro. Tente novamente.",
            });
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-3xl">
          <Card className="shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-bold font-headline">Crie sua Conta NexusPro</CardTitle>
              <CardDescription>
                Comece seu teste gratuito de 14 dias preenchendo os dados abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    
                    <p className="font-semibold text-gray-800 dark:text-gray-200 border-t pt-4 text-lg">Dados da Empresa</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="companyName" render={({ field }) => (
                            <FormItem><FormLabel>Nome da Empresa</FormLabel><FormControl><Input placeholder="Nome do seu negócio" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="legalRepresentative" render={({ field }) => (
                            <FormItem><FormLabel>Representante Legal</FormLabel><FormControl><Input placeholder="Quem representa a empresa" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="mainActivity" render={({ field }) => (
                        <FormItem><FormLabel>Atividade Principal</FormLabel><FormControl><Input placeholder="Ex: Comércio varejista, etc" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="companyAddress" render={({ field }) => (
                        <FormItem><FormLabel>Endereço Completo</FormLabel><FormControl><Textarea placeholder="Rua Exemplo, 123, Bairro, Cidade - UF, CEP" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <p className="font-semibold text-gray-800 dark:text-gray-200 border-t pt-4 text-lg">Dados do Usuário Administrador</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Seu nome completo" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cpf" render={({ field }) => (
                            <FormItem><FormLabel>CPF</FormLabel><FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Telefone / WhatsApp</FormLabel><FormControl>
                            <Input placeholder="(00) 90000-0000" {...field} />
                          </FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" placeholder="seu-email@exemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="gender" render={({ field }) => (
                      <FormItem><FormLabel>Sexo</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center gap-6 pt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male" className="font-normal">Masculino</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female" className="font-normal">Feminino</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other" className="font-normal">Outro</Label></div>
                      </RadioGroup></FormControl><FormMessage /></FormItem>
                    )} />

                    <p className="font-semibold text-gray-800 dark:text-gray-200 border-t pt-4 text-lg">Dados de Acesso</p>
                    <FormField control={form.control} name="login" render={({ field }) => (
                        <FormItem><FormLabel>Login de Acesso</FormLabel><FormControl><Input placeholder="Crie um nome de usuário para acessar o sistema" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type={showPassword ? "text" : "password"} placeholder="Crie uma senha forte" {...field} />
                              <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                       <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                         <FormItem>
                          <FormLabel>Confirmar Senha</FormLabel>
                           <FormControl>
                            <div className="relative">
                              <Input type={showConfirmPassword ? "text" : "password"} placeholder="Repita a senha" {...field} />
                               <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                        {loading ? (
                           <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                           <Check className="mr-2 h-5 w-5" />
                        )}
                        {loading ? 'Finalizando Cadastro...' : 'Finalizar Cadastro e Iniciar Teste'}
                      </Button>
                </form>
               </Form>
                 <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                        Já tem uma conta?{' '}
                        <Link href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                            Faça login aqui.
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

export default SignUpPage;
