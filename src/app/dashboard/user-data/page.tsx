import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const UserDataPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dados do Usuário</h1>
          <p className="text-muted-foreground">Altere suas informações de login e senha.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Alterar Dados</CardTitle>
          <CardDescription>
            Esta área permitirá a alteração de seus dados de acesso. Funcionalidade em desenvolvimento.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Em breve, você poderá alterar seu login e senha aqui.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDataPage;
