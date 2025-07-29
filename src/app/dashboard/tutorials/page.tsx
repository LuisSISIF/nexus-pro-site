import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileArchive, MousePointerClick, CheckSquare } from 'lucide-react';

const Step = ({ icon, title, description }: { icon: React.ElementType, title: string, description: string }) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h4 className="font-semibold text-lg text-foreground">{title}</h4>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const TutorialsPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Tutoriais e Instalação</h1>
        <p className="text-muted-foreground">Aprenda a usar e instalar o NexusPro.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Download className="w-6 h-6" />
            Download do Instalador NexusPro
          </CardTitle>
          <CardDescription>
            Siga os passos abaixo para instalar o sistema em seu computador com Windows.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="bg-primary/5 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-xl text-primary">Instalador NexusPro</h3>
              <p className="text-muted-foreground">Clique no botão para baixar a versão mais recente.</p>
            </div>
            <Button size="lg" asChild>
                {/* O link de download real deve ser inserido aqui */}
                <a href="#" download="InstaladorNexusPro.zip">
                    <Download className="mr-2" />
                    Baixar Instalador
                </a>
            </Button>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-6 text-center">Como Instalar</h3>
            <div className="space-y-8 max-w-2xl mx-auto">
              <Step
                icon={FileArchive}
                title="Passo 1: Descompacte o Arquivo"
                description="O arquivo que você baixou estará no formato .zip. Clique com o botão direito sobre ele e selecione a opção 'Extrair Tudo' ou 'Descompactar aqui' para acessar os arquivos de instalação."
              />
               <Step
                icon={MousePointerClick}
                title="Passo 2: Execute o Instalador"
                description="Dentro da pasta descompactada, você encontrará um arquivo chamado 'Instalador NexusPro'. Dê um duplo clique sobre ele para iniciar o processo de instalação."
              />
               <Step
                icon={CheckSquare}
                title="Passo 3: Siga as Instruções"
                description="Uma vez que o instalador for executado, basta seguir as instruções na tela. Em poucos cliques, o NexusPro estará pronto para ser usado no seu computador."
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
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
