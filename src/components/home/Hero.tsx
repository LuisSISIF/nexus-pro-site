import React from 'react';
import { Play, CheckCircle, Calendar, Rocket, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Sistema from '@/images/telaSistema.png';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Controle Total de <span className="text-blue-600 dark:text-blue-400">Estoque e Vendas</span>, 
                Simples e Eficiente
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Sistema que automatiza estoque, gerencia vendas e clientes em tempo real com facilidade
              </p>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Windows 10 ou superior</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Dados seguros na nuvem</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Suporte via WhatsApp</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
               <Link
                href="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5"/>
                Quero meu Teste Gratuito
              </Link>
              <a 
                href="https://wa.me/5535998615203" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2 border-2 border-blue-600 dark:border-blue-400"
              >
                <Video className="w-5 h-5" />
                <span>Ver uma Demonstração</span>
              </a>
            </div>
            
             <p className="text-sm text-gray-500 dark:text-gray-400">Sem cartão de crédito • Cancele quando quiser</p>


          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <Image 
              src={Sistema}
              alt="Dashboard do NexusPro" 
              className="rounded-lg shadow-lg w-full"
              width={600}
              height={400}
              data-ai-hint="dashboard application"
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
