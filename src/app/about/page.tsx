import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Target, Heart, Users, CheckCircle, Lightbulb, Handshake, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/images/logoRedSemFundo.png';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-gray-800 dark:text-gray-200">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-headline">
            Nós somos a Andromeda Solutions
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Apaixonados por tecnologia e dedicados a simplificar a complexidade da gestão empresarial para que você possa focar no que realmente importa: o crescimento do seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-headline">Nossa Jornada</h2>
            <p className="leading-relaxed">
              A Andromeda Solutions nasceu de uma necessidade real observada no dia a dia do comércio: a falta de sistemas de gestão que fossem ao mesmo tempo poderosos e simples de usar. Vimos empreendedores talentosos gastando mais tempo com planilhas e processos manuais do que com seus próprios clientes.
            </p>
            <p className="leading-relaxed">
              Decidimos mudar esse cenário. O <strong>NexusPro</strong> é o resultado dessa missão: um sistema de gestão (ERP) completo, construído do zero para ser intuitivo, eficiente e um verdadeiro parceiro estratégico para pequenas e médias empresas.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={Logo}
              alt="Logotipo da Andromeda Solutions"
              width={400}
              height={400}
              className="rounded-lg"
              data-ai-hint="logo"
            />
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-10 mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 font-headline">Nossos Pilares</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                        <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Missão</h3>
                    <p className="text-gray-600 dark:text-gray-300">Empoderar empresas com ferramentas tecnológicas inovadoras e de fácil utilização, simplificando a gestão e impulsionando o crescimento sustentável.</p>
                </div>
                 <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/50 mb-4">
                        <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Visão</h3>
                    <p className="text-gray-600 dark:text-gray-300">Ser a principal referência em soluções de gestão para o varejo no Brasil, reconhecida pela excelência, inovação e pelo impacto positivo nos negócios de nossos clientes.</p>
                </div>
                 <div className="flex flex-col items-center">
                     <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
                        <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Valores</h3>
                     <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li><span className="font-semibold">Paixão</span> pelo cliente</li>
                        <li><span className="font-semibold">Inovação</span> contínua</li>
                        <li><span className="font-semibold">Simplicidade</span> e eficiência</li>
                        <li><span className="font-semibold">Ética</span> e transparência</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12 font-headline">Nosso Diferencial</h2>
            <div className="grid md:grid-cols-3 gap-8">
                 <Card className="bg-white dark:bg-gray-800/50">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                             <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                                <Lightbulb className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Foco no Usuário</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Não criamos funcionalidades complexas que ninguém usa. Ouvimos nossos clientes e desenvolvemos soluções que resolvem problemas reais, de forma simples e direta.</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800/50">
                    <CardHeader>
                         <div className="flex items-center gap-4">
                             <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                                <Handshake className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Parceria Verdadeira</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Seu sucesso é o nosso sucesso. Mais do que um software, oferecemos uma parceria para ajudar seu negócio a prosperar, com suporte contínuo e evoluções constantes.</p>
                    </CardContent>
                </Card>
                 <Card className="bg-white dark:bg-gray-800/50">
                    <CardHeader>
                         <div className="flex items-center gap-4">
                             <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                                <MessageSquare className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Suporte Humanizado</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>Sem robôs ou respostas automáticas. Quando você precisa de ajuda, fala com pessoas de verdade, prontas para entender seu problema e resolver de forma ágil.</p>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className="text-center bg-blue-600 text-white rounded-lg py-10 px-6">
            <h2 className="text-3xl font-bold mb-4 font-headline">Vamos crescer juntos?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-6">
                Estamos sempre em busca de novas empresas para ajudar a alcançar seu máximo potencial. Se você acredita que a tecnologia pode transformar seu negócio, você está no lugar certo.
            </p>
            <a 
              href="/#pricing" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg text-md font-semibold transition-transform transform hover:scale-105 shadow-lg inline-block"
            >
                Conheça nossos planos
            </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
