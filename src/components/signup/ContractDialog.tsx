'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { Loader2, Check } from 'lucide-react';
import { getSystemVersion } from '@/actions/system-actions';
import { cn } from '@/lib/utils';

interface ContractDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAccept: () => void;
  isLoading: boolean;
  formData: {
      fullName: string;
      cnpj: string;
      cpf: string;
      companyName: string;
      email: string;
  };
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-sm font-bold mt-6 mb-2 text-foreground uppercase">{children}</h2>
);

const SubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
     <h3 className="font-bold text-foreground mt-4 mb-1">{children}</h3>
);

const ClauseText: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <p className={cn("text-muted-foreground leading-relaxed text-justify mb-2", className)}>{children}</p>
);

const SubClause: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="pl-4 mt-2">
        {children}
    </div>
);

const ContractContent = ({ formData, systemVersion }: { formData: ContractDialogProps['formData'], systemVersion: string }) => (
    <div className="space-y-4 text-[11px] text-muted-foreground">
        <p className="font-bold text-center text-sm text-foreground mb-6">CONTRATO DE LICENÇA DE USO DE SOFTWARE – PERÍODO DE TESTE</p>
        
        <SectionTitle>1. IDENTIFICAÇÃO DAS PARTES</SectionTitle>
        <SubClause>
            <SubSectionTitle>1.1. LICENCIANTE:</SubSectionTitle>
            <ClauseText><strong>ANDROMEDA SOLUTIONS</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 53.489.502/0001-94, com domicílio fiscal à Rua Varginha, nº 6, Santa Luiza, Machado – MG, CEP 37750-000, e-mail andromedasolutions2025@outlook.com, telefone (35) 99861-5203.</ClauseText>
        </SubClause>
        <SubClause>
            <SubSectionTitle>1.2. LICENCIADO/USUÁRIO:</SubSectionTitle>
            <ClauseText>Pessoa física ou jurídica que aceita estes termos para contratar e utilizar o software NexusPro no Período de Teste Gratuito.</ClauseText>
            <ClauseText><strong>Empresa:</strong> {formData.companyName}</ClauseText>
            <ClauseText><strong>CNPJ:</strong> {formData.cnpj}</ClauseText>
            <ClauseText><strong>Representante:</strong> {formData.fullName} (CPF: {formData.cpf})</ClauseText>
        </SubClause>

        <SectionTitle>2. OBJETO</SectionTitle>
        <SubClause>
            <ClauseText>2.1. O presente contrato tem por objeto a concessão de licença de uso temporária, gratuita, não exclusiva, intransferível e revogável, do software NexusPro, nos termos da legislação brasileira aplicável aos programas de computador.</ClauseText>
            <ClauseText>2.2. A licença concedida se limita às funcionalidades, quantidades e restrições correspondentes ao Plano de Teste, pelo prazo de 10 (dez) dias corridos.</ClauseText>
            <ClauseText>2.3. A presente contratação não implica venda do software, cessão de código-fonte, transferência de titularidade, alienação de propriedade intelectual ou outorga de qualquer direito além daqueles expressamente previstos neste contrato.</ClauseText>
        </SubClause>

        <SectionTitle>3. DESCRIÇÃO TÉCNICA</SectionTitle>
        <SubClause>
            <ClauseText>3.1. Categoria: ERP especializado para gestão de varejo, com recursos de vendas, estoque, financeiro e relatórios integrados.</ClauseText>
            <ClauseText>3.2. Implementação: instalação local + banco de dados em servidor na nuvem + plataforma web para controle financeiro.</ClauseText>
            <SubSectionTitle>3.3. Requisitos mínimos:</SubSectionTitle>
             <ul className="list-disc pl-5 space-y-1">
                <li>Processador Intel Core i3 ou AMD equivalente;</li>
                <li>4 GB RAM;</li>
                <li>10 GB livres no HD/SSD;</li>
                <li>Windows 10 (64 bits);</li>
                <li>Tela 1366×768;</li>
                <li>Internet 5 Mbps;</li>
                <li>(Opcional) impressora de recibos, impressora de etiquetas e leitor de código de barras.</li>
            </ul>
        </SubClause>

        <SectionTitle>4. FUNCIONALIDADES DO PLANO DE TESTE</SectionTitle>
        <SubClause>
            <ClauseText>4.1. O Plano de Teste contempla, observados os limites técnicos e comerciais do serviço:</ClauseText>
            <ul className="list-disc pl-5 space-y-1">
                <li>até 2 usuários simultâneos;</li>
                <li>controle de estoque e vendas básico;</li>
                <li>relatórios simples de movimentação;</li>
                <li>controle de acesso com permissões de administrador;</li>
                <li>suporte via e-mail.</li>
            </ul>
        </SubClause>
        
        <SectionTitle>5. COLETA E TRATAMENTO DE DADOS</SectionTitle>
        <SubClause>
            <ClauseText>5.1. A LICENCIANTE poderá tratar os dados fornecidos no ato da contratação e durante a utilização do sistema, incluindo dados cadastrais do usuário administrador, representantes, colaboradores autorizados e dados empresariais necessários à execução do contrato.</ClauseText>
            <ClauseText>5.2. O tratamento de dados terá como finalidades a operacionalização do sistema, autenticação de usuários, suporte técnico, prevenção a fraudes, cumprimento de obrigações legais e execução deste contrato.</ClauseText>
            <ClauseText>5.3. As bases legais aplicáveis incluem a execução de contrato (art. 7º, V, LGPD) e cumprimento de obrigação legal.</ClauseText>
            <ClauseText>5.4. Os dados serão mantidos durante o período de teste e por até 30 dias após o seu término para fins de migração para plano pago, sendo excluídos após este prazo, ressalvadas obrigações legais de guarda.</ClauseText>
            <ClauseText>5.5. Os servidores de armazenamento estarão localizados, preferencialmente, na América do Sul.</ClauseText>
            <ClauseText>5.6. A LICENCIANTE adotará medidas técnicas razoáveis de segurança, incluindo criptografia de senhas e backups.</ClauseText>
        </SubClause>
        
        <SectionTitle>6. USO PERMITIDO E PROIBIDO</SectionTitle>
        <SubClause>
            <ClauseText>6.1. É permitido ao LICENCIADO utilizar as funcionalidades disponibilizadas para fins legítimos de avaliação do software.</ClauseText>
            <ClauseText>6.2. É vedado ao LICENCIADO: praticar engenharia reversa; utilizar o sistema para atividades ilícitas; compartilhar credenciais com terceiros ou tentar contornar limites de segurança.</ClauseText>
            <ClauseText>6.3. O descumprimento poderá acarretar suspensão imediata do acesso sem aviso prévio.</ClauseText>
        </SubClause>
        
        <SectionTitle>7. SUPORTE TÉCNICO</SectionTitle>
        <SubClause>
            <ClauseText>7.1. O suporte do Plano de Teste será prestado preferencialmente via e-mail.</ClauseText>
            <ClauseText>7.2. O prazo estimado de primeira resposta será de até 48 horas úteis, dentro do horário comercial.</ClauseText>
        </SubClause>

        <SectionTitle>8. TRANSIÇÃO PARA PLANO PAGO</SectionTitle>
        <SubClause>
            <ClauseText>8.1. Ao final dos 10 dias, o LICENCIADO poderá optar pela contratação de um plano pago (Essencial, Profissional ou Empresarial).</ClauseText>
            <ClauseText>8.2. O acesso será bloqueado automaticamente após o período de teste caso a contratação não seja efetivada.</ClauseText>
        </SubClause>

        <SectionTitle>9. DISPONIBILIDADE E MANUTENÇÃO (SLA)</SectionTitle>
        <SubClause>
            <ClauseText>9.1. A LICENCIANTE envidará esforços para manter disponibilidade mensal de 98% dos serviços em nuvem.</ClauseText>
            <ClauseText>9.2. SLA constitui obrigação de meio e não garantia absoluta de continuidade ininterrupta.</ClauseText>
        </SubClause>

        <SectionTitle>10. DISPOSIÇÕES GERAIS</SectionTitle>
        <SubClause>
            <ClauseText>10.1. Este contrato é regido pelas leis brasileiras. Fica eleito o foro da Comarca de Machado – MG.</ClauseText>
            <ClauseText>10.2. O LICENCIADO declara ter lido e concordado com os termos ao realizar o aceite eletrônico.</ClauseText>
        </SubClause>

        <div className="pt-4 mt-4 border-t">
            <p><strong>Versão do Sistema:</strong> {systemVersion}</p>
        </div>
    </div>
);

