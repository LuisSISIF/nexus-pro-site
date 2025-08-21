
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { Loader2, Check } from 'lucide-react';
import type { PaidRegistrationFormValues } from '@/app/signup-paid/page';
import { getSystemVersion } from '@/actions/system-actions';
import { cn } from '@/lib/utils';

interface PaidContractDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAccept: () => void;
  isLoading: boolean;
  formData: PaidRegistrationFormValues;
  plan: {
      id: number;
      name: string;
      price: number;
  };
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-md font-bold mt-4 mb-2 text-foreground">{children}</h2>
);

const SubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
     <h3 className="font-semibold text-foreground mt-2">{children}</h3>
);

const ClauseText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <p className={cn("text-muted-foreground leading-relaxed", className)}>{children}</p>
);

const SubClause: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="pl-4 mt-3">
        {children}
    </div>
);


const planFeatures: Record<number, string[]> = {
    3: [ // Essencial
        "Até 2 usuários simultâneos",
        "Controle de Crédito Simples",
        "Relatórios Básicos (vendas, caixa)",
        "Controle de Acesso",
        "Acesso a tutoriais",
        "Suporte via E-mail",
    ],
    4: [ // Profissional
        "Até 5 usuários simultâneos",
        "Controle de Crédito com limite e histórico",
        "Relatórios Avançados",
        "Controle de Acesso com permissões básicas",
        "Treinamento incluso",
        "Integração com E-commerce",
        "Suporte via WhatsApp e E-mail",
    ],
    5: [ // Empresarial
        "Até 12 usuários",
        "Controle de Crédito avançado por filial",
        "Relatórios Estratégicos e personalizados",
        "Controle de Acesso avançado + log de ações",
        "Gerenciamento MultiLojas",
        "Marca personalizada (opcional)",
        "Integração com E-commerce",
        "Treinamento incluso",
        "Suporte Prioritário + remoto",
    ]
};

