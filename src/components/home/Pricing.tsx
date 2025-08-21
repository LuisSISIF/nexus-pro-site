
'use client';
import React, { useEffect, useRef } from 'react';
import { Check, Star, X, Briefcase, Building, Store, Rocket } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Pricing = () => {
    const freePlan = {
      name: "Teste Gratuito",
      price: "0",
      description: "Para você experimentar por 10 dias",
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
    };
    
  const plans = [
    {
      id: 3,
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
      id: 4,
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
      id: 5,
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
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-headline">
            Planos que Cabem no Seu Orçamento
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comece com um teste gratuito ou escolha o plano ideal para seu negócio
          </p>
        </div>

        {/* Free Trial Banner */}
        <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-6">Experimente o NexusPro</h3>
         <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-700">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Teste Gratuito</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{freePlan.description}</p>
                <div className="space-y-3 pt-2">
                  {freePlan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      {feature.includes('(❌)') ?
                        <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" /> :
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />}
                      <span className="text-gray-700 dark:text-gray-300">{feature.replace(' (❌)','')}</span>
                    </div>
                  ))}
                </div>
             </div>
             <div className="text-center flex flex-col items-center justify-center bg-white/50 dark:bg-gray-700/50 rounded-lg p-8">
                <p className="text-6xl font-bold text-gray-900 dark:text-white">Grátis</p>
                <p className="text-gray-500 dark:text-gray-400 mb-6">por 10 dias, sem compromisso.</p>
                 <Button asChild size="lg" className="w-full">
                    <Link href="/signup">
                        Começar Agora
                    </Link>
                </Button>
             </div>
           </div>
        </div>

        <h3 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-10">Ou escolha seu plano ideal</h3>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 items-start"
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
                        <>
                         <span className="text-5xl font-bold text-gray-900 dark:text-white">R$ {plan.price}</span>
                         <span className="text-gray-500 dark:text-gray-400 ml-2">/mês</span>
                        </>
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
                 <div className="mt-auto">
                    <Button asChild className="w-full text-lg py-6" variant={plan.popular ? 'default' : 'outline'}>
                        <Link href={`/signup-paid?planId=${plan.id}`}>
                           Contratar Plano
                        </Link>
                    </Button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Plan Summaries */}
        <div className="mt-20">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">🛒 Resumo dos Planos</h3>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
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
          <div className="bg-green-50 dark:bg-green-900/50 rounded-xl p-4 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
              💰 Pagamento Anual
            </h4>
            <p className="text-green-800 dark:text-green-200">
              Economize 10% em qualquer plano pago optando pelo ciclo de pagamento anual.
            </p>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Todos os planos pagos incluem atualizações gratuitas • Sem taxa de setup • Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
