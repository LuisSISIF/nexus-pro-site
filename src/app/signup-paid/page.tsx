
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Eye, EyeOff, Loader2, Store, Briefcase, Building, ShieldCheck, UserCheck, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { isValidCPF, isValidCNPJ } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { registerPaidUserAndCompany, checkUserExists } from '@/actions/auth-actions';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import AnimatedSection from '@/components/home/AnimatedSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PaidContractDialog } from '@/components/signup/PaidContractDialog';
import { Label } from '@/components/ui/label';

const allPlans = [
    { id: 3, name: "Essencial", price: 80, icon: Store },
    { id: 4, name: "Profissional", price: 120, icon: Briefcase, popular: true },
    { id: 5, name: "Empresarial", price: 190, icon: Building }
];

const regimesTributarios = [
    { id: 1, nome: 'Lucro Real' },
    { id: 2, nome: 'Lucro Presumido' },
    { id: 3, nome: 'Simples Nacional' },
    { id: 4, nome: 'MEI (Microempreendedor Individual)' },
    { id: 5, nome: 'EIRELI' },
    { id: 6, nome: 'Sociedade Limitada' },
    { id: 7, nome: 'Sociedade Anônima' },
    { id: 8, nome: 'Cooperativa' },
    { id: 9, nome: 'Entidades sem Fins Lucrativos' },
];

