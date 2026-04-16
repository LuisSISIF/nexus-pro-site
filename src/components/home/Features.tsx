'use client';
import React, { useEffect, useRef } from 'react';
import { Package, ShoppingCart, Users, BarChart3, Cloud, Zap, Megaphone, DollarSign, ArrowRight, ShieldCheck, Headphones } from 'lucide-react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Features = () => {
  const features = [
    {
      icon: Package,
      title: "Controle de Estoque ERP",
      description: "Elimine perdas e rupturas com alertas de reposição automática e inventário em tempo real.",
      color: "bg-blue-500",
      benefit: "Reduza perdas em até 25%"
    },
    {
      icon: ShoppingCart,
      title: "PDV Ágil e Sem Fila",
      description: "Finalize vendas em segundos com múltiplas formas de pagamento e emissão de cupons.",
      color: "bg-green-500",
      benefit: "Vendas 40% mais rápidas"
    },
    {
      icon: DollarSign,
      title: "Fluxo de Caixa Blindado",
      description: "Gerencie contas a pagar e receber sem planilhas complexas. Tudo integrado ao seu lucro.",
      color: "bg-teal-500",
      benefit: "Visibilidade total do lucro"
    },
    {
      icon: Users,
      title: "CRM e Fidelidade",
      description: "Conheça quem compra de você. Histórico de compras e controle de crédito para seus melhores clientes.",
      color: "bg-purple-500",
      benefit: "Aumente o LTV do cliente"
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

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-headline">
            Tudo o que sua PME precisa para <span className="text-blue-600">escalar</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Desenvolvido para resolver as dores reais do lojista brasileiro, focando em produtividade e lucro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
            >
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-lg", feature.color)}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white font-headline">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                {feature.description}
              </p>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{feature.benefit}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Onboarding em 3 Passos - Micro-compromisso */}
        <div className="mt-32">
            <h3 className="text-3xl font-bold text-center mb-16 font-headline">Começar é mais simples do que você imagina</h3>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
                <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-blue-100 dark:bg-gray-800 -z-10"></div>
                <div className="bg-white dark:bg-gray-900 p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">1</div>
                    <h4 className="font-bold text-lg">Cadastro Rápido</h4>
                    <p className="text-sm text-gray-500">Apenas 30 segundos para criar sua conta. Sem burocracia.</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">2</div>
                    <h4 className="font-bold text-lg">Migração Assistida</h4>
                    <p className="text-sm text-gray-500">Nossa equipe importa seus produtos de planilhas ou sistemas antigos.</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg">3</div>
                    <h4 className="font-bold text-lg">Venda e Lucre</h4>
                    <p className="text-sm text-gray-500">Treinamento de 15min via Meet e você já está pronto para faturar.</p>
                </div>
            </div>
        </div>

        {/* Garantia e Suporte */}
        <div className="mt-32 grid md:grid-cols-2 gap-8">
            <div className="bg-blue-600 rounded-3xl p-10 text-white flex flex-col justify-center">
                <ShieldCheck className="w-12 h-12 mb-6 text-blue-200" />
                <h3 className="text-3xl font-bold mb-4 font-headline text-white">Garantia Incondicional</h3>
                <p className="text-blue-100 text-lg mb-8">
                    Não se adaptou? Cancelamos sua assinatura sem perguntas. Seus dados são seus e você pode exportá-los quando quiser.
                </p>
                <Link href="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold w-fit hover:bg-blue-50 transition-colors">
                    Iniciar agora sem riscos
                </Link>
            </div>
            <div className="bg-gray-900 rounded-3xl p-10 text-white border border-yellow-500/30">
                <Headphones className="w-12 h-12 mb-6 text-yellow-400" />
                <h3 className="text-3xl font-bold mb-4 font-headline text-white">Suporte Humanizado 24/7</h3>
                <p className="text-gray-400 text-lg mb-8">
                    Chega de robôs. Nossos especialistas estão prontos para te atender via WhatsApp, Telefone ou Acesso Remoto.
                </p>
                <a href="https://wa.me/5535998615203" target="_blank" className="flex items-center gap-2 text-yellow-400 font-bold hover:underline">
                    Falar com especialista agora <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
