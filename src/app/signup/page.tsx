'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidCPF } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerUserAndCompany, checkUserExists } from '@/actions/auth-actions';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { ContractDialog } from '@/components/signup/ContractDialog';
import AnimatedSection from '@/components/home/AnimatedSection';

const registrationSchema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().min(1, "CPF é obrigatório").refine((val) => isValidCPF(val), { message: "CPF inválido" }),
  gender: z.enum(["male", "female", "other"], { required_error: "Gênero é obrigatório" }),
  login: z.string().min(3, "Login deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  companyName: z.string().min(2, "Nome da empresa é obrigatório"),
  companyAddress: z.string().min(10, "Endereço completo é obrigatório"),
  legalRepresentative: z.string().min(3, "Representante legal é obrigatório"),
  mainActivity: z.string().min(3, "Atividade principal é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;

const SignUpPage = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isContractOpen, setIsContractOpen] = useState(false);
    const [formData, setFormData] = useState<RegistrationFormValues | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const form = useForm<RegistrationFormValues>({
      resolver: zodResolver(registrationSchema),
      mode: 'onBlur',
      defaultValues: {
          fullName: "",
          cpf: "",
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

    const formatCPF = (value: string) => {
      const v = value.replace(/\D/g, '').slice(0, 11);
      if (v.length <= 3) return v;
      if (v.length <= 6) return `${v.slice(0, 3)}.${v.slice(3)}`;
      if (v.length <= 9) return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
      return `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
    };

    const onFormSubmit = async (values: RegistrationFormValues) => {
        setLoading(true);
        const userCheck = await checkUserExists(values.login, values.email);
        if (!userCheck.success) {
            toast({ variant: "destructive", title: "Erro de Cadastro", description: userCheck.message });
            setLoading(false);
            return;
        }
        setFormData(values);
        setIsContractOpen(true);
        setLoading(false);
    };

    const handleContractAccept = async () => {
        if (!formData) return;
        setLoading(true);
        setIsContractOpen(false);
        try {
            const result = await registerUserAndCompany(formData);
            if (result.success) {
                toast({ title: "Cadastro realizado!", description: "Redirecionando para o login..." });
                setTimeout(() => router.push('/login'), 2000); 
            } else {
                toast({ variant: "destructive", title: "Erro no cadastro", description: result.message });
                setLoading(false);
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Erro inesperado", description: "Tente novamente." });
            setLoading(false);
        }
    };

  return (
    <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <AnimatedSection className="w-full max-w-3xl">
          <Card className="shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-bold font-headline">Crie sua Conta NexusPro</CardTitle>
              <CardDescription>Comece seu teste gratuito de 10 dias.</CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
                    <p className="font-semibold border-t pt-4 text-lg">Dados da Empresa</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="companyName" render={({ field }) => (
                            <FormItem><FormLabel>Nome da Empresa</FormLabel><FormControl><Input placeholder="Seu negócio" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="legalRepresentative" render={({ field }) => (
                            <FormItem><FormLabel>Representante Legal</FormLabel><FormControl><Input placeholder="Nome completo" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="mainActivity" render={({ field }) => (
                        <FormItem><FormLabel>Atividade Principal</FormLabel><FormControl><Input placeholder="Ex: Varejo" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="companyAddress" render={({ field }) => (
                        <FormItem><FormLabel>Endereço Completo</FormLabel><FormControl><Textarea placeholder="Rua, Número, Bairro, Cidade - UF" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    
                    <p className="font-semibold border-t pt-4 text-lg">Dados do Administrador</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Seu nome" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="cpf" render={({ field }) => (
                            <FormItem>
                                <FormLabel>CPF</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="000.000.000-00" 
                                        {...field}
                                        onChange={(e) => field.onChange(formatCPF(e.target.value))}
                                        onBlur={() => form.trigger('cpf')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Telefone / WhatsApp</FormLabel><FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" placeholder="seu-email@exemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                    </div>
                     <FormField control={form.control} name="gender" render={({ field }) => (
                      <FormItem><FormLabel>Sexo</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 pt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male">Masculino</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female">Feminino</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other">Outro</Label></div>
                      </RadioGroup></FormControl><FormMessage /></FormItem>
                    )} />

                    <p className="font-semibold border-t pt-4 text-lg">Dados de Acesso</p>
                    <FormField control={form.control} name="login" render={({ field }) => (
                        <FormItem><FormLabel>Login de Acesso</FormLabel><FormControl><Input placeholder="Usuário para login" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input type={showPassword ? "text" : "password"} placeholder="Senha forte" {...field} />
                              <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
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
                               <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ArrowRight className="mr-2 h-5 w-5" />}
                        {loading ? 'Verificando...' : 'Finalizar e Ver Termos'}
                      </Button>
                </form>
               </Form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
    {formData && <ContractDialog isOpen={isContractOpen} onOpenChange={setIsContractOpen} onAccept={handleContractAccept} isLoading={loading} formData={formData} />}
    </>
  );
};

export default SignUpPage;