const paidRegistrationSchema = z.object({
  // Dados do Administrador
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().min(1, "CPF é obrigatório").refine((val) => isValidCPF(val), { message: "CPF inválido" }),
  gender: z.enum(["male", "female", "other"], { required_error: "Gênero é obrigatório" }),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail de contato inválido"),
  
  // Credenciais
  login: z.string().min(3, "Login deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6),
  
  // Dados da Empresa
  companyName: z.string().min(2, "Nome da empresa é obrigatório"),
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido"),
  companyAddress: z.string().min(10, "Endereço completo é obrigatório"),
  legalRepresentative: z.string().min(3, "Representante legal é obrigatório"),
  mainActivity: z.string().min(3, "Atividade principal é obrigatória"),
  
  // Dados Fiscais/Cobrança
  inscricaoEstadual: z.string().min(1, "Inscrição Estadual é obrigatória"),
  regimeTributario: z.string({ required_error: "Regime Tributário é obrigatório" }),
  segmentoMercado: z.string().min(3, "Segmento de mercado é obrigatório"),
  diaVencimento: z.string({ required_error: "Dia de vencimento é obrigatório" }),
  emailComercial: z.string().email("E-mail comercial/faturamento inválido"),
  instagram: z.string().optional(),
  
  // Plano
  planId: z.number(),
  planName: z.string(),
  planPrice: z.number(),
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
    
    const [selectedPlan] = useState(() => {
        const planId = searchParams.get('planId');
        return allPlans.find(p => p.id === Number(planId)) || allPlans[1];
    });

    const form = useForm<PaidRegistrationFormValues>({
      resolver: zodResolver(paidRegistrationSchema),
      mode: 'onBlur',
      defaultValues: {
          fullName: '', cpf: '', gender: 'male' as any, phone: '', email: '',
          login: '', password: '', confirmPassword: '',
          companyName: '', companyAddress: '', legalRepresentative: '', mainActivity: '',
          cnpj: '', inscricaoEstadual: '', segmentoMercado: '', emailComercial: '', instagram: '',
          diaVencimento: '10',
          planId: selectedPlan.id, planName: selectedPlan.name, planPrice: selectedPlan.price,
      },
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

    const onFormSubmit = async (values: PaidRegistrationFormValues) => {
        setLoading(true);
        // Verifica se usuário ou e-mail já existem antes de abrir o contrato
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
        try {
            const result = await registerPaidUserAndCompany(formData);
            if (result.success) {
                toast({ title: "Sucesso!", description: "Sua conta e assinatura foram criadas com sucesso. Redirecionando para o login..." });
                setTimeout(() => router.push('/login'), 2000); 
            } else {
                toast({ variant: "destructive", title: "Erro na Contratação", description: result.message });
                setLoading(false);
                setIsContractOpen(false);
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Erro de Comunicação", description: "Houve um problema ao processar seu pedido. Tente novamente." });
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <AnimatedSection className="w-full max-w-4xl">
                <Card className="shadow-2xl border-blue-100 dark:border-gray-800">
                    <CardHeader className="text-center bg-blue-600 text-white rounded-t-lg py-10">
                        <div className="flex justify-center mb-4">
                           <div className="bg-white/20 p-3 rounded-full">
                                <CreditCard className="w-10 h-10 text-white" />
                           </div>
                        </div>
                        <CardTitle className="text-4xl font-bold font-headline">Assinar NexusPro</CardTitle>
                        <CardDescription className="text-blue-100 text-lg">Você escolheu o plano <strong>{selectedPlan.name}</strong> (R$ {selectedPlan.price}/mês).</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-10">
                                
                                {/* SEÇÃO: EMPRESA */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-b pb-2">
                                        <Building className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dados da Empresa</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="companyName" render={({ field }) => (
                                            <FormItem><FormLabel>Razão Social / Nome Fantasia</FormLabel><FormControl><Input placeholder="Ex: Nexus Store Ltda" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="cnpj" render={({ field }) => (
                                            <FormItem><FormLabel>CNPJ</FormLabel><FormControl><Input placeholder="00.000.000/0000-00" {...field} onChange={(e) => field.onChange(formatCNPJ(e.target.value))} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="legalRepresentative" render={({ field }) => (
                                            <FormItem><FormLabel>Representante Legal</FormLabel><FormControl><Input placeholder="Nome do responsável" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="mainActivity" render={({ field }) => (
                                            <FormItem><FormLabel>Ramo de Atividade</FormLabel><FormControl><Input placeholder="Ex: Comércio de Roupas" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                    <FormField control={form.control} name="companyAddress" render={({ field }) => (
                                        <FormItem><FormLabel>Endereço Completo</FormLabel><FormControl><Textarea placeholder="Rua, Número, Complemento, Bairro, Cidade - UF" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>

                                {/* SEÇÃO: FISCAL E FATURAMENTO */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-b pb-2">
                                        <ShieldCheck className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dados Fiscais e Faturamento</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="inscricaoEstadual" render={({ field }) => (
                                            <FormItem><FormLabel>Inscrição Estadual</FormLabel><FormControl><Input placeholder="Número ou Isento" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="regimeTributario" render={({ field }) => (
                                            <FormItem><FormLabel>Regime Tributário</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione o regime" /></SelectTrigger></FormControl><SelectContent>{regimesTributarios.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.nome}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="segmentoMercado" render={({ field }) => (
                                            <FormItem><FormLabel>Segmento de Mercado</FormLabel><FormControl><Input placeholder="Ex: Varejo" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="diaVencimento" render={({ field }) => (
                                            <FormItem><FormLabel>Vencimento da Mensalidade</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Escolha um dia" /></SelectTrigger></FormControl><SelectContent><SelectItem value="5">Dia 5</SelectItem><SelectItem value="10">Dia 10</SelectItem><SelectItem value="15">Dia 15</SelectItem><SelectItem value="20">Dia 20</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="emailComercial" render={({ field }) => (
                                            <FormItem><FormLabel>E-mail para Boletos / Faturas</FormLabel><FormControl><Input type="email" placeholder="financeiro@empresa.com" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="instagram" render={({ field }) => (
                                            <FormItem><FormLabel>Instagram (Opcional)</FormLabel><FormControl><Input placeholder="@suaempresa" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                </div>

                                {/* SEÇÃO: ADMINISTRADOR */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-b pb-2">
                                        <UserCheck className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dados do Administrador</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="fullName" render={({ field }) => (
                                            <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Seu nome" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="cpf" render={({ field }) => (
                                            <FormItem><FormLabel>CPF</FormLabel><FormControl><Input placeholder="000.000.000-00" {...field} onChange={(e) => field.onChange(formatCPF(e.target.value))} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem><FormLabel>Celular / WhatsApp</FormLabel><FormControl><Input placeholder="(00) 00000-0000" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem><FormLabel>E-mail Principal de Acesso</FormLabel><FormControl><Input type="email" placeholder="seuemail@exemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                    <FormField control={form.control} name="gender" render={({ field }) => (
                                        <FormItem><FormLabel>Sexo</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 pt-2">
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male_p" /><Label htmlFor="male_p">Masculino</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female_p" /><Label htmlFor="female_p">Feminino</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other_p" /><Label htmlFor="other_p">Outro</Label></div>
                                        </RadioGroup></FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>

                                {/* SEÇÃO: ACESSO */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 border-b pb-2">
                                        <UserCheck className="w-5 h-5 text-blue-600" />
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Credenciais de Acesso</h3>
                                    </div>
                                    <FormField control={form.control} name="login" render={({ field }) => (
                                        <FormItem><FormLabel>Login de Acesso ao Sistema</FormLabel><FormControl><Input placeholder="Crie um nome de usuário" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField control={form.control} name="password" render={({ field }) => (
                                            <FormItem><FormLabel>Senha</FormLabel><FormControl><div className="relative"><Input type={showPassword ? "text" : "password"} placeholder="Mínimo 6 caracteres" {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</Button></div></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                            <FormItem><FormLabel>Confirmar Senha</FormLabel><FormControl><div className="relative"><Input type={showConfirmPassword ? "text" : "password"} placeholder="Repita a senha" {...field} /><Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}</Button></div></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full text-xl py-8 bg-blue-600 hover:bg-blue-700 shadow-xl" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin mr-2" /> : <ArrowRight className="mr-2" />}
                                    {loading ? 'Processando...' : 'Finalizar Cadastro e Ver Contrato'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                </AnimatedSection>
            </main>
            <Footer />
            {formData && <PaidContractDialog isOpen={isContractOpen} onOpenChange={setIsContractOpen} onAccept={handleContractAccept} isLoading={loading} formData={formData} plan={selectedPlan} />}
        </div>
    );
};

export default function SignUpPaidPage() {
    return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-blue-600" /></div>}><SignUpPaidContent /></Suspense>;
}
