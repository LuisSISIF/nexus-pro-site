
'use client';

import React, { useState } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import InputMask from 'react-input-mask';
import { isValidCPF, isValidCNPJ, isValidRG } from '@/lib/validators';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const step1Schema = z.object({
  fullName: z.string().min(3, "Nome completo é obrigatório"),
  cpf: z.string().refine(isValidCPF, "CPF inválido"),
  rg: z.string().refine(isValidRG, "RG inválido"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), "Data de nascimento inválida"),
  gender: z.enum(["male", "female", "other"]),
  login: z.string().min(3, "Login deve ter pelo menos 3 caracteres"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  phone: z.string().min(14, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
});

const step2Schema = z.object({
  fantasyName: z.string().min(2, "Nome fantasia é obrigatório"),
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido"),
  socialReason: z.string().min(3, "Razão social é obrigatória"),
  taxRegime: z.string().min(1, "Regime tributário é obrigatório"),
  stateInscription: z.string().optional(),
  municipalInscription: z.string().optional(),
  mainActivity: z.string().min(3, "Atividade principal é obrigatória"),
  marketSegment: z.string().min(3, "Segmento de mercado é obrigatório"),
  street: z.string().min(3, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(3, "Bairro é obrigatório"),
  city: z.string().min(3, "Cidade é obrigatória"),
  state: z.string().length(2, "UF deve ter 2 caracteres"),
  cep: z.string().min(9, "CEP inválido"),
  ownerName: z.string().min(3, "Nome do proprietário é obrigatório"),
  commercialEmail: z.string().email("E-mail comercial inválido"),
  website: z.string().optional(),
  commercialPhone: z.string().min(14, "Telefone comercial inválido"),
  instagram: z.string().optional(),
});


const Step1 = ({ nextStep, form }: { nextStep: () => void, form: any }) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(nextStep)} className="space-y-6 animate-in fade-in-50 duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="fullName" render={({ field }) => (
            <FormItem><FormLabel>Nome Completo</FormLabel><FormControl><Input placeholder="Seu nome completo" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="cpf" render={({ field }) => (
            <FormItem><FormLabel>CPF</FormLabel><FormControl>
              <InputMask mask="999.999.999-99" value={field.value} onChange={field.onChange}>
                {(inputProps: any) => <Input {...inputProps} placeholder="000.000.000-00" />}
              </InputMask>
            </FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="rg" render={({ field }) => (
             <FormItem><FormLabel>RG</FormLabel><FormControl><Input placeholder="00.000.000-0" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
           <FormField control={form.control} name="dob" render={({ field }) => (
            <FormItem><FormLabel>Data de Nascimento</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <FormField control={form.control} name="gender" render={({ field }) => (
          <FormItem><FormLabel>Sexo</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center gap-6">
            <div className="flex items-center space-x-2"><RadioGroupItem value="male" id="male" /><Label htmlFor="male" className="font-normal">Masculino</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="female" id="female" /><Label htmlFor="female" className="font-normal">Feminino</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="other" id="other" /><Label htmlFor="other" className="font-normal">Outro</Label></div>
          </RadioGroup></FormControl><FormMessage /></FormItem>
        )} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="login" render={({ field }) => (
            <FormItem><FormLabel>Login</FormLabel><FormControl><Input placeholder="Escolha um nome de usuário" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem><FormLabel>Senha</FormLabel><FormControl><Input type="password" placeholder="Crie uma senha forte" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem><FormLabel>Telefone</FormLabel><FormControl>
              <InputMask mask="(99) 99999-9999" value={field.value} onChange={field.onChange}>
                {(inputProps: any) => <Input {...inputProps} placeholder="(00) 90000-0000" />}
              </InputMask>
            </FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>E-mail</FormLabel><FormControl><Input type="email" placeholder="seu-email@exemplo.com" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <Button type="submit" className="w-full text-lg py-6">
          Próximo Passo <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Form>
  );
};

const Step2 = ({ prevStep, form, onSubmit }: { prevStep: () => void, form: any, onSubmit: (values: any) => void }) => {
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in-50 duration-500">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="fantasyName" render={({ field }) => (
            <FormItem><FormLabel>Nome Fantasia</FormLabel><FormControl><Input placeholder="Nome do seu negócio" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="cnpj" render={({ field }) => (
            <FormItem><FormLabel>CNPJ</FormLabel><FormControl>
              <InputMask mask="99.999.999/9999-99" value={field.value} onChange={field.onChange}>
                {(inputProps: any) => <Input {...inputProps} placeholder="00.000.000/0001-00" />}
              </InputMask>
            </FormControl><FormMessage /></FormItem>
        )} />
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="socialReason" render={({ field }) => (
            <FormItem><FormLabel>Razão Social</FormLabel><FormControl><Input placeholder="Razão social da empresa" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="taxRegime" render={({ field }) => (
            <FormItem><FormLabel>Regime Tributário</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue placeholder="Selecione o regime" /></SelectTrigger></FormControl>
                <SelectContent>
                    <SelectItem value="simples">Simples Nacional</SelectItem>
                    <SelectItem value="presumido">Lucro Presumido</SelectItem>
                    <SelectItem value="real">Lucro Real</SelectItem>
                    <SelectItem value="mei">MEI</SelectItem>
                    <SelectItem value="eireli">EIRELI</SelectItem>
                    <SelectItem value="ltda">Sociedade Limitada</SelectItem>
                    <SelectItem value="sa">Sociedade Anônima</SelectItem>
                    <SelectItem value="coop">Cooperativa</SelectItem>
                    <SelectItem value="semfins">Entidade sem Fins Lucrativos</SelectItem>
                </SelectContent>
            </Select><FormMessage /></FormItem>
        )} />
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={form.control} name="stateInscription" render={({ field }) => (
            <FormItem><FormLabel>Inscrição Estadual (Opcional)</FormLabel><FormControl><Input placeholder="Número da I.E." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="municipalInscription" render={({ field }) => (
            <FormItem><FormLabel>Inscrição Municipal (Opcional)</FormLabel><FormControl><Input placeholder="Número da I.M." {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField control={form.control} name="mainActivity" render={({ field }) => (
            <FormItem><FormLabel>Atividade Principal</FormLabel><FormControl><Input placeholder="Ex: Comércio varejista" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="marketSegment" render={({ field }) => (
            <FormItem><FormLabel>Segmento de Mercado</FormLabel><FormControl><Input placeholder="Ex: Supermercado" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

      <p className="font-medium text-gray-800 dark:text-gray-200 border-t pt-4">Endereço da Empresa</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 col-span-2">
          <FormField control={form.control} name="street" render={({ field }) => (
            <FormItem><FormLabel>Rua</FormLabel><FormControl><Input placeholder="Nome da rua" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
        <div className="space-y-2">
          <FormField control={form.control} name="number" render={({ field }) => (
            <FormItem><FormLabel>Nº</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField control={form.control} name="neighborhood" render={({ field }) => (
            <FormItem><FormLabel>Bairro</FormLabel><FormControl><Input placeholder="Seu bairro" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="city" render={({ field }) => (
            <FormItem><FormLabel>Cidade</FormLabel><FormControl><Input placeholder="Sua cidade" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="state" render={({ field }) => (
            <FormItem><FormLabel>Estado</FormLabel><FormControl><Input placeholder="UF" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
      </div>
       <div className="space-y-2">
         <FormField control={form.control} name="cep" render={({ field }) => (
            <FormItem><FormLabel>CEP</FormLabel><FormControl>
              <InputMask mask="99999-999" value={field.value} onChange={field.onChange}>
                {(inputProps: any) => <Input {...inputProps} placeholder="00000-000" />}
              </InputMask>
            </FormControl><FormMessage /></FormItem>
        )} />
       </div>
       <p className="font-medium text-gray-800 dark:text-gray-200 border-t pt-4">Contato da Empresa</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="ownerName" render={({ field }) => (
                <FormItem><FormLabel>Nome do Proprietário/Representante Legal</FormLabel><FormControl><Input placeholder="Nome completo" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="commercialEmail" render={({ field }) => (
                <FormItem><FormLabel>E-mail Comercial</FormLabel><FormControl><Input type="email" placeholder="contato@suaempresa.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField control={form.control} name="website" render={({ field }) => (
                <FormItem><FormLabel>Site (opcional)</FormLabel><FormControl><Input placeholder="www.suaempresa.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="commercialPhone" render={({ field }) => (
                <FormItem><FormLabel>Telefone</FormLabel><FormControl>
                  <InputMask mask="(99) 9999-9999" value={field.value} onChange={field.onChange}>
                    {(inputProps: any) => <Input {...inputProps} type="tel" placeholder="(00) 0000-0000" />}
                  </InputMask>
                </FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="instagram" render={({ field }) => (
                <FormItem><FormLabel>Instagram (opcional)</FormLabel><FormControl><Input placeholder="@seuusuario" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>

      <div className="flex justify-between gap-4">
        <Button onClick={prevStep} type="button" variant="outline" className="w-1/3 text-lg py-6">
          <ArrowLeft className="mr-2 h-5 w-5" /> Voltar
        </Button>
        <Button type="submit" className="w-2/3 text-lg py-6">
          Finalizar Cadastro <Check className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </form>
    </Form>
  );
};


const SignUpPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const formStep1 = useForm({
      resolver: zodResolver(step1Schema),
      defaultValues: { fullName: "", cpf: "", rg: "", dob: "", gender: "male", login: "", password: "", phone: "", email: "" },
    });

    const formStep2 = useForm({
        resolver: zodResolver(step2Schema),
        defaultValues: { fantasyName: "", cnpj: "", socialReason: "", taxRegime: "", stateInscription: "", municipalInscription: "", mainActivity: "", marketSegment: "", street: "", number: "", neighborhood: "", city: "", state: "", cep: "", ownerName: "", commercialEmail: "", website: "", commercialPhone: "", instagram: "" },
    });

    const nextStep = (values: any) => {
      setFormData(prev => ({...prev, ...values}));
      setStep(s => Math.min(s + 1, 2));
    };
    
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
    
    const onSubmit = (values: any) => {
        const finalData = {...formData, ...values};
        console.log("Formulário enviado:", finalData);
        // Aqui você enviaria os dados para o servidor
    }

    const progress = (step / 2) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-3xl">
          <Card className="shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-bold font-headline">Crie sua Conta NexusPro</CardTitle>
              <CardDescription>
                {step === 1 ? "Passo 1 de 2: Vamos começar com seus dados pessoais." : "Passo 2 de 2: Agora, informe os dados da sua empresa."}
              </CardDescription>
              <Progress value={progress} className="w-full" />
            </CardHeader>
            <CardContent>
                {step === 1 && <Step1 nextStep={formStep1.handleSubmit(nextStep)} form={formStep1} />}
                {step === 2 && <Step2 prevStep={prevStep} form={formStep2} onSubmit={onSubmit} />}
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
