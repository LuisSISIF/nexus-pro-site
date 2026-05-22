'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, LogIn, MessageSquare, Rocket, PlayCircle, CreditCard, AlertTriangle } from 'lucide-react';
import AnimatedSection from '@/components/home/AnimatedSection';

const OnboardingStep = ({ icon: Icon, title, description, buttonText, buttonHref, isImportant }: any) => (
  <div className={`flex gap-6 p-6 rounded-2xl border ${isImportant ? 'border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-900/30 shadow-sm' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50'} shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}>
    {isImportant && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            Importante
        </div>
    )}
    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${isImportant ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="space-y-3">
      <h3 className={`text-xl font-bold ${isImportant ? 'text-amber-900 dark:text-amber-300' : ''}`}>{title}</h3>
      <p className={`${isImportant ? 'text-amber-800 dark:text-amber-400/80' : 'text-gray-600 dark:text-gray-400'} text-sm leading-relaxed`}>{description}</p>
      {buttonText && (
        <Button asChild variant={isImportant ? "default" : "outline"} size="sm" className={`mt-2 ${isImportant ? 'bg-amber-600 hover:bg-amber-700' : ''}`}>
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      )}
    </div>
  </div>
);

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <AnimatedSection className="text-center space-y-4">
            <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Tudo pronto! Bem-vindo ao NexusPro</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sua conta foi configurada com sucesso. Agora, siga os passos abaixo para começar a transformar a gestão do seu negócio.
            </p>
          </AnimatedSection>

          <div className="grid gap-6">
            <OnboardingStep 
              icon={Download}
              title="1. Baixe o Instalador"
              description="O NexusPro é um sistema de alta performance que roda diretamente no seu Windows para garantir rapidez no PDV. Baixe o instalador agora."
              buttonText="Ir para Downloads"
              buttonHref="/dashboard/installer"
            />
            <OnboardingStep 
              icon={LogIn}
              title="2. Faça seu Primeiro Login"
              description="Após instalar, abra o NexusPro no seu computador e use o nome de usuário e a senha que você acabou de criar no cadastro."
            />
            <OnboardingStep 
              icon={CreditCard}
              title="3. Configure sua Maquininha"
              isImportant={true}
              description="Vá na aba Administração, depois clique em Patrimônios e adicione sua máquina de cartão e respectivas taxas para liberar o método de pagamento débito e crédito nas vendas."
            />
            <OnboardingStep 
              icon={PlayCircle}
              title="4. Assista aos Tutoriais"
              description="Preparamos vídeos curtos para você aprender a cadastrar produtos, realizar vendas e fechar o caixa em poucos minutos."
              buttonText="Ver Tutoriais"
              buttonHref="/dashboard/tutorials"
            />
            <OnboardingStep 
              icon={MessageSquare}
              title="5. Precisa de Ajuda?"
              description="Nosso time de suporte está pronto para te auxiliar na implantação inicial. Não hesite em nos chamar."
              buttonText="Suporte Financeiro"
              buttonHref="/dashboard/financial-support"
            />
          </div>

          <AnimatedSection className="text-center pt-8">
            <Button asChild size="lg" className="px-12 py-8 text-xl font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard">
                Acessar meu Painel Web <Rocket className="ml-2" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">
              Você também recebeu um e-mail com os detalhes do seu plano e os links de acesso.
            </p>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
