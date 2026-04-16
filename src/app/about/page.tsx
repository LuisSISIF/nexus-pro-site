'use client';
import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Target, Heart, Users, CheckCircle, Lightbulb, Handshake, MessageSquare, ShieldCheck, GitBranch } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import placeholderData from '@/app/lib/placeholder-images.json';
import AnimatedSection from '@/components/home/AnimatedSection';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-gray-800 dark:text-gray-200">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-headline">
              Nós somos a Andromeda Solutions
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Apaixonados por tecnologia e dedicados a simplificar a complexidade da gestão empresarial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20 border-b pb-20 dark:border-gray-800">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-headline">Nossa Jornada</h2>
              <p className="leading-relaxed">
                A Andromeda Solutions nasceu de uma necessidade real observada no comércio: a falta de sistemas que fossem ao mesmo tempo poderosos e simples de usar.
              </p>
              <p className="leading-relaxed">
                O <strong>NexusPro</strong> é o resultado dessa missão: um Sistema de Gestão Empresarial completo, construído para ser intuitivo e um verdadeiro parceiro estratégico para PMEs.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={placeholderData.about_logo.url}
                alt="Logotipo Andromeda"
                width={400}
                height={400}
                className="rounded-2xl shadow-xl"
                data-ai-hint={placeholderData.about_logo.hint}
              />
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-10 mb-20 shadow-inner">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 font-headline">Nossos Pilares</h2>
              <div className="grid md:grid-cols-3 gap-12 text-center">
                  <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-100 dark:bg-blue-900/50 mb-4 shadow-sm">
                          <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Missão</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Empoderar empresas com ferramentas tecnológicas inovadoras e de fácil utilização.</p>
                  </div>
                   <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-purple-100 dark:bg-purple-900/50 mb-4 shadow-sm">
                          <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Visão</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Ser a principal referência em soluções de gestão para o varejo no Brasil.</p>
                  </div>
                   <div className="flex flex-col items-center">
                       <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-green-100 dark:bg-green-900/50 mb-4 shadow-sm">
                          <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Valores</h3>
                       <p className="text-sm text-gray-600 dark:text-gray-300">Ética, inovação, simplicidade e foco total no sucesso do cliente.</p>
                  </div>
              </div>
          </div>
          
          <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 font-headline">Nosso Compromisso com seu Sucesso</h2>
              <div className="grid md:grid-cols-3 gap-8">
                   <Card className="bg-white dark:bg-gray-800/50 hover:shadow-lg transition-shadow">
                      <CardHeader>
                          <div className="flex items-center gap-4">
                               <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-blue-500/10">
                                  <GitBranch className="h-6 w-6 text-blue-500" />
                              </div>
                              <CardTitle className="text-lg">Evolução Contínua</CardTitle>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm">Temos um roadmap claro de evolução, com atualizações constantes que trazem melhorias baseadas no feedback real dos nossos usuários.</p>
                      </CardContent>
                  </Card>
                  <Card className="bg-white dark:bg-gray-800/50 hover:shadow-lg transition-shadow">
                      <CardHeader>
                           <div className="flex items-center gap-4">
                               <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-green-500/10">
                                  <ShieldCheck className="h-6 w-6 text-green-500" />
                              </div>
                              <CardTitle className="text-lg">Segurança Máxima</CardTitle>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm">Seus dados são protegidos por criptografia de ponta e backups diários em servidores de alta disponibilidade no Brasil.</p>
                      </CardContent>
                  </Card>
                   <Card className="bg-white dark:bg-gray-800/50 hover:shadow-lg transition-shadow">
                      <CardHeader>
                           <div className="flex items-center gap-4">
                               <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-purple-500/10">
                                  <MessageSquare className="h-6 w-6 text-purple-500" />
                              </div>
                              <CardTitle className="text-lg">Suporte Presencial</CardTitle>
                          </div>
                      </CardHeader>
                      <CardContent>
                          <p className="text-sm">Diferente de sistemas 100% remotos, oferecemos suporte humanizado e possibilidade de implementação presencial para garantir o máximo uso.</p>
                      </CardContent>
                  </Card>
              </div>
          </div>

          <div className="mb-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 font-headline">Nosso Diferencial</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-4">
                      <Lightbulb className="w-8 h-8 text-yellow-500"/>
                      <h3 className="font-bold">Inovação Prática</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Funcionalidades pensadas para resolver problemas reais do dia a dia do lojista.</p>
                  </div>
                   <div className="space-y-4">
                      <Handshake className="w-8 h-8 text-green-500"/>
                      <h3 className="font-bold">Parceria Real</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Não somos apenas um fornecedor, somos o braço tecnológico do seu negócio.</p>
                  </div>
                   <div className="space-y-4">
                      <Users className="w-8 h-8 text-blue-500"/>
                      <h3 className="font-bold">Foco em PMEs</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">O NexusPro fala a língua do pequeno e médio varejista brasileiro.</p>
                  </div>
                   <div className="space-y-4">
                      <CheckCircle className="w-8 h-8 text-purple-500"/>
                      <h3 className="font-bold">Simplicidade</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Interface limpa que reduz o tempo de treinamento e erros operacionais.</p>
                  </div>
              </div>
          </div>

          <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl py-12 px-6 shadow-2xl">
              <h2 className="text-3xl font-bold mb-4 font-headline">Vamos crescer juntos?</h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                  Estamos prontos para transformar a gestão da sua empresa.
              </p>
              <Link 
                href="/NexusPro#pricing" 
                className="bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 shadow-xl inline-block"
              >
                  Conheça nossos planos
              </Link>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
