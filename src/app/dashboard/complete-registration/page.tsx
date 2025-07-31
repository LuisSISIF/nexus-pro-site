
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, FileText, Loader2, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { isValidCNPJ } from '@/lib/validators';
import { completeCompanyRegistration } from '@/actions/company-actions';

const registrationSchema = z.object({
  cnpj: z.string().refine(isValidCNPJ, "CNPJ inválido."),
  inscricaoEstadual: z.string().min(1, "Inscrição Estadual é obrigatória."),
  regimeTributario: z.string({ required_error: "Regime Tributário é obrigatório." }),
  segmentoMercado: z.string().min(3, "Segmento de mercado é obrigatório."),
  diaVencimento: z.string({ required_error: "Dia de vencimento é obrigatório." }),
  emailComercial: z.string().email("E-mail comercial inválido."),
  instagram: z.string().optional(),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

const CompleteRegistrationPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      cnpj: '',
      inscricaoEstadual: '',
      segmentoMercado: '',
      emailComercial: '',
      instagram: '',
    },
  });

  const regimesTributarios = [
    { id: 1, nome: 'Lucro Real' },
    { id: 2, nome: 'Lucro Presumido' },
    { id: 3, nome: 'Simples Nacional' },
    { id: 4, nome: 'MEI (Microempreendedor Individual)' },
    { id: 5, nome: 'EIRELI' },
    { id: 6, nome: 'Sociedade Limitada' },
    { id: 7, nome: 'Sociedade Anônima' },
    { id: 8, nome: 'Cooperativa' },
    { id: 9, nome: 'Entidades sem Fins Lucrativos' },
  ];

  const diasVencimento = [5, 10, 15, 20];

  const onSubmit = async (values: RegistrationFormValues) => {
    setLoading(true);
    const companyId = localStorage.getItem('companyId');

    if (!companyId) {
      toast({ variant: 'destructive', title: 'Erro', description: 'ID da empresa não encontrado.' });
      setLoading(false);
      return;
    }
    
    try {
      const result = await completeCompanyRegistration({
        ...values,
        companyId: Number(companyId),
      });

      if (result.success) {
        toast({
          title: 'Cadastro Concluído!',
          description: 'Seus dados foram salvos. Agora, escolha seu plano.',
        });
        router.push('/dashboard/change-plan');
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao Salvar',
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro Inesperado',
        description: 'Ocorreu um erro ao processar sua solicitação.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Finalizar Cadastro</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para ativar todas as funcionalidades do sistema e escolher seu plano.
        </p>
      </div>

      <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
        <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300">Por que precisamos desses dados?</AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300">
          Suas informações fiscais e de contato são essenciais para o funcionamento completo do NexusPro, incluindo a emissão de cupons de venda não fiscais, faturamento e conformidade legal. Seus dados estão seguros conosco.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Dados da Empresa</CardTitle>
          <CardDescription>
            Informações necessárias para o uso fiscal e financeiro do sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="cnpj" render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl><Input placeholder="00.000.000/0000-00" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="inscricaoEstadual" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inscrição Estadual</FormLabel>
                    <FormControl><Input placeholder="Número da Inscrição Estadual" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="regimeTributario" render={({ field }) => (
                <FormItem>
                  <FormLabel>Regime Tributário</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Selecione o regime da sua empresa" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regimesTributarios.map(regime => (
                        <SelectItem key={regime.id} value={String(regime.id)}>
                          {regime.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="segmentoMercado" render={({ field }) => (
                <FormItem>
                  <FormLabel>Segmento de Mercado</FormLabel>
                  <FormControl><Input placeholder="Ex: Varejo de Roupas, Mercearia, etc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="diaVencimento" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dia de Vencimento da Mensalidade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Selecione um dia" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {diasVencimento.map(dia => (
                          <SelectItem key={dia} value={String(dia)}>
                            Dia {dia}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="emailComercial" render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail Comercial</FormLabel>
                    <FormControl><Input type="email" placeholder="contato@suaempresa.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="instagram" render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram (Opcional)</FormLabel>
                  <FormControl><Input placeholder="@seuinstagram" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" disabled={loading} className="w-full text-lg py-6">
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Save className="mr-2 h-5 w-5" />}
                {loading ? 'Salvando e Criando Cliente...' : 'Salvar Dados e Continuar'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteRegistrationPage;

    