
'use client';
import React, { useEffect, useRef } from 'react';
import { Check, Star, X, Briefcase, Building, Store, Rocket } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: "Teste Gratuito",
      price: "0",
      description: "Para você experimentar",
      icon: Rocket,
      features: [
        "Até 2 usuários simultâneos",
        "Controle de Crédito (1 cliente demo)",
        "Acesso a tutoriais",
        "Impressão de Cupom (❌)",
        "Gestão de Filiais (❌)",
      ],
      popular: false,
      isTest: true,
    },
    {
      name: "Essencial",
      price: "80",
      description: "Pequenos comércios",
      icon: Store,
      features: [
        "Até 2 usuários simultâneos",
        "Controle de Crédito Simples",
        "Relatórios Básicos (vendas, caixa)",
        "Controle de Acesso",
        "Acesso a tutoriais",
        "Suporte via E-mail",
        "Gestão de Filiais (❌)",
        "Marca personalizada (❌)",
        "Integração E-commerce (❌)",
      ],
      popular: false
    },
    {
      name: "Profissional",
      price: "120",
      description: "Lojas de médio porte",
      icon: Briefcase,
      features: [
        "Até 5 usuários simultâneos",
        "Controle de Crédito com limite e histórico",
        "Relatórios Avançados",
        "Controle de Acesso com permissões básicas",
        "Treinamento incluso",
        "Integração com E-commerce",
        "Suporte via WhatsApp e E-mail",
        "Gestão de Filiais (❌)",
        "Marca personalizada (❌)",
      ],
      popular: true
    },
    {
      name: "Empresarial",
      price: "190",
      description: "Redes com filiais",
      icon: Building,
      features: [
        "Até 12 usuários",
        "Controle de Crédito avançado por filial",
        "Relatórios Estratégicos e personalizados",
        "Controle de Acesso avançado + log de ações",
        "Gerenciamento MultiLojas",
        "Marca personalizada (opcional)",
        "Integração com E-commerce",
        "Treinamento incluso",
        "Suporte Prioritário + remoto",
      ],
      popular: false
    }
  ];

  const planSummaries = [
    {
      title: "🟢 Essencial (R$ 80/mês)",
      description: "Para comércios que operam com equipe reduzida e precisam de um sistema ágil com controle básico de clientes, crédito e financeiro. Ideal para até 2 usuários simultâneos."
    },
    {
      title: "🔵 Profissional (R$ 120/mês)",
      description: "Voltado para lojas com maior fluxo de operação e equipe, com relatórios mais completos e maior controle de permissões. Suporta até 5 usuários simultâneos."
    },
    {
      title: "🟣 Empresarial (R$ 190/mês)",
      description: "Solução robusta para redes com múltiplas unidades, controle por setores, número ilimitado de usuários e recursos em expansão voltados à gestão avançada."
    }
  ];

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 1 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

   const popularItemVariants = {
    hidden: { y: 20, opacity: 0, scale: 1 },
    visible: {
      y: 0,
      opacity: 1,
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.5,
        scale: {
            delay: 0.6,
            duration: 0.4,
            ease: "easeInOut",
        }
      }
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Planos que Cabem no Seu Orçamento
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Escolha o plano ideal para o seu negócio e comece hoje mesmo
          </p>

          <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-green-800 dark:text-green-300 font-medium">
              💰 Economize 10% pagando anualmente
            </p>
          </div>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-start"
        >
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={index}
                variants={plan.popular ? popularItemVariants : itemVariants}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 p-8 relative flex flex-col h-full ${
                  plan.popular ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'
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
                  <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                     <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center">
                      { (plan as any).isTest ? (
                        <span className="text-5xl font-bold text-gray-900 dark:text-white">Grátis</span>
                      ) : (
                        <>
                         <span className="text-5xl font-bold text-gray-900 dark:text-white">R$ {plan.price}</span>
                         <span className="text-gray-500 dark:text-gray-400 ml-2">/mês</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      {feature.includes('(❌)') ?
                        <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> :
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                      <span className="text-gray-700 dark:text-gray-300">{feature.replace(' (❌)','')}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Plan Summaries */}
        <div className="mt-20">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">🛒 Resumo dos Planos</h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
              {planSummaries.map((summary, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{summary.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{summary.description}</p>
                </div>
              ))}
            </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/50 rounded-xl p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
              🎁 Oferta Especial de Lançamento
            </h4>
            <p className="text-blue-800 dark:text-blue-200">
              Teste grátis por 10 dias + Desconto de 10% no primeiro ano para novos clientes
            </p>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Todos os planos incluem atualizações gratuitas • Sem taxa de setup • Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
