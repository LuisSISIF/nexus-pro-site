
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Eye, EyeOff, Loader2, FileText, Store, Briefcase, Building } from 'lucide-react';
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
    { id: 3, name: "Essencial", price: 80, icon: Store },
    { id: 4, name: "Profissional", price: 120, icon: Briefcase, popular: true },
    { id: 5, name: "Empresarial", price: 190, icon: Building }
];

const paidRegistrationSchema = z.object({
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
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido"),
  inscricaoEstadual: z.string().min(1, "Inscrição Estadual é obrigatória"),
  regimeTributario: z.string({ required_error: "Regime Tributário é obrigatório" }),
  segmentoMercado: z.string().min(3, "Segmento de mercado é obrigatório"),
  diaVencimento: z.string({ required_error: "Dia de vencimento é obrigatório" }),
  emailComercial: z.string().email("E-mail comercial inválido"),
  instagram: z.string().optional(),
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
    
    const [selectedPlan, setSelectedPlan] = useState(() => {
        const planId = searchParams.get('planId');
        return allPlans.find(p => p.id === Number(planId)) || allPlans[1];
    });

    const form = useForm<PaidRegistrationFormValues>({
      resolver: zodResolver(paidRegistrationSchema),
      mode: 'onBlur',
      defaultValues: {
          fullName: '', cpf: '', login: '', password: '', confirmPassword: '', phone: '', email: '',
          companyName: '', companyAddress: '', legalRepresentative: '', mainActivity: '',
          cnpj: '', inscricaoEstadual: '', segmentoMercado: '', emailComercial: '', instagram: '',
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

    const onFormSubmit = async (values: PaidRegistrationFormValues) => {
        setLoading(true);
        const userCheck = await checkUserExists(values.login, values.email);
        if (!userCheck.success) {
            toast({ variant: "destructive", title: "Erro", description: userCheck.message });
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
                toast({ title: "Sucesso!", description: "Sua conta foi criada." });
                setTimeout(() => router.push('/login'), 2000); 
            } else {
                toast({ variant: "destructive", title: "Erro", description: result.message });
                setLoading(false);
            }
        } catch (error) {
            toast({ variant: "destructive", title: "Erro", description: "Tente novamente." });
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <AnimatedSection className="w-full max-w-4xl">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold font-headline">Contratar NexusPro</CardTitle>
                        <CardDescription>Preencha os dados completos para faturamento.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
                                <p className="font-semibold border-t pt-4 text-lg">Dados da Empresa</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Nome da Empresa</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="cnpj" render={({ field }) => (<FormItem><FormLabel>CNPJ</FormLabel><FormControl><Input placeholder="00.000.000/0000-00" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="emailComercial" render={({ field }) => (<FormItem><FormLabel>E-mail Comercial</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="diaVencimento" render={({ field }) => (<FormItem><FormLabel>Dia de Vencimento</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Escolha um dia" /></SelectTrigger></FormControl><SelectContent><SelectItem value="5">Dia 5</SelectItem><SelectItem value="10">Dia 10</SelectItem><SelectItem value="15">Dia 15</SelectItem><SelectItem value="20">Dia 20</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                                </div>
                                
                                <p className="font-semibold border-t pt-4 text-lg">Dados do Administrador</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField control={form.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                    <FormField control={form.control} name="cpf" render={({ field }) => (
                                        <FormItem><FormLabel>CPF</FormLabel><FormControl>
                                            <Input placeholder="000.000.000-00" {...field} onChange={(e) => field.onChange(formatCPF(e.target.value))} />
                                        </FormControl><FormMessage /></FormItem>
                                    )} />
                                </div>

                                <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
                                    {loading ? 'Processando...' : 'Finalizar e Aceitar Contrato'}
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
    return <Suspense><SignUpPaidContent /></Suspense>;
}
