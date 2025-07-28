"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  SalesPredictionInput,
  SalesPredictionOutput,
  predictStockNeeds,
} from "@/ai/flows/sales-prediction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, LineChart, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SalesPredictionInputSchema = z.object({
  salesData: z
    .string()
    .min(50, "Por favor, forneça dados de vendas detalhados (mínimo 50 caracteres)."),
  currentStockLevels: z
    .string()
    .min(20, "Por favor, forneça os níveis de estoque atuais (mínimo 20 caracteres)."),
});

export function SalesPredictionForm() {
  const [prediction, setPrediction] = useState<SalesPredictionOutput | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SalesPredictionInput>({
    resolver: zodResolver(SalesPredictionInputSchema),
    defaultValues: {
      salesData: "",
      currentStockLevels: "",
    },
  });

  async function onSubmit(values: SalesPredictionInput) {
    setLoading(true);
    setPrediction(null);
    try {
      const result = await predictStockNeeds(values);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction error:", error);
      toast({
        variant: "destructive",
        title: "Erro na Previsão",
        description:
          "Não foi possível gerar a previsão. Por favor, tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-accent" />
            <span>Dados para Análise</span>
          </CardTitle>
          <CardDescription>
            Insira os dados de vendas e os níveis de estoque para que nossa IA
            possa gerar uma previsão. Use formato CSV ou JSON para melhores
            resultados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="salesData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dados de Vendas</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Exemplo:\nproduto,data,quantidade\nCamiseta,2023-10-01,10\nCaneca,2023-10-01,15`}
                        className="h-40"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentStockLevels"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Níveis de Estoque Atuais</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Exemplo:\nproduto,estoque\nCamiseta,50\nCaneca,30`}
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {loading ? "Analisando..." : "Gerar Previsão"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        {loading && (
          <Card className="flex flex-col items-center justify-center p-8 text-center h-full">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-semibold font-headline">
              Processando sua previsão...
            </h3>
            <p className="text-muted-foreground">
              Nossa IA está analisando seus dados. Isso pode levar alguns
              instantes.
            </p>
          </Card>
        )}
        {prediction && (
          <>
            <Card className="bg-primary/5 border-primary">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <BarChart className="w-6 h-6 text-primary" />
                  Necessidades de Estoque Previstas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="p-4 rounded-md bg-background whitespace-pre-wrap font-mono text-sm">
                  {prediction.predictedStockNeeds}
                </pre>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <LineChart className="w-6 h-6 text-primary" />
                  Análise de Vendas e Confiança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold">Análise de Tendências</h4>
                  <p className="text-muted-foreground">{prediction.analysis}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Nível de Confiança</h4>
                  <p className="text-2xl font-bold text-primary">
                    {prediction.confidenceLevel}
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        {!loading && !prediction && (
          <Card className="flex flex-col items-center justify-center p-8 text-center h-full border-dashed">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-headline">
              Aguardando seus dados
            </h3>
            <p className="text-muted-foreground">
              Os resultados da previsão aparecerão aqui.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
