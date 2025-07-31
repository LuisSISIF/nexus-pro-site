
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getContractData } from '@/actions/contract-actions';
import { AlertCircle, Mail, MessageSquare } from 'lucide-react';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 4.971 4.971z" />
    </svg>
);

const SupportCard = ({ icon, title, description, buttonText, href, target }: { icon: React.ElementType, title: string, description: string, buttonText: string, href: string, target?: string }) => {
    const Icon = icon;
    return (
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex-shrink-0">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
                 <Button asChild className="w-full">
                    <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
                        {buttonText}
                    </a>
                </Button>
            </CardContent>
        </Card>
    )
}


const FinancialSupportPage = () => {
    const [idPlano, setIdPlano] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const eligibleWhatsappPlans = [1, 4, 5];

    useEffect(() => {
        const fetchPlan = async () => {
            const companyId = localStorage.getItem('companyId');
            if (!companyId) {
                setError("ID da empresa não encontrado. Faça o login novamente.");
                setLoading(false);
                return;
            }

            try {
                const result = await getContractData(Number(companyId));
                if (result.success && result.data) {
                    setIdPlano(result.data.idPlano);
                } else {
                    setError(result.message);
                }
            } catch (err) {
                setError("Ocorreu um erro ao buscar os dados do seu plano.");
            } finally {
                setLoading(false);
            }
        };

        fetchPlan();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-10 w-full mt-4" />
                    </div>
                     <div className="space-y-4">
                        <Skeleton className="h-12 w-12 rounded-lg" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-10 w-full mt-4" />
                    </div>
                </div>
            )
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

        return (
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
                <SupportCard 
                    icon={Mail}
                    title="Abrir Ticket via E-mail"
                    description="Para questões formais de cobrança, notas fiscais ou pendências. Retornaremos em até 24h úteis."
                    buttonText="Enviar E-mail"
                    href="mailto:andromedasolutions2025@outlook.com"
                />

                {idPlano && eligibleWhatsappPlans.includes(idPlano) && (
                    <SupportCard 
                        icon={WhatsAppIcon}
                        title="Contato via WhatsApp"
                        description="Suporte rápido para dúvidas e solicitações financeiras urgentes. (Exclusivo para planos elegíveis)."
                        buttonText="Falar no WhatsApp"
                        href="https://wa.me/5535998615203"
                        target="_blank"
                    />
                )}
            </div>
        )

    }

    return (
        <div className="flex flex-col gap-8">
            <div className="space-y-1.5">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Suporte Financeiro</h1>
                <p className="text-muted-foreground">
                    Canais de atendimento para resolver suas questões financeiras.
                </p>
            </div>
            
            {renderContent()}

             <Card className="mt-8 bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <MessageSquare className="w-5 h-5 text-primary"/>
                        Horário de Atendimento
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                       Nosso suporte financeiro opera de <strong>Segunda a Sexta-feira, das 09:00 às 18:00</strong>. Solicitações enviadas fora desse horário serão processadas no próximo dia útil.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default FinancialSupportPage;
