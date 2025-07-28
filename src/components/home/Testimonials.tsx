import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      company: "Loja de Materiais Construção",
      text: "O NexusPro revolucionou nosso controle de estoque. Antes perdíamos muito tempo com planilhas, agora tudo é automático e preciso.",
      rating: 5
    },
    {
      name: "Juliana Ferreira",
      company: "Farmácia Central",
      text: "Sistema muito intuitivo e o suporte é excepcional. Em apenas 2 semanas já estava dominando todas as funcionalidades.",
      rating: 5
    },
    {
      name: "Roberto Silva",
      company: "Supermercado Família",
      text: "Aumentamos nossas vendas em 30% no primeiro mês. Os relatórios nos ajudam a tomar decisões mais assertivas.",
      rating: 5
    },
    {
      name: "Ana Paula Costa",
      company: "Loja de Roupas Elegance",
      text: "A impressão de etiquetas ficou muito mais fácil. O que antes demorava horas, agora faço em minutos.",
      rating: 5
    },
    {
      name: "João Santos",
      company: "Distribuidora Regional",
      text: "O controle de estoque nunca foi tão preciso. Reduziu significativamente nossas perdas por produtos vencidos.",
      rating: 5
    },
    {
      name: "Maria Oliveira",
      company: "Pet Shop Amigo Fiel",
      text: "Sistema perfeito para nossa rotina. Interface simples e todas as funcionalidades que precisamos em um só lugar.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-gray-600">
            Mais de 500 empresas já transformaram seus negócios com o NexusPro
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="w-8 h-8 text-blue-200 absolute -top-2 -left-2" />
                <p className="text-gray-700 leading-relaxed mb-6 pl-6">
                  {testimonial.text}
                </p>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔒</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Dados Seguros</h4>
            <p className="text-sm text-gray-600">Certificado SSL e criptografia de ponta</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">⚡</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Suporte 24/7</h4>
            <p className="text-sm text-gray-600">Atendimento via WhatsApp e e-mail</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Garantia de Resultado</h4>
            <p className="text-sm text-gray-600">14 dias grátis, sem compromisso</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
