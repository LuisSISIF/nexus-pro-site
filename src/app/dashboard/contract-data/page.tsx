import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ContractDataPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dados Contratuais</h1>
          <p className="text-muted-foreground">Informações sobre seu plano e faturamento.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Seu Plano</CardTitle>
          <CardDescription>
            Detalhes sobre o plano contratado e histórico de pagamentos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Em breve, você poderá visualizar todas as informações do seu contrato aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractDataPage;
