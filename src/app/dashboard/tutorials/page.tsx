
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube } from 'lucide-react';

const tutorials = [
  {
    title: 'Tutorial NexusPro #1 | Download e Instalação do Sistema',
    videoId: 'wAfyiC7Wx6Y',
    description: 'Aprenda o passo a passo para baixar e instalar o NexusPro em seu computador Windows de forma rápida e segura.',
  },
];

const TutorialsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Vídeos Tutoriais</h1>
        <p className="text-muted-foreground">Aprenda a usar as principais funcionalidades do NexusPro com nossos guias em vídeo.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((video) => (
          <Card key={video.videoId} className="flex flex-col">
            <CardHeader>
              <div className="aspect-video mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-md"
                ></iframe>
              </div>
              <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{video.description}</CardDescription>
            </CardContent>
          </Card>
        ))}

         <Card className="border-dashed flex flex-col items-center justify-center text-center">
            <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Youtube className="w-6 h-6 text-primary"/>
                </div>
                <CardTitle className="text-lg">Mais Vídeos em Breve</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Estamos produzindo mais conteúdo para ajudar você a dominar o NexusPro.</p>
            </CardContent>
         </Card>
      </div>
    </div>
  );
};

export default TutorialsPage;
