import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TutorialsPage = () => {
  return (
    <div className="flex flex-col gap-6">
       <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tutoriais do Sistema</h1>
          <p className="text-muted-foreground">Aprenda a usar o NexusPro com nossos vídeos.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Vídeos Tutoriais</CardTitle>
          <CardDescription>
            Aqui você encontrará vídeos explicando as principais funcionalidades do sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Em breve, esta seção será preenchida com vídeos tutoriais do YouTube.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialsPage;
