import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <Card className="shadow-lg border-gray-200 dark:border-gray-700">
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold font-headline">Área do Cliente</CardTitle>
              <CardDescription>Acesse sua conta para gerenciar seu negócio.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seuemail@exemplo.com" required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Senha</Label>
                    <Link href="#" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input id="password" type="password" placeholder="Sua senha" required />
                </div>
                <Button type="submit" className="w-full text-lg py-6">
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
