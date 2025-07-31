
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getContractData, ContractData } from '@/actions/contract-actions';
import { getBillingStatusFromAsaas, BillingStatus } from '@/actions/asaas-actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, Users, Building, AlertCircle, CalendarClock, CreditCard, Loader2, CalendarCheck2, ExternalLink, Replace, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const DataRow = ({ label, value, icon, iconClassName, borderColorClass }: { label: string; value: React.ReactNode; icon?: React.ReactNode, iconClassName?: string, borderColorClass?: string }) => (
  <div className={cn("flex justify-between items-center py-3 border-b", borderColorClass)}>
    <div className="flex items-center gap-3">
       {React.cloneElement(icon as React.ReactElement, { className: cn("w-4 h-4", iconClassName) })}
      <span className="text-sm font-medium">{label}</span>
    </div>
    <span className="text-sm font-semibold text-right">{value}</span>
  </div>
);

const ContractDataPage = () => {
  const [data, setData] = useState<ContractData | null>(null);
  const [billingStatuses, setBillingStatuses] = useState<BillingStatus[]>([]);
  const [currentBillingIndex, setCurrentBillingIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      const companyId = localStorage.getItem('companyId');

      if (!companyId) {
        setError("Não foi possível identificar a empresa. Por favor, faça o login novamente.");
        setLoading(false);
        return;
      }

      try {
        const contractResult = await getContractData(Number(companyId));
        if (contractResult.success && contractResult.data) {
          setData(contractResult.data);
          
          if (contractResult.data.idPlano !== 2) { 
            const billingResult = await getBillingStatusFromAsaas(Number(companyId));
            if (billingResult.success && billingResult.data) {
                setBillingStatuses(billingResult.data);
                // Encontra o índice da fatura do mês atual ou a mais próxima
                const today = new Date();
                const currentMonth = today.getMonth();
                const currentYear = today.getFullYear();
                
                let foundIndex = billingResult.data.findIndex(bs => {
                    if(!bs.dueDate) return false;
                    const dueDate = new Date(bs.dueDate.split('/').reverse().join('-'));
                    return dueDate.getMonth() === currentMonth && dueDate.getFullYear() === currentYear;
                });
                
                if (foundIndex === -1) {
                    // Se não achar, pega a última pendente ou a última paga
                    foundIndex = billingResult.data.map(bs => bs.status).lastIndexOf('PENDING');
                    if (foundIndex === -1) {
                       foundIndex = billingResult.data.length -1;
                    }
                }
                setCurrentBillingIndex(foundIndex >= 0 ? foundIndex : 0);
            } else {
              console.warn(billingResult.message);
              setBillingStatuses([{ status: 'ERROR', dueDate: null, month: 'Não disponível' }]);
            }
          }
        } else {
          setError(contractResult.message);
        }
      } catch (err) {
        setError("Ocorreu um erro ao buscar os dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const currentBillingStatus = billingStatuses[currentBillingIndex];

  const handleNavigateBilling = (direction: 'next' | 'prev') => {
      if (direction === 'next' && currentBillingIndex < billingStatuses.length - 1) {
          setCurrentBillingIndex(prev => prev + 1);
      } else if (direction === 'prev' && currentBillingIndex > 0) {
          setCurrentBillingIndex(prev => prev - 1);
      }
  }

  const handlePayInvoice = () => {
    if (!currentBillingStatus?.invoiceUrl) {
      toast({
        variant: "destructive",
        title: "Fatura não disponível",
        description: "Não há uma fatura pendente ou disponível para pagamento este mês.",
      });
      return;
    }
    window.open(currentBillingStatus.invoiceUrl, '_blank');
  };

    const getPlanBadgeStyle = (planId: number): string => {
        switch (planId) {
            case 1: // Alpha Tester
                return "bg-black text-amber-400 border-amber-400";
            case 2: // Teste Grátis
                return "bg-green-600 text-white border-green-700";
            case 3: // Essencial
                return "bg-gray-500 text-white border-gray-600";
            case 4: // Profissional
                return "bg-green-700 text-white border-green-800";
            case 5: // Empresarial
                return "bg-blue-800 text-white border-blue-900";
            default:
                return "bg-gray-200 text-gray-800";
        }
    };

    const getPlanCardStyle = (planId?: number | null): string => {
        if (!planId) return "shadow-lg";
        switch (planId) {
            case 1: // Alpha Tester
                return "shadow-xl bg-[#1A1A1A] text-white border border-amber-500";
            case 2: // Teste Grátis
                 return "shadow-lg bg-[#F3F4F6] text-gray-800";
            case 3: // Essencial
                 return "shadow-lg bg-[#374151] text-white";
            case 4: // Profissional
                 return "shadow-lg bg-[#065F46] text-white";
            case 5: // Empresarial
                 return "shadow-lg bg-[#1E3A8A] text-white";
            default:
                return "shadow-lg";
        }
    };

    const getPlanIconColor = (planId?: number | null): string => {
        if (!planId) return "text-primary";
        switch (planId) {
            case 1: // Alpha Tester
                return "text-amber-400";
            case 2: // Teste Grátis
                 return "text-green-600";
            case 3: // Essencial
                return "text-gray-400";
            case 4: // Profissional
                return "text-green-400";
            case 5: // Empresarial
                return "text-amber-500";
            default:
                return "text-primary";
        }
    };

    const getBorderColorClass = (planId?: number | null): string => {
        if (!planId) return "border-gray-200 dark:border-gray-700";
         switch (planId) {
            case 1: // Alpha Tester
                return "border-amber-400/30";
            case 2: // Teste Grátis
                 return "border-green-600/30";
            case 3: // Essencial
                return "border-gray-400/30";
            case 4: // Profissional
                return "border-green-400/30";
            case 5: // Empresarial
                return "border-amber-500/30";
            default:
                return "border-gray-200 dark:border-gray-700";
        }
    };


  const renderContent = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-2 pt-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      );
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

    if (data) {
      const isTestPlan = data.idPlano === 2; 
      const totalUserLimit = data.limiteUsuarios + (data.usersAdicionais || 0);
      const iconColor = getPlanIconColor(data.idPlano);
      const borderColor = getBorderColorClass(data.idPlano);
      
      const getPaymentStatusBadge = (status: string | null) => {
        if (!status) return <Badge className="bg-gray-400 text-white hover:bg-gray-400">Indisponível</Badge>;

        switch (status.toUpperCase()) {
            case 'CONFIRMED':
            case 'RECEIVED':
            case 'RECEIVED_IN_CASH':
                return <Badge className="bg-green-500/80 text-white hover:bg-green-500/80">Pago</Badge>;
            case 'PENDING':
                return <Badge className="bg-yellow-400/80 text-white hover:bg-yellow-400/80">Pendente</Badge>;
            case 'OVERDUE':
                return <Badge className="bg-red-500/80 text-white hover:bg-red-500/80">Em Atraso</Badge>;
            case 'UNREGISTERED':
            case 'NOT_FOUND':
                return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Nenhuma Fatura</Badge>;
            default:
                return <Badge className="bg-gray-400 text-white hover:bg-gray-400">{status}</Badge>;
        }
      };
      
      const isPayButtonDisabled = paymentLoading || !currentBillingStatus?.invoiceUrl || ['CONFIRMED', 'RECEIVED', 'RECEIVED_IN_CASH'].includes(currentBillingStatus?.status?.toUpperCase() || '');

      return (
        <>
            <div className="space-y-6">
            <DataRow 
                label="Empresa" 
                value={data.nome_empresa} 
                icon={<Briefcase />} 
                iconClassName={iconColor}
                borderColorClass={borderColor}
            />
            <DataRow 
                label="Plano Atual" 
                value={
                <Badge className={cn(getPlanBadgeStyle(data.idPlano))}>
                    {data.nomePlano}
                </Badge>
                } 
                icon={<Calendar />}
                iconClassName={iconColor}
                borderColorClass={borderColor}
            />

            {(data.idPlano === 1 || data.idPlano === 2) && data.periodoTesteInicio && data.periodoTesteFim && (
                <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800">
                    <CardHeader>
                        <CardTitle className="text-md text-blue-800 dark:text-blue-300">Período de Teste</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                            <p className="font-semibold">Início:</p>
                            <p>{new Date(data.periodoTesteInicio).toLocaleDateString('pt-BR')}</p>
                    </div>
                        <div>
                            <p className="font-semibold">Fim:</p>
                            <p>{new Date(data.periodoTesteFim).toLocaleDateString('pt-BR')}</p>
                    </div>
                    </CardContent>
                </Card>
            )}
            
            <DataRow 
                label="Usuários" 
                value={`${data.qtdFunc} / ${totalUserLimit}`} 
                icon={<Users />}
                iconClassName={iconColor}
                borderColorClass={borderColor}
            />
            <DataRow 
                label="Lojas/Filiais" 
                value={`${data.qtdLojas} / ${data.limiteLojas}`}
                icon={<Building />}
                iconClassName={iconColor}
                borderColorClass={borderColor}
            />
            {!isTestPlan && (
                <>
                 <DataRow 
                    label="Mês de Referência" 
                    value={<span className="capitalize">{currentBillingStatus?.month || 'Não aplicável'}</span>}
                    icon={<CalendarCheck2 />}
                    iconClassName={iconColor}
                    borderColorClass={borderColor}
                />
                <DataRow 
                    label="Situação do Pagamento" 
                    value={getPaymentStatusBadge(currentBillingStatus?.status || null)}
                    icon={<CreditCard />}
                    iconClassName={iconColor}
                    borderColorClass={borderColor}
                />
                <DataRow 
                    label="Vencimento da Fatura" 
                    value={currentBillingStatus?.dueDate || `Todo dia ${data.diaVencimento}`}
                    icon={<CalendarClock />}
                    iconClassName={iconColor}
                    borderColorClass={borderColor}
                />
                </>
            )}
            </div>
            
             {!isTestPlan && (
                 <div className={cn("mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4", borderColor)}>
                    <div className="w-full sm:w-auto">
                        <Button onClick={handlePayInvoice} disabled={isPayButtonDisabled} className="w-full bg-gray-800 text-white hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300">
                           {paymentLoading ? (
                               <>
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                               Verificando...
                               </>
                           ) : (
                            <>
                               <ExternalLink className="mr-2 h-4 w-4" />
                               Pagar Fatura
                            </>
                           )}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2 text-center sm:text-left">Clique para abrir a página de pagamento.</p>
                    </div>
                     <div className="w-full sm:w-auto">
                        <Button asChild className="w-full shadow-lg hover:shadow-primary/40 transition-shadow">
                            <Link href="/dashboard/change-plan">
                                <Replace className="mr-2 h-4 w-4" />
                                Alterar meu Plano
                            </Link>
                        </Button>
                         <p className="text-xs text-muted-foreground mt-2 text-center sm:text-right">Faça um upgrade ou downgrade.</p>
                    </div>
                </div>
            )}
        </>
      );
    }
    
    return null;
  };

  const isTestPlan = data?.idPlano === 2;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Meu Plano</h1>
          <p className="text-muted-foreground">Informações sobre seu plano e faturamento.</p>
      </div>
       <Card className={getPlanCardStyle(data?.idPlano)}>
         <CardHeader className="flex flex-row items-start justify-between">
            <div>
                <CardTitle>Seu Plano</CardTitle>
                <CardDescription className={cn({
                        'text-amber-400/80': data?.idPlano === 1,
                        'text-gray-600': data?.idPlano === 2,
                        'text-gray-300': data?.idPlano === 3,
                        'text-green-300': data?.idPlano === 4,
                        'text-blue-300': data?.idPlano === 5,
                    })}>
                    Detalhes sobre o plano contratado, limites de uso e pagamento.
                </CardDescription>
            </div>
             {!isTestPlan && billingStatuses.length > 1 && (
                <div className="flex items-center gap-2">
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleNavigateBilling('prev')}
                        disabled={currentBillingIndex === 0}
                        className="h-8 w-8"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleNavigateBilling('next')}
                        disabled={currentBillingIndex === billingStatuses.length - 1}
                        className="h-8 w-8"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
         </CardHeader>
         <CardContent>
           {renderContent()}
         </CardContent>
       </Card>
    </div>
  );
};

export default ContractDataPage;
