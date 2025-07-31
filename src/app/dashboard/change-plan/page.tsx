
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Store, Briefcase, Building, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getContractData, ContractData } from '@/actions/contract-actions';
import { updateCompanyPlan } from '@/actions/plan-actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const plans = [
    {
      id: 3,
      name: "Essencial",
      price: 80,
      description: "Ideal para pequenos comércios e MEIs.",
      icon: Store,
      features: [
        "Até 2 usuários simultâneos",
        "Controle de Crédito Simples",
        "Relatórios Básicos de vendas e caixa",
        "Suporte via E-mail",
      ],
      popular: false,
    },
    {
      id: 4,
      name: "Profissional",
      price: 120,
      description: "Para lojas em crescimento com maior fluxo.",
      icon: Briefcase,
      features: [
        "Até 5 usuários simultâneos",
        "Controle de Crédito com limite e histórico",
        "Relatórios Avançados",
        "Integração com E-commerce",
        "Suporte via WhatsApp",
      ],
      popular: true,
    },
    {
      id: 5,
      name: "Empresarial",
      price: 190,
      description: "Solução completa para redes e filiais.",
      icon: Building,
      features: [
        "Até 12 usuários simultâneos",
        "Gerenciamento Multi-Lojas",
        "Relatórios Estratégicos e personalizados",
        "Controle de Acesso avançado",
        "Suporte Prioritário",
      ],
      popular: false,
    }
];

type Plan = typeof plans[0];

const ChangePlanPage = () => {
    const [currentPlan, setCurrentPlan] = useState<ContractData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        const fetchCurrentPlan = async () => {
            const companyId = localStorage.getItem('companyId');
            if (!companyId) {
                setError("ID da empresa não encontrado.");
                setLoading(false);
                return;
            }

            const result = await getContractData(Number(companyId));
            if (result.success && result.data) {
                setCurrentPlan(result.data);
            } else {
                setError(result.message);
            }
            setLoading(false);
        };
        fetchCurrentPlan();
    }, []);

    const handleSelectPlan = (plan: Plan) => {
        if (plan.id === currentPlan?.idPlano) return;
        setSelectedPlan(plan);
        setIsConfirmOpen(true);
    }
    
    const handleConfirmChange = async () => {
        if (!selectedPlan || !currentPlan) return;

        setIsUpdating(true);
        const companyId = Number(localStorage.getItem('companyId'));

        const result = await updateCompanyPlan(
            companyId,
            selectedPlan.id,
            selectedPlan.price,
            selectedPlan.name
        );

        if (result.success) {
            toast({
                title: "Sucesso!",
                description: result.message,
            });
            router.push('/dashboard/contract-data');
        } else {
             toast({
                variant: "destructive",
                title: "Erro ao Alterar Plano",
                description: result.message,
            });

            if (result.message.includes('Você só pode alterar seu plano a cada 30 dias')) {
                setTimeout(() => {
                    router.push('/dashboard/contract-data');
                }, 3000); 
            }
        }
        
        setIsUpdating(false);
        setIsConfirmOpen(false);
        setSelectedPlan(null);
    }

    const getPlanStyle = (planId: number): string => {
        switch (planId) {
            case 3: // Essencial
                return "border-gray-500 ring-gray-500";
            case 4: // Profissional
                return "border-blue-500 ring-blue-500";
            case 5: // Empresarial
                return "border-yellow-400 ring-yellow-400";
            default:
                return "border-gray-200 dark:border-gray-700 ring-primary";
        }
    };


    const renderContent = () => {
        if (loading) {
            return (
                <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="flex flex-col h-full">
                            <CardHeader>
                                <Skeleton className="h-8 w-3/5" />
                                <Skeleton className="h-4 w-4/5" />
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <Skeleton className="h-10 w-1/2" />
                                {Array.from({ length: 4 }).map((_, j) => <Skeleton key={j} className="h-5 w-full" />)}
                            </CardContent>
                             <div className="p-6 pt-0">
                                <Skeleton className="h-12 w-full" />
                            </div>
                        </Card>
                    ))}
                </div>
            )
        }

        if (error) {
            return (
                 <div className="flex flex-col items-center justify-center text-center text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                    <AlertCircle className="w-12 h-12 mb-4" />
                    <h3 className="text-xl font-semibold">Ocorreu um Erro</h3>
                    <p>{error}</p>
                </div>
            )
        }

        return (
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {plans.map((plan) => {
                const Icon = plan.icon;
                const isCurrent = plan.id === currentPlan?.idPlano;

                return (
                  <Card 
                    key={plan.id}
                    className={cn(
                        "bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 p-8 relative flex flex-col h-full transition-all",
                        getPlanStyle(plan.id),
                        plan.popular && "lg:scale-105",
                        isCurrent && "ring-2"
                    )}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-current" />
                          <span>Mais Popular</span>
                        </div>
                      </div>
                    )}
                    {isCurrent && (
                         <div className="absolute -top-4 right-4">
                            <Badge className="bg-green-600 text-white">Plano Atual</Badge>
                        </div>
                    )}

                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                         <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-bold text-gray-900 dark:text-white">R$ {plan.price}</span>
                          <span className="text-gray-500 dark:text-gray-400 ml-2">/mês</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                        <Button 
                            className="w-full text-lg py-6"
                            onClick={() => handleSelectPlan(plan)}
                            disabled={isCurrent}
                        >
                            {isCurrent ? 'Seu Plano Atual' : 'Escolher Plano'}
                        </Button>
                    </div>
                  </Card>
                )
              })}
            </div>
        )
    }

    const getDialogDescription = () => {
        if (!selectedPlan) return '';
        if (currentPlan?.idPlano === 2) { // Vindo do plano de teste
             return `Você está prestes a contratar o plano ${selectedPlan.name}. Uma assinatura de R$ ${selectedPlan.price}/mês será criada, com a primeira cobrança no próximo dia ${currentPlan?.diaVencimento}. Além disso, uma cobrança proporcional pelos dias restantes até lá será gerada para amanhã. Deseja continuar?`;
        }
        // Trocando entre planos pagos
        return `Você está prestes a alterar seu plano para ${selectedPlan.name}. A nova cobrança será de R$ ${selectedPlan.price} por mês, aplicada no próximo ciclo de faturamento. Deseja continuar?`;
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Alterar Plano</h1>
                <p className="text-muted-foreground">
                    Faça um upgrade ou downgrade do seu plano a qualquer momento.
                </p>
            </div>
            
            {renderContent()}

             <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Alteração de Plano?</AlertDialogTitle>
                    <AlertDialogDescription>
                       {getDialogDescription()}
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setSelectedPlan(null)} disabled={isUpdating}>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmChange} disabled={isUpdating}>
                        {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isUpdating ? "Processando..." : "Confirmar e Contratar"}
                    </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Card className="mt-8 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-lg">Como funciona a alteração?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground">
                    <p>Ao escolher um novo plano, a alteração será agendada. Se for um upgrade, as novas funcionalidades podem ser liberadas imediatamente.</p>
                    <p>A cobrança do novo valor será feita no próximo ciclo de faturamento. Nosso sistema se comunica com o gateway de pagamento para atualizar sua assinatura automaticamente.</p>
                    <p>Em caso de dúvidas, entre em contato com nosso <Link href="/dashboard/financial-support" className="text-primary hover:underline font-medium">suporte financeiro</Link>.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePlanPage;
