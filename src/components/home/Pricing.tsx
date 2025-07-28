import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Básico",
      price: "80",
      originalPrice: "960",
      yearlyPrice: "864",
      description: "Perfeito para pequenos negócios",
      popular: false,
      features: [
        "Até 1.000 produtos",
        "1 usuário",
        "Controle de estoque básico",
        "PDV simples",
        "Impressão de etiquetas",
        "Relatórios básicos",
        "Suporte por e-mail"
      ]
    },
    {
      name: "Profissional",
      price: "120",
      originalPrice: "1440",
      yearlyPrice: "1296",
      description: "Para empresas em crescimento",
      popular: true,
      features: [
        "Produtos ilimitados",
        "Até 5 usuários",
        "Controle de estoque avançado",
        "PDV completo",
        "Impressão de etiquetas personalizadas",
        "Relatórios avançados e dashboard",
        "Integração com e-commerce",
        "Backup automático",
        "Suporte via WhatsApp",
        "Treinamento incluído"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Planos que Cabem no Seu Orçamento
          </h2>
          <p className="text-xl text-gray-600">
            Escolha o plano ideal para o seu negócio e comece hoje mesmo
          </p>
          
          {/* Annual Discount Banner */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-green-800 font-medium">
              💰 Economize 10% pagando anualmente
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-xl border-2 p-8 relative ${
                plan.popular ? 'border-blue-500 transform scale-105' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Mais Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-gray-900">R$ {plan.price}</span>
                    <span className="text-gray-500 ml-2">/mês</span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <span className="line-through">R$ {plan.originalPrice}/ano</span>
                    <span className="text-green-600 font-semibold ml-2">
                      R$ {plan.yearlyPrice}/ano
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular ? 'Iniciar Teste Grátis' : 'Escolher Plano'}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center space-y-4">
          <div className="bg-blue-50 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-blue-900 mb-2">
              🎁 Oferta Especial de Lançamento
            </h4>
            <p className="text-blue-800">
              Teste grátis por 14 dias + Desconto de 10% no primeiro ano para novos clientes
            </p>
          </div>
          
          <p className="text-gray-500 text-sm">
            Todos os planos incluem atualizações gratuitas • Sem taxa de setup • Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