const ContractContent = ({ formData, systemVersion, plan }: { formData: PaidRegistrationFormValues, systemVersion: string, plan: PaidContractDialogProps['plan'] }) => (
    <div className="space-y-4 text-xs text-muted-foreground">
        <p className="font-semibold text-center text-md text-foreground">Contrato de Licença de Uso do Software NexusPro</p>
        
        <SectionTitle>1. PARTES CONTRATANTES</SectionTitle>
        <SubClause>
            <SubSectionTitle>1.1. LICENCIANTE:</SubSectionTitle>
            <ClauseText><strong>ANDROMEDA SOLUTIONS</strong>, CNPJ 53.489.502/0001-94, e-mail andromedasolutions2025@outlook.com.</ClauseText>
        </SubClause>
        <SubClause>
            <SubSectionTitle>1.2. LICENCIADO:</SubSectionTitle>
            <ClauseText>
                {formData.companyName}, CNPJ {formData.cnpj}, representada por {formData.fullName}, CPF {formData.cpf}.
            </ClauseText>
        </SubClause>

        <SectionTitle>2. OBJETO</SectionTitle>
         <SubClause>
            <ClauseText>
                2.1. Concessão de licença de uso, não exclusiva e intransferível, do software NexusPro, 
                conforme as funcionalidades e limites do plano <strong>{plan.name}</strong>, contratado pelo valor de 
                <strong> R$ {plan.price.toFixed(2).replace('.', ',')} mensais</strong>.
            </ClauseText>
        </SubClause>

        <SectionTitle>3. FUNCIONALIDADES DO PLANO {plan.name.toUpperCase()}</SectionTitle>
        <SubClause>
            <ul className="list-disc pl-5 space-y-1">
                {(planFeatures[plan.id] || []).map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </SubClause>

        <SectionTitle>4. POLÍTICA DE COBRANÇA</SectionTitle>
        <SubClause>
             <ClauseText>
                4.1. <strong>Pagamento:</strong> O plano é pré-pago. O acesso é liberado após a confirmação do pagamento.
            </ClauseText>
             <ClauseText>
                4.2. <strong>Cobrança Proporcional (Pro-Rata):</strong> Ao contratar, será gerada uma cobrança proporcional (pro-rata) pelos dias entre a data da contratação e a data de vencimento escolhida ({`dia ${formData.diaVencimento}`}). Esta cobrança é devida imediatamente.
            </ClauseText>
             <ClauseText>
                4.3. <strong>Assinatura Mensal:</strong> Simultaneamente, será criada sua assinatura mensal recorrente no valor de R$ {plan.price.toFixed(2).replace('.', ',')}, com vencimento todo dia {formData.diaVencimento}.
            </ClauseText>
            <ClauseText>
                4.4. <strong>Intermediação:</strong> Todos os pagamentos são processados pelo gateway ASAAS.
            </ClauseText>
        </SubClause>

        <SectionTitle>5. VIGÊNCIA E RESCISÃO</SectionTitle>
        <SubClause>
             <ClauseText>
                5.1. <strong>Vigência:</strong> Este contrato tem vigência indeterminada, renovando-se automaticamente mediante pagamento.
            </ClauseText>
             <ClauseText>
                5.2. <strong>Cancelamento:</strong> O cancelamento pode ser feito a qualquer momento. Não há multa, e o acesso permanece ativo até o fim do período já pago.
            </ClauseText>
        </SubClause>

        <SectionTitle>6. DISPOSIÇÕES GERAIS</SectionTitle>
        <SubClause>
             <ClauseText>
                6.1. As demais cláusulas sobre propriedade intelectual, uso permitido, tratamento de dados (LGPD), suporte e foro seguem o disposto nos <a href="/terms-of-use" target="_blank" className="text-primary hover:underline">Termos de Uso</a> e <a href="/privacy-policy" target="_blank" className="text-primary hover:underline">Política de Privacidade</a> disponíveis no site, que são parte integrante deste contrato.
            </ClauseText>
        </SubClause>

        <SectionTitle>7. ACEITE ELETRÔNICO</SectionTitle>
        <SubClause>
            <ClauseText>
                7.1. O LICENCIADO declara ter lido e concordado com todos os termos apresentados. Este aceite eletrônico, registrado por IP, data e hora, possui validade jurídica.
            </ClauseText>
        </SubClause>

        <div className="pt-4 mt-4 border-t">
            <p><strong>Versão do Documento:</strong> {systemVersion}</p>
        </div>
    </div>
);


export const PaidContractDialog: React.FC<PaidContractDialogProps> = ({ isOpen, onOpenChange, onAccept, isLoading, formData, plan }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [systemVersion, setSystemVersion] = useState('[Carregando versão...]');
  const [isContractLoading, setIsContractLoading] = useState(true);

  useEffect(() => {
    const fetchContractData = async () => {
      if (isOpen) {
        setIsContractLoading(true);
        try {
            const versionResult = await getSystemVersion();
            if (versionResult.success && versionResult.version) {
                 setSystemVersion(versionResult.version);
            }
        } catch (e) {
            console.error("Failed to fetch system version", e);
            setSystemVersion('[Versão indisponível]');
        } finally {
            setIsContractLoading(false);
        }
      }
    };

    fetchContractData();
  }, [isOpen]);


  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setIsAccepted(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Contrato de Licença de Uso – Plano {plan.name}</DialogTitle>
          <DialogDescription>
            Por favor, leia e aceite os termos de licença para continuar.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-96 w-full rounded-md border p-4">
            {isContractLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    <span>Carregando contrato...</span>
                </div>
            ) : (
                <ContractContent formData={formData} systemVersion={systemVersion} plan={plan} />
            )}
        </ScrollArea>
        
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 items-start gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="terms" 
                    disabled={isLoading || isContractLoading}
                    checked={isAccepted}
                    onCheckedChange={(checked) => setIsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms" className={cn("text-sm", isContractLoading && 'text-muted-foreground')}>
                    Li e aceito os termos do contrato de licença.
                </Label>
            </div>
            
            <Button 
                type="button" 
                onClick={onAccept}
                disabled={!isAccepted || isLoading || isContractLoading} 
                className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finalizando Cadastro...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Aceitar e Contratar Plano
                </>
              )}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
