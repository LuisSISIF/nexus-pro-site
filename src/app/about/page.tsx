import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Target, Heart, Users, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-gray-800 dark:text-gray-200">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-headline">
            Sobre a Andromeda Solutions
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Inovação, paixão e compromisso para impulsionar o seu negócio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Nossa História</h2>
            <p className="leading-relaxed">
              Fundada com a missão de simplificar a gestão para pequenas e médias empresas, a Andromeda Solutions nasceu da percepção de que a tecnologia pode ser uma poderosa aliada para o crescimento. O NexusPro é o nosso principal produto, um sistema de gestão (ERP) completo, pensado para ser intuitivo, eficiente e acessível.
            </p>
            <p className="leading-relaxed">
              Acreditamos que, ao automatizar processos e fornecer insights claros, permitimos que empreendedores foquem no que realmente importa: a estratégia e a expansão de seus negócios.
            </p>
          </div>
          <div>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Equipe da Andromeda Solutions"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="team business"
            />
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-center mb-20">
          <Card className="bg-gray-50 dark:bg-gray-800">
            <CardHeader>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="font-headline">Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Empoderar empresas com ferramentas tecnológicas inovadoras e de fácil utilização, simplificando a gestão e impulsionando o crescimento sustentável.</p>
            </CardContent>
          </Card>
           <Card className="bg-gray-50 dark:bg-gray-800">
            <CardHeader>
               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="font-headline">Visão</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Ser a principal referência em soluções de gestão para o varejo no Brasil, reconhecida pela excelência, inovação e pelo impacto positivo nos negócios de nossos clientes.</p>
            </CardContent>
          </Card>
           <Card className="bg-gray-50 dark:bg-gray-800">
            <CardHeader>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                  <Heart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              <CardTitle className="font-headline">Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> <span>Paixão pelo cliente</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> <span>Inovação contínua</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> <span>Simplicidade e eficiência</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> <span>Ética e transparência</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Compromisso com o seu Sucesso</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Mais do que um fornecedor de software, somos seus parceiros. Estamos dedicados a oferecer não apenas um sistema robusto, mas também um suporte ágil e humanizado para garantir que você extraia o máximo valor da nossa solução.
            </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
