
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

const Step1 = ({ nextStep }: { nextStep: () => void }) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input id="fullName" placeholder="Seu nome completo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" placeholder="000.000.000-00" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="rg">RG</Label>
          <Input id="rg" placeholder="00.000.000-0" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Data de Nascimento</Label>
          <Input id="dob" type="date" />
        </div>
      </div>
       <div className="space-y-2">
        <Label>Sexo</Label>
        <RadioGroup defaultValue="male" className="flex items-center gap-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male" className="font-normal">Masculino</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female" className="font-normal">Feminino</Label>
          </div>
           <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="font-normal">Outro</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="login">Login</Label>
          <Input id="login" placeholder="Escolha um nome de usuário" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" placeholder="Crie uma senha forte" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" type="tel" placeholder="(00) 90000-0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="seu-email@exemplo.com" />
        </div>
      </div>
      <Button onClick={nextStep} className="w-full text-lg py-6">
        Próximo Passo <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};

const Step2 = ({ prevStep }: { prevStep: () => void }) => {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fantasyName">Nome Fantasia</Label>
          <Input id="fantasyName" placeholder="Nome do seu negócio" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cnpj">CNPJ</Label>
          <Input id="cnpj" placeholder="00.000.000/0001-00" />
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="socialReason">Razão Social</Label>
          <Input id="socialReason" placeholder="Razão social da empresa" />
        </div>
         <div className="space-y-2">
          <Label htmlFor="taxRegime">Regime Tributário</Label>
          <Select>
            <SelectTrigger id="taxRegime">
              <SelectValue placeholder="Selecione o regime" />
            </SelectTrigger>
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
          </Select>
        </div>
      </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stateInscription">Inscrição Estadual</Label>
          <Input id="stateInscription" placeholder="Número da I.E." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="municipalInscription">Inscrição Municipal</Label>
          <Input id="municipalInscription" placeholder="Número da I.M." />
        </div>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="mainActivity">Atividade Principal</Label>
                <Input id="mainActivity" placeholder="Ex: Comércio varejista" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="marketSegment">Segmento de Mercado</Label>
                <Input id="marketSegment" placeholder="Ex: Supermercado" />
            </div>
        </div>

      <p className="font-medium text-gray-800 dark:text-gray-200 border-t pt-4">Endereço da Empresa</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 col-span-2">
          <Label htmlFor="street">Rua</Label>
          <Input id="street" placeholder="Nome da rua" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="number">Nº</Label>
          <Input id="number" placeholder="123" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input id="neighborhood" placeholder="Seu bairro" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" placeholder="Sua cidade" />
        </div>
        <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input id="state" placeholder="UF"/>
        </div>
         <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input id="cep" placeholder="00000-000" />
        </div>
      </div>
       <p className="font-medium text-gray-800 dark:text-gray-200 border-t pt-4">Contato da Empresa</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="ownerName">Nome do Proprietário/Representante Legal</Label>
                <Input id="ownerName" placeholder="Nome completo"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="commercialEmail">E-mail Comercial</Label>
                <Input id="commercialEmail" type="email" placeholder="contato@suaempresa.com"/>
            </div>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <Label htmlFor="website">Site (opcional)</Label>
                <Input id="website" placeholder="www.suaempresa.com"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="commercialPhone">Telefone</Label>
                <Input id="commercialPhone" type="tel" placeholder="(00) 0000-0000"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="instagram">Instagram (opcional)</Label>
                <Input id="instagram" placeholder="@seuusuario"/>
            </div>
        </div>

      <div className="flex justify-between gap-4">
        <Button onClick={prevStep} variant="outline" className="w-1/3 text-lg py-6">
          <ArrowLeft className="mr-2 h-5 w-5" /> Voltar
        </Button>
        <Button className="w-2/3 text-lg py-6">
          Finalizar Cadastro <Check className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};


const SignUpPage = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep(s => Math.min(s + 1, 2));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));
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
                {step === 1 && <Step1 nextStep={nextStep} />}
                {step === 2 && <Step2 prevStep={prevStep} />}
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
 