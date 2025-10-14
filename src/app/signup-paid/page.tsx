
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle, FileText, Store, Briefcase, Building } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidCPF, isValidCNPJ } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerPaidUserAndCompany, checkUserExists } from '@/actions/auth-actions';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AnimatedSection from '@/components/home/AnimatedSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PaidContractDialog } from '@/components/signup/PaidContractDialog';
import { Label } from '@/components/ui/label';


const allPlans = [
    {
      id: 3,
      name: "Essencial",
      price: 80,
      description: "Pequenos comércios",
      icon: Store,
    },
    {
      id: 4,
      name: "Profissional",
      price: 120,
      description: "Lojas de médio porte",
      icon: Briefcase,
      popular: true,
    },
    {
      id: 5,
      name: "Empresarial",
      price: 190,
      description: "Redes com filiais",
      icon: Building,
    }
];

const baseRegistrationSchema = z.object({
  // User
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().min(1, "CPF é obrigatório.").refine(isValidCPF, "CPF inválido"),
  gender: z.enum(["male", "female", "other"], { required_error: "Gênero é obrigatório" }),
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
});

const paidRegistrationSchema = baseRegistrationSchema.extend({
  // Additional Company Data
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido."),
  inscricaoEstadual: z.string().min(1, "Inscrição Estadual é obrigatória."),
  regimeTributario: z.string({ required_error: "Regime Tributário é obrigatório." }),
  segmentoMercado: z.string().min(3, "Segmento de mercado é obrigatório."),
  diaVencimento: z.string({ required_error: "Dia de vencimento é obrigatório." }),
  emailComercial: z.string().email("E-mail comercial inválido."),
  instagram: z.string().optional(),
  // Plan Data
  planId: z.number({ required_error: "Plano é obrigatório."}),
  planName: z.string({ required_error: "Nome do plano é obrigatório."}),
  planPrice: z.number({ required_error: "Preço do plano é obrigatório."}),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"], 
});

export type PaidRegistrationFormValues = z.infer<typeof paidRegistrationSchema>;