export const ContractDialog: React.FC<ContractDialogProps> = ({ isOpen, onOpenChange, onAccept, isLoading, formData }) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [systemVersion, setSystemVersion] = useState('[Carregando...]');
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
            setSystemVersion('[Indisponível]');
        } finally {
            setIsContractLoading(false);
        }
      }
    };
    fetchContractData();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) setIsAccepted(false);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Termos de Licença – Período de Teste</DialogTitle>
          <DialogDescription>
            Leia atentamente o contrato de licença para o período gratuito de 10 dias.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[450px] w-full rounded-md border p-6 bg-white dark:bg-slate-950">
            {isContractLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="text-sm">Preparando documento...</span>
                </div>
            ) : (
                <ContractContent formData={formData} systemVersion={systemVersion} />
            )}
        </ScrollArea>
        
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 items-start gap-4 pt-4">
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="terms-test" 
                    disabled={isLoading || isContractLoading}
                    checked={isAccepted}
                    onCheckedChange={(checked) => setIsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms-test" className={cn("text-sm font-semibold cursor-pointer", isContractLoading && 'text-muted-foreground')}>
                    Li e aceito integralmente os termos de uso para o período de teste.
                </Label>
            </div>
            
            <Button 
                type="button" 
                onClick={onAccept}
                disabled={!isAccepted || isLoading || isContractLoading} 
                className="w-full sm:w-auto h-12 px-8"
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finalizando...</>
              ) : (
                <><Check className="mr-2 h-4 w-4" /> Aceitar e Iniciar Configuração</>
              )}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};