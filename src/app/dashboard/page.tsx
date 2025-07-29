import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
       <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Painel de Controle</h1>
          <p className="text-muted-foreground">Visão geral do seu negócio.</p>
      </div>
      <Card className="shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-headline text-gray-900 dark:text-white">
            Bem-vindo!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Sua sessão foi iniciada com sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Esta é a sua área administrativa. Em breve, você poderá gerenciar todas as funcionalidades do NexusPro diretamente daqui.
          </p>
          <Button asChild>
            <Link href="/">Voltar para a Página Inicial</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
