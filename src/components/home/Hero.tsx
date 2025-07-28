import React from 'react';
import { Play, CheckCircle, Calendar } from 'lucide-react';
import Image from 'next/image';
import TelaSistema from '@/images/telaSistema.png';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Controle Total de <span className="text-blue-600 dark:text-blue-400">Estoque e Vendas</span>, 
                Simples e Eficiente
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Sistema que automatiza estoque, gerencia vendas em tempo real e imprime etiquetas com facilidade
              </p>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
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
                <span>Suporte WhatsApp</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/5535998615203" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Iniciar Teste Grátis de 14 Dias
              </a>
              <a 
                href="https://wa.me/5535998615203" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2 border-2 border-orange-500"
              >
                <Calendar className="w-5 h-5" />
                <span>Agendar Demonstração</span>
              </a>
            </div>

            {/* Additional Trust */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                <span className="font-semibold text-green-600 dark:text-green-400">14 dias grátis</span> • 
                <span className="font-semibold dark:text-white"> Sem compromisso</span> • 
                <span className="font-semibold dark:text-white"> Suporte incluído</span>
              </p>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <Image 
              src={TelaSistema}
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
