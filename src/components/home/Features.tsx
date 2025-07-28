import React from 'react';
import { Package, ShoppingCart, Tag, BarChart3, Cloud, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Package,
      title: "Controle Inteligente de Estoque",
      description: "Monitore produtos em tempo real, alertas de estoque baixo e reposição automática",
      color: "bg-blue-500"
    },
    {
      icon: ShoppingCart,
      title: "Gestão de Vendas Simplificada",
      description: "PDV completo, múltiplas formas de pagamento e controle de clientes integrado",
      color: "bg-green-500"
    },
    {
      icon: Tag,
      title: "Geração de Etiquetas",
      description: "Imprima etiquetas personalizadas com códigos de barras de forma rápida e fácil",
      color: "bg-purple-500"
    },
    {
      icon: BarChart3,
      title: "Relatórios e Insights",
      description: "Análises detalhadas de vendas, estoque e performance para decisões estratégicas",
      color: "bg-orange-500"
    },
    {
      icon: Cloud,
      title: "Sistema na Nuvem",
      description: "Acesse de qualquer lugar, dados sempre seguros e backup automático",
      color: "bg-indigo-500"
    },
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "Processos automatizados que economizam tempo e reduzem erros operacionais",
      color: "bg-yellow-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Funcionalidades que Transformam Seu Negócio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra como o NexusPro pode automatizar seus processos e aumentar suas vendas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ROI Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Resultados Comprovados
          </h3>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl font-bold text-yellow-300">47%</div>
              <div className="text-blue-100">Aumento médio nas vendas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300">60%</div>
              <div className="text-blue-100">Redução de tempo em processos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-300">95%</div>
              <div className="text-blue-100">Satisfação dos clientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
