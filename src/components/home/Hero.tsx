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
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 text-white">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Dashboard NexusPro</h3>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm opacity-90">Vendas Hoje</p>
                      <p className="text-2xl font-bold">R$ 24.750</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm opacity-90">Produtos</p>
                      <p className="text-2xl font-bold">1.247</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm opacity-90">Estoque Baixo</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-white/20 rounded p-2">
                      <div className="flex justify-between text-sm">
                        <span>Produto A</span>
                        <span>Em estoque: 45</span>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded p-2">
                      <div className="flex justify-between text-sm">
                        <span>Produto B</span>
                        <span className="text-yellow-300">Estoque baixo: 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;