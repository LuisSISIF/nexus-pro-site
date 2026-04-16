'use client';
import React from 'react';
import { Check, X, Briefcase, Building, Store, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const Pricing = () => {
  const plans = [
    {
      id: 3,
      name: "Essencial",
      price: "80",
      description: "Ideal para pequenos comércios e MEIs",
      icon: Store,
      features: ["2 usuários simultâneos", "Gestão de Estoque Completa", "Controle de Crédito", "Suporte via E-mail", "Multi-lojas (❌)"],
      popular: false
    },
    {
      id: 4,
      name: "Profissional",
      price: "120",
      description: "Para lojas em franco crescimento",
      icon: Briefcase,
      features: ["5 usuários simultâneos", "Relatórios de ROI Avançados", "Integração E-commerce", "Suporte via WhatsApp", "Treinamento VIP"],
      popular: true
    },
    {
      id: 5,
      name: "Empresarial",
      price: "190",
      description: "Solução robusta para redes e filiais",
      icon: Building,
      features: ["12 usuários inclusos", "Gestão Multi-Lojas", "Controle de Acesso por Setor", "Suporte com Acesso Remoto", "Consultoria Mensal"],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-gray-900 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-headline">
            Planos Transparentes, <span className="text-blue-600">Sem Surpresas</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comece com o Teste Grátis de 10 dias. Mude de plano a qualquer momento.
          </p>
        </div>

        {/* Oferta de Urgência */}
        <div className="max-w-3xl mx-auto mb-16 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 rounded-xl text-center">
            <p className="text-yellow-800 dark:text-yellow-400 font-bold">
                ⚠️ Atenção: Treinamento VIP Gratuito para as próximas 7 empresas que contratarem esta semana!
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative flex flex-col p-10 rounded-3xl border-2 transition-all duration-300",
                    plan.popular 
                      ? "border-blue-600 bg-white dark:bg-gray-800 shadow-2xl scale-105 z-10" 
                      : "border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                      Mais Escolhido
                    </div>
                  )}

                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2 font-headline">{plan.name}</h3>
                    <p className="text-gray-500 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">R$ {plan.price}</span>
                    <span className="text-gray-500 font-medium">/mês</span>
                  </div>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        {feature.includes('(❌)') ? <X className="w-5 h-5 text-red-400" /> : <Check className="w-5 h-5 text-green-500" />}
                        <span className="text-sm">{feature.replace(' (❌)', '')}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild size="lg" className={cn("w-full py-7 text-lg rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02]", plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white dark:bg-gray-800 text-blue-600 border-blue-600 hover:bg-blue-50")}>
                    <Link href={`/signup-paid?planId=${plan.id}`}>
                      Começar Agora
                    </Link>
                  </Button>
                </div>
            ))}
        </div>

        <div className="mt-20 text-center space-y-6">
            <div className="inline-flex items-center gap-8 bg-gray-50 dark:bg-gray-800 px-8 py-4 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="text-left">
                    <p className="text-sm text-gray-500">Ainda no plano de teste?</p>
                    <p className="font-bold">Migre para o anual e ganhe 10% OFF</p>
                </div>
                <ArrowRight className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-400">Cancelamento imediato • Dados seguros • Sem contrato de fidelidade</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
