import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-2xl text-center">
          <Card className="shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-4xl font-bold font-headline text-gray-900 dark:text-white">
                Bem-vindo ao seu Painel!
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 dark:text-gray-300 mt-2">
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
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
