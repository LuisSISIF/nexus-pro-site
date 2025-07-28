import React from 'react';
import { Play, CheckCircle, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Controle Total de <span className="text-blue-600">Estoque e Vendas</span>, 
                Simples e Eficiente
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Sistema que automatiza estoque, gerencia vendas em tempo real e imprime etiquetas com facilidade
              </p>
            </div>

            {/* Trust Elements */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
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
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                Iniciar Teste Grátis de 14 Dias
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2 border-2 border-orange-500">
                <Calendar className="w-5 h-5" />
                <span>Agendar Demonstração</span>
              </button>
            </div>

            {/* Additional Trust */}
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold text-green-600">14 dias grátis</span> • 
                <span className="font-semibold"> Sem compromisso</span> • 
                <span className="font-semibold"> Suporte incluído</span>
              </p>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <img 
              data-ai-hint="dashboard application"
              src="https://placehold.co/600x400.png"
              alt="Dashboard do NexusPro" 
              className="rounded-lg shadow-lg"
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
