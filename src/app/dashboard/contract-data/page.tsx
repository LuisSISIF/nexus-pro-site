
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getContractData, ContractData } from '@/actions/contract-actions';
import { checkAsaasCustomerExistsByCPF_CNPJ } from '@/actions/asaas-actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, Users, Building, AlertCircle, CalendarClock, CreditCard, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DataRow = ({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center gap-3">
      {icon}
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
    <span className="text-sm font-semibold text-foreground text-right">{value}</span>
  </div>
);

const ContractDataPage = () => {
  const [data, setData] = useState<ContractData | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContractData = async () => {
      const companyId = localStorage.getItem('companyId');

      if (!companyId) {
        setError("Não foi possível identificar a empresa. Por favor, faça o login novamente.");
        setLoading(false);
        return;
      }

      try {
        const result = await getContractData(Number(companyId));
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError("Ocorreu um erro ao buscar os dados do contrato.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContractData();
  }, []);

  const handlePaymentCheck = async () => {
    if (!data?.idempresa || data.idPlano === 2) {
        toast({
            variant: "destructive",
            title: "Ação não permitida",
            description: "Esta ação não é aplicável para o seu plano atual."
        });
        return;
    }
    
    setPaymentLoading(true);

    try {
        const result = await checkAsaasCustomerExistsByCPF_CNPJ(data.idempresa);
        if(result.success) {
            toast({
                title: "Verificação Concluída",
                description: `CNPJ: ${result.cnpj}. ${result.message}`,
            });
        } else {
             toast({
                variant: "destructive",
                title: "Erro na verificação",
                description: `CNPJ: ${result.cnpj || 'Não encontrado'}. ${result.message || "Não foi possível verificar o cliente no Asaas."}`
            });
        }
    } catch (error) {
         toast({
            variant: "destructive",
            title: "Erro inesperado",
            description: "Ocorreu um erro ao tentar realizar a verificação."
        });
    } finally {
        setPaymentLoading(false);
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
      
      const getPaymentStatusBadge = (status: string | null) => {
        if (!status) return null;
        
        switch (status.toLowerCase()) {
          case 'pago':
            return <Badge className="bg-green-500 text-white">{status}</Badge>;
          case 'à vencer':
            return <Badge variant="secondary" className="bg-yellow-400 text-black">{status}</Badge>;
           case 'em atraso':
             return <Badge variant="destructive">{status}</Badge>;
          default:
            return <Badge variant="outline">{status}</Badge>;
        }
      };
      
      return (
        <>
            <div className="space-y-6">
            <DataRow 
                label="Empresa" 
                value={data.nome_empresa} 
                icon={<Briefcase className="w-4 h-4 text-primary" />} 
            />
            <DataRow 
                label="Plano Atual" 
                value={
                <Badge variant={isTestPlan ? "secondary" : "default"}>
                    {data.nomePlano}
                </Badge>
                } 
                icon={<Calendar className="w-4 h-4 text-primary" />} 
            />

            {isTestPlan && data.periodoTesteInicio && data.periodoTesteFim && (
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
                icon={<Users className="w-4 h-4 text-primary" />} 
            />
            <DataRow 
                label="Lojas/Filiais" 
                value={`${data.qtdLojas} / ${data.limiteLojas}`}
                icon={<Building className="w-4 h-4 text-primary" />} 
            />
            {!isTestPlan && data.diaVencimento && (
                <>
                <DataRow 
                    label="Situação do Pagamento" 
                    value={getPaymentStatusBadge(data.pagamentoMes)}
                    icon={<CreditCard className="w-4 h-4 text-primary" />} 
                />
                <DataRow 
                    label="Dia do Vencimento" 
                    value={`Todo dia ${data.diaVencimento}`}
                    icon={<CalendarClock className="w-4 h-4 text-primary" />} 
                />
                </>
            )}
            </div>
            
            {!isTestPlan && (
                 <div className="mt-8 pt-6 border-t">
                    <Button onClick={handlePaymentCheck} disabled={paymentLoading} className="w-full sm:w-auto">
                       {paymentLoading ? (
                           <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           Verificando...
                           </>
                       ) : (
                           "Efetuar Pagamento"
                       )}
                    </Button>
                </div>
            )}
        </>
      );
    }
    
    return null;
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dados Contratuais</h1>
          <p className="text-muted-foreground">Informações sobre seu plano e faturamento.</p>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Seu Plano</CardTitle>
          <CardDescription>
            Detalhes sobre o plano contratado, limites de uso e pagamento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDataPage;
