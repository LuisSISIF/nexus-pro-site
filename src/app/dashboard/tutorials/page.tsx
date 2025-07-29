import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TutorialsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Vídeos Tutoriais</h1>
        <p className="text-muted-foreground">Aprenda a usar as principais funcionalidades do NexusPro.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Nossos Vídeos</CardTitle>
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
