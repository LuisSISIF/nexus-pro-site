
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { Loader2, Check } from 'lucide-react';
import type { RegistrationFormValues } from '@/app/signup/page';
import { getSystemVersion } from '@/actions/system-actions';
import { cn } from '@/lib/utils';

interface ContractDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAccept: () => void;
  isLoading: boolean;
  formData: RegistrationFormValues;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h2>
);

const SubSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-3">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="pl-2 text-muted-foreground">{children}</div>
    </div>
);

const ContractContent = ({ formData, systemVersion }: { formData: RegistrationFormValues, systemVersion: string }) => (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p>Este contrato rege os termos do seu acesso gratuito de 14 dias ao software NexusPro.</p>
        
        <SectionTitle>1. Identificação das Partes</SectionTitle>
        <SubSection title="Licenciante:">
            <p><strong>ANDROMEDA SOLUTIONS</strong>, CNPJ 53.489.502/0001-94, representada por Luís Henrique Freire de Lima.</p>
        </SubSection>
        <SubSection title="Licenciado/Usuário:">
            <p><strong>Nome:</strong> {formData.fullName}</p>
            <p><strong>CPF:</strong> {formData.cpf}</p>
            <p><strong>Empresa:</strong> {formData.companyName}</p>
        </SubSection>

        <SectionTitle>2. Objeto</SectionTitle>
        <p>Concessão de licença temporária (14 dias), não exclusiva e intransferível de uso do NexusPro.</p>

        <SectionTitle>3. Descrição Técnica</SectionTitle>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Categoria:</strong> ERP especializado para gestão de varejo.</li>
            <li><strong>Implementação:</strong> Instalação local com banco de dados na nuvem e plataforma web.</li>
            <li><strong>Requisitos Mínimos:</strong> Core i3, 4GB RAM, Win 10 (64 bits), Internet 5 Mbps.</li>
        </ul>

        <SectionTitle>4. Limitações do Plano de Teste</SectionTitle>
        <ul className="list-disc pl-5 space-y-1">
            <li>Até 2 usuários e 1 loja.</li>
            <li>Impressão de cupom não fiscal indisponível.</li>
            <li>Suporte técnico limitado a dúvidas de instalação via e-mail.</li>
        </ul>

        <SectionTitle>5. Coleta e Tratamento de Dados (LGPD)</SectionTitle>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Dados Coletados:</strong> Informações de cadastro do usuário e da empresa.</li>
            <li><strong>Finalidade:</strong> Operacionalização do sistema, cadastro e backup.</li>
            <li><strong>Base Legal:</strong> Execução de contrato (LGPD art. 7º, V).</li>
            <li><strong>Segurança:</strong> Criptografia, controle de acesso e servidores em São Paulo-SP.</li>
        </ul>
        
        <SectionTitle>6. Uso Permitido e Proibido</SectionTitle>
        <p>É permitido avaliar as funcionalidades. É proibido realizar engenharia reversa, cópia, atividades ilícitas ou compartilhamento de credenciais.</p>

        <SectionTitle>7. Suporte e Transição para Plano Pago</SectionTitle>
        <p>Após o teste, os dados são mantidos por 30 dias para contratação de um plano pago (Essencial, Profissional ou Empresarial), sem necessidade de reinstalação.</p>
        
        <SectionTitle>8. Instalação e Segurança</SectionTitle>
        <p>O instalador do NexusPro não possui certificado digital, o que pode gerar alertas de segurança no Windows. Garantimos que o software baixado do nosso site oficial é seguro, verificado e livre de malware.</p>

        <SectionTitle>9. Aceite Eletrônico e Jurisdição</SectionTitle>
        <p>Ao aceitar estes termos, você firma um contrato com validade jurídica. Fica eleito o foro da Comarca de Machado – MG para dirimir quaisquer controvérsias.</p>
        
        <div className="pt-4 mt-4 border-t">
            <p><strong>Versão do Documento:</strong> {systemVersion}</p>
            <p><strong>Data de Vigência:</strong> 24 de julho de 2024</p>
        </div>
    </div>
);


export const ContractDialog: React.FC<ContractDialogProps> = ({ isOpen, onOpenChange, onAccept, isLoading, formData }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [systemVersion, setSystemVersion] = useState('[Versão não disponível]');
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
            console.error("Failed to fetch system version", e)
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
          <DialogTitle>Termos de Uso – Período de Teste Gratuito</DialogTitle>
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
                <ContractContent formData={formData} systemVersion={systemVersion} />
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
                <Label htmlFor="terms" className={cn(isContractLoading && 'text-muted-foreground')}>
                    Li e aceito os termos de uso
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
                  Aceitar e Criar Conta
                </>
              )}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