const SignUpPaidContent = () => {
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(false);
    const [isContractOpen, setIsContractOpen] = useState(false);
    const [formData, setFormData] = useState<PaidRegistrationFormValues | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [selectedPlan, setSelectedPlan] = useState(() => {
        const planId = searchParams.get('planId');
        return allPlans.find(p => p.id === Number(planId)) || allPlans[1];
    });

    const form = useForm<PaidRegistrationFormValues>({
      resolver: zodResolver(paidRegistrationSchema),
      defaultValues: {
          fullName: '', cpf: '', gender: undefined, login: '',
          password: '', confirmPassword: '', phone: '', email: '',
          companyName: '', companyAddress: '', legalRepresentative: '', mainActivity: '',
          cnpj: '', inscricaoEstadual: '', regimeTributario: undefined,
          segmentoMercado: '', diaVencimento: undefined, emailComercial: '', instagram: '',
          planId: selectedPlan.id, planName: selectedPlan.name, planPrice: selectedPlan.price,
      },
    });

    const { trigger } = form;

    useEffect(() => {
        const planId = searchParams.get('planId');
        const plan = allPlans.find(p => p.id === Number(planId)) || allPlans[1];
        setSelectedPlan(plan);
    }, [searchParams]);

    useEffect(() => {
        if (selectedPlan) {
            form.setValue('planId', selectedPlan.id);
            form.setValue('planName', selectedPlan.name);
            form.setValue('planPrice', selectedPlan.price);
        }
    }, [selectedPlan, form]);


    const regimesTributarios = [
        { id: 1, nome: 'Lucro Real' }, { id: 2, nome: 'Lucro Presumido' },
        { id: 3, nome: 'Simples Nacional' }, { id: 4, nome: 'MEI (Microempreendedor Individual)' },
        { id: 5, nome: 'EIRELI' }, { id: 6, nome: 'Sociedade Limitada' },
        { id: 7, nome: 'Sociedade Anônima' }, { id: 8, nome: 'Cooperativa' },
        { id: 9, nome: 'Entidades sem Fins Lucrativos' },
    ];

    const diasVencimento = [5, 10, 15, 20, 25];

    const onFormSubmit = async (values: PaidRegistrationFormValues) => {
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
            const result = await registerPaidUserAndCompany(formData);
            if (result.success) {
                toast({
                    title: "Cadastro realizado com sucesso!",
                    description: "Sua conta foi criada. Redirecionando para o login...",
                });
                setTimeout(() => { router.push('/login'); }, 2000); 
            } else {
                toast({ variant: "destructive", title: "Erro no cadastro", description: result.message });
                setLoading(false);
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Erro inesperado", description: "Ocorreu um erro ao processar seu cadastro." });
            setLoading(false);
        } finally {
            setFormData(null);
        }
    }
    
    const getPlanCardStyle = (planId?: number | null): string => {
        if (!planId) return "shadow-lg bg-card";
        switch (planId) {
            case 3: // Essencial
                 return "shadow-lg bg-[#374151] text-white";
            case 4: // Profissional
                 return "shadow-lg bg-[#065F46] text-white";
            case 5: // Empresarial
                 return "shadow-lg bg-[#1E3A8A] text-white";
            default:
                return "shadow-lg bg-card";
        }
    };
    
    const formatCPF = (value: string) => {
      const numericValue = value.replace(/\D/g, '');
      const cpf = numericValue.slice(0, 11);

      if (cpf.length > 9) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      } else if (cpf.length > 6) {
        return cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
      } else if (cpf.length > 3) {
        return cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2');
      }
      return cpf;
    };


    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <AnimatedSection className="w-full max-w-4xl">
                <Card className="shadow-lg border-gray-200 dark:border-gray-700">
                    <CardHeader className="text-center space-y-4">
                    <CardTitle className="text-3xl font-bold font-headline">Contratar Plano NexusPro</CardTitle>
                    <CardDescription>
                        Preencha os dados abaixo para criar sua conta e configurar o faturamento.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-8">
                            <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg border-b pb-2 mb-4">Plano Escolhido</p>
                            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                            {allPlans.map((plan) => {
                                const Icon = plan.icon;
                                const isSelected = plan.id === selectedPlan.id;
                                return (
                                    <Card key={plan.id}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={cn(
                                            "cursor-pointer transition-all duration-300",
                                            getPlanCardStyle(plan.id),
                                            isSelected ? 'ring-2 ring-offset-2 ring-primary dark:ring-amber-400' : 'hover:scale-105'
                                        )}>
                                        <CardHeader className="flex-row gap-4 items-center space-y-0">
                                            <div className="w-10 h-10 bg-white/20 dark:bg-gray-700/50 rounded-full flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg text-white">{plan.name}</CardTitle>
                                                <CardDescription className="text-white/80">R$ {plan.price}/mês</CardDescription>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                )
                            })}
                            </div>
                        </div>

                        <Alert variant="default" className="mb-8 bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
                        <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <AlertTitle className="text-blue-800 dark:text-blue-300">Cadastro Completo</AlertTitle>
                        <AlertDescription className="text-blue-700 dark:text-blue-300">
                            Este formulário coleta todos os dados necessários (pessoais, empresariais e fiscais) para o funcionamento completo do sistema, incluindo faturamento e emissão de documentos.
                        </AlertDescription>
                        </Alert>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg border-b pb-2 mb-4">Dados da Empresa</p>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Nome da Empresa</FormLabel><FormControl><Input placeholder="Nome do seu negócio" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="legalRepresentative" render={({ field }) => (<FormItem><FormLabel>Representante Legal</FormLabel><FormControl><Input placeholder="Quem representa a empresa" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <FormField control={form.control} name="mainActivity" render={({ field }) => (<FormItem><FormLabel>Atividade Principal</FormLabel><FormControl><Input placeholder="Ex: Comércio varejista de roupas" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="companyAddress" render={({ field }) => (<FormItem><FormLabel>Endereço Completo</FormLabel><FormControl><Textarea placeholder="Rua Exemplo, 123, Bairro, Cidade - UF, CEP" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="cnpj" render={({ field }) => (<FormItem><FormLabel>CNPJ</FormLabel><FormControl><Input placeholder="00.000.000/0000-00" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="inscricaoEstadual" render={({ field }) => (<FormItem><FormLabel>Inscrição Estadual</FormLabel><FormControl><Input placeholder="Número da Inscrição Estadual" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <FormField control={form.control} name="regimeTributario" render={({ field }) => (<FormItem><FormLabel>Regime Tributário</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione o regime da sua empresa" /></SelectTrigger></FormControl><SelectContent>{regimesTributarios.map(regime => (<SelectItem key={regime.id} value={String(regime.id)}>{regime.nome}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="segmentoMercado" render={({ field }) => (<FormItem><FormLabel>Segmento de Mercado</FormLabel><FormControl><Input placeholder="Ex: Varejo de Roupas, Mercearia, etc." {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="diaVencimento" render={({ field }) => (<FormItem><FormLabel>Dia de Vencimento da Mensalidade</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione um dia" /></SelectTrigger></FormControl><SelectContent>{diasVencimento.map(dia => (<SelectItem key={dia} value={String(dia)}>Dia {dia}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="emailComercial" render={({ field }) => (<FormItem><FormLabel>E-mail Comercial (para faturamento)</FormLabel><FormControl><Input type="email" placeholder="financeiro@suaempresa.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <FormField control={form.control} name="instagram" render={({ field }) => (<FormItem><FormLabel>Instagram (Opcional)</FormLabel><FormControl><Input placeholder="@seuinstagram" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            </div>
                            
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg border-b pb-2 mb-4 mt-8">Dados do Usuário Administrador</p>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Seu nome completo" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="cpf" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CPF</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="000.000.000-00"
                                                        {...field}
                                                        onBlur={() => trigger('cpf')}
                                                        onChange={(e) => {
                                                            const formatted = formatCPF(e.target.value);
                                                            field.onChange(formatted);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="phone" render={({ field }) => (<FormItem><FormLabel>Telefone / WhatsApp</FormLabel><FormControl><Input placeholder="(00) 90000-0000" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                        <FormField control={form.control} name="email" render={({ field }) => (<FormItem><FormLabel>E-mail (pessoal para notificações)</FormLabel><FormControl><Input type="email" placeholder="seu-email@exemplo.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    </div>
                                    <FormField control={form.control} name="gender" render={({ field }) => (<FormItem><FormLabel>Sexo</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center gap-6 pt-2"><div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male" className="font-normal">Masculino</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female" className="font-normal">Feminino</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other" className="font-normal">Outro</Label></div></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                                </div>
                            </div>

                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-lg border-b pb-2 mb-4 mt-8">Dados de Acesso</p>
                                <div className="space-y-6">
                                <FormField control={form.control} name="login" render={({ field }) => (<FormItem><FormLabel>Login de Acesso</FormLabel><FormControl><Input placeholder="Crie um nome de usuário para acessar o sistema" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="password" render={({ field }) => (<FormItem><FormLabel>Senha</FormLabel><FormControl><div className="relative"><Input type={showPassword ? "text" : "password"} placeholder="Crie uma senha forte" {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</Button></div></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="confirmPassword" render={({ field }) => (<FormItem><FormLabel>Confirmar Senha</FormLabel><FormControl><div className="relative"><Input type={showConfirmPassword ? "text" : "password"} placeholder="Repita a senha" {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowConfirmPassword(prev => !prev)}>{showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</Button></div></FormControl><FormMessage /></FormItem>)} />
                                </div></div>
                            </div>
                            
                            <Button type="submit" className="w-full text-lg py-6 mt-8" disabled={loading}>
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ArrowRight className="mr-2 h-5 w-5" />}
                                {loading ? 'Verificando...' : 'Continuar para Plataforma'}
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
                </AnimatedSection>
            </main>
            <Footer />
            </div>

            {formData && (
                <PaidContractDialog
                    isOpen={isContractOpen}
                    onOpenChange={setIsContractOpen}
                    onAccept={handleContractAccept}
                    isLoading={loading}
                    formData={formData}
                    plan={selectedPlan}
                />
            )}
        </>
    );
};


const SignUpPaidPage = () => (
    <Suspense fallback={<div>Carregando...</div>}>
        <SignUpPaidContent />
    </Suspense>
);

export default SignUpPaidPage;
