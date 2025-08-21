
'use client';
import React, { useEffect, useRef } from 'react';
import { Package, ShoppingCart, Users, BarChart3, Cloud, Zap, Megaphone, Video, Tag, DollarSign } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

const Features = () => {
  const features = [
    {
      icon: Package,
      title: "Controle Inteligente de Estoque",
      description: "Monitore produtos em tempo real, alertas de estoque baixo e reposição automática.",
      color: "bg-blue-500"
    },
    {
      icon: ShoppingCart,
      title: "Gestão de Vendas Simplificada",
      description: "PDV completo, múltiplas formas de pagamento e emissão de cupons não fiscais.",
      color: "bg-green-500"
    },
     {
      icon: DollarSign,
      title: "Gestão Financeira",
      description: "Gerencie contas a pagar e a receber de forma integrada e mantenha seu fluxo de caixa saudável.",
      color: "bg-teal-500",
    },
    {
      icon: Tag,
      title: "Sistema de Controle de Ofertas",
      description: "Crie e gerencie promoções de forma fácil e automatizada para impulsionar suas vendas.",
      color: "bg-pink-500",
      premium: true,
    },
     {
      icon: Users,
      title: "Gerenciamento de Clientes",
      description: "Mantenha um cadastro completo de clientes, histórico de compras e controle de crédito.",
      color: "bg-purple-500",
      premium: true,
    },
    {
      icon: BarChart3,
      title: "Relatórios e Insights",
      description: "Análises detalhadas para decisões estratégicas sobre vendas, estoque e performance.",
      color: "bg-orange-500"
    },
    {
      icon: Cloud,
      title: "Sistema na Nuvem",
      description: "Acesse de qualquer lugar, com dados sempre seguros e backup automático.",
      color: "bg-indigo-500"
    },
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "Processos automatizados que economizam seu tempo e reduzem erros operacionais.",
      color: "bg-yellow-500"
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };


  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Funcionalidades que Transformam Seu Negócio
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubra como o NexusPro pode automatizar seus processos e aumentar suas vendas
          </p>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={cn(
                  "rounded-xl p-8 border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group",
                  feature.premium
                    ? "bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 border-pink-500/50 shadow-lg shadow-pink-500/20"
                    : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-lg"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                   feature.color
                )}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className={cn(
                    "text-xl font-semibold mb-3",
                     feature.premium ? "text-white" : "text-gray-900 dark:text-white"
                )}>
                  {feature.title}
                </h3>
                <p className={cn(
                  "leading-relaxed",
                  feature.premium ? "text-gray-300" : "text-gray-600 dark:text-gray-300"
                  )}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Promotional Banner */}
        <div className="mt-20 bg-gray-900 rounded-2xl p-8 lg:p-12 text-center shadow-2xl shadow-yellow-500/20 border border-yellow-500/30">
            <div className="flex justify-center items-center gap-4 mb-4">
                <Megaphone className="w-8 h-8 text-yellow-400"/>
                <h3 className="text-2xl lg:text-3xl font-bold text-yellow-400">
                    Treinamento Pessoal Incluso
                </h3>
            </div>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Contrate qualquer plano e ganhe um <strong>treinamento pessoal completo do sistema</strong>, realizado via Google Meet, para você e sua equipe.
            </p>
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
