
'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import placeholderData from '@/app/lib/placeholder-images.json';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 pt-16 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight font-headline">
                Controle Total de <span className="text-blue-600 dark:text-blue-400">Estoque e Vendas</span>, 
                Simples e Eficiente
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-body">
                Sistema que automatiza estoque, gerencia vendas e clientes em tempo real com facilidade.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
              {[
                "Windows 10 ou superior",
                "Dados seguros na nuvem",
                "Suporte via WhatsApp"
              ].map((text) => (
                <div key={text} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
             <p className="text-sm text-gray-500 dark:text-gray-400">Teste grátis por 10 dias • Sem cartão de crédito • Cancele quando quiser</p>
          </div>

          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <Image 
                src={placeholderData.hero_interface.url}
                alt="Interface de Vendas do NexusPro" 
                className="rounded-lg shadow-lg w-full h-auto"
                width={1200}
                height={800}
                data-ai-hint={placeholderData.hero_interface.hint}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
