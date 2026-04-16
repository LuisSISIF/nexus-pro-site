import React from 'react';
import { Star, Quote, ArrowUpRight } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      company: "Loja de Materiais Construção",
      text: "O NexusPro revolucionou nosso controle de estoque. Reduzi minhas perdas em 22% no primeiro trimestre usando os alertas automáticos.",
      metric: "ROI: R$ 8.500 economizados/ano"
    },
    {
      name: "Juliana Ferreira",
      company: "Assistencia Técnica",
      text: "O PDV é extremamente rápido. Atendemos o dobro de clientes no balcão sem aumentar a fila. O suporte via WhatsApp é 10!",
      metric: "Produtividade: +40% no balcão"
    },
    {
      name: "Roberto Silva",
      company: "Adega e distribuidora",
      text: "Pela primeira vez tenho um fluxo de caixa que entendo. O NexusPro me mostrou onde eu estava perdendo dinheiro com produtos vencidos.",
      metric: "Faturamento: +15% no mês 1"
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-headline">
            Resultados que <span className="text-blue-600">Falam por Si</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Não somos apenas um software, somos o braço direito do seu crescimento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-600 flex flex-col h-full"
            >
              <div className="flex text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              
              <div className="relative mb-8 flex-grow">
                <Quote className="w-10 h-10 text-blue-100 dark:text-blue-900 absolute -top-4 -left-4 -z-10" />
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-600">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                        <ArrowUpRight className="w-5 h-5 text-green-600" />
                    </div>
                </div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400">
                    {testimonial.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔒</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dados Seguros</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Certificado SSL e criptografia de ponta</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Suporte Prioritário</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Atendimento humanizado via WhatsApp e e-mail</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Garantia de Resultado</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">14 dias grátis, sem compromisso</p>
            </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 grayscale opacity-50 contrast-125">
            <div className="flex items-center justify-center font-bold text-2xl">ASAAS</div>
            <div className="flex items-center justify-center font-bold text-2xl">Sebrae-fã</div>
            <div className="flex items-center justify-center font-bold text-2xl">BoletoFacil</div>
            <div className="flex items-center justify-center font-bold text-2xl">NuvemShop</div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
