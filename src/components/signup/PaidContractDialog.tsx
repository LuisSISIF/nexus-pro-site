
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


const planDetails: Record<number, { features: string[], support: string }> = {
    3: { // Essencial
        features: [
            "Até 2 usuários simultâneos",
            "Controle de Crédito Simples",
            "Relatórios Básicos (vendas, caixa)",
            "Controle de Acesso",
            "Acesso a tutoriais",
        ],
        support: "O suporte para o Plano Essencial é oferecido via e-mail, com tempo de resposta de até 48 horas úteis."
    },
    4: { // Profissional
        features: [
            "Até 5 usuários simultâneos",
            "Controle de Crédito com limite e histórico",
            "Relatórios Avançados",
            "Controle de Acesso com permissões básicas",
            "Treinamento incluso",
            "Integração com E-commerce",
        ],
        support: "O suporte para o Plano Profissional é oferecido via WhatsApp e E-mail, com tempo de resposta prioritário."
    },
    5: { // Empresarial
        features: [
            "Até 12 usuários",
            "Controle de Crédito avançado por filial",
            "Relatórios Estratégicos e personalizados",
            "Controle de Acesso avançado + log de ações",
            "Gerenciamento MultiLojas",
            "Marca personalizada (opcional)",
            "Integração com E-commerce",
            "Treinamento incluso",
        ],
        support: "O suporte para o Plano Empresarial é prioritário, incluindo canais via WhatsApp, E-mail e acesso remoto quando necessário."
    ]
};

const ContractContent = ({ formData, systemVersion, plan }: { formData: PaidRegistrationFormValues, systemVersion: string, plan: PaidContractDialogProps['plan'] }) => (
    <div className="space-y-4 text-xs text-muted-foreground">
        <p className="font-semibold text-center text-md text-foreground">Contrato de Licença de Uso – Plano {plan.name}</p>
        
        <SectionTitle>1. IDENTIFICAÇÃO DAS PARTES</SectionTitle>
        <SubClause>
            <SubSectionTitle>1.1. LICENCIANTE:</SubSectionTitle>
            <ClauseText><strong>ANDROMEDA SOLUTIONS</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 53.489.502/0001-94, com domicílio fiscal à Rua Varginha, nº 6, Santa Luiza, Machado – MG, CEP 37750-000, e-mail andromedasolutions2025@outlook.com, telefone (35) 99861-5203.</ClauseText>
        </SubClause>
        <SubClause>
            <SubSectionTitle>1.2. LICENCIADO/USUÁRIO:</SubSectionTitle>
            <ClauseText>Pessoa física ou jurídica que aceita estes termos para contratar e utilizar o software NexusPro no Plano {plan.name}.</ClauseText>
             <ClauseText><strong>Empresa:</strong> {formData.companyName}</ClauseText>
             <ClauseText><strong>CNPJ:</strong> {formData.cnpj}</ClauseText>
             <ClauseText><strong>Representante:</strong> {formData.fullName} (CPF: {formData.cpf})</ClauseText>
        </SubClause>

        <SectionTitle>2. OBJETO</SectionTitle>
         <SubClause>
            <ClauseText>
                2.1. Concessão de licença de uso, não exclusiva e intransferível, do software NexusPro, 
                conforme as funcionalidades e limites do plano <strong>{plan.name}</strong>, contratado pelo valor de 
                <strong> R$ {plan.price.toFixed(2).replace('.', ',')} mensais</strong>.
            </ClauseText>
        </SubClause>

        <SectionTitle>3. DESCRIÇÃO TÉCNICA</SectionTitle>
        <SubClause>
            <ClauseText>3.1. <strong>Categoria:</strong> ERP especializado para gestão de varejo, com recursos de vendas, estoque, financeiro e relatórios integrados.</ClauseText>
            <ClauseText>3.2. <strong>Implementação:</strong> instalação local + banco de dados em servidor na nuvem + plataforma web para controle financeiro.</ClauseText>
            <SubSectionTitle>3.3. Requisitos Mínimos:</SubSectionTitle>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Processador Intel Core i3 ou AMD equivalente</li>
                    <li>4 GB RAM</li>
                    <li>10 GB livres no HD/SSD</li>
                    <li>Windows 10 (64 bits)</li>
                    <li>Tela 1366×768</li>
                    <li>Internet 5 Mbps</li>
                    <li>(Opcional) impressora de recibos, etiquetas; leitor de código de barras</li>
                </ul>
            <SubSectionTitle>3.4. Requisitos Recomendados:</SubSectionTitle>
                <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Intel Core i5 (8ª geração) ou AMD Ryzen 5</li>
                    <li>8 GB RAM</li>
                    <li>SSD 20 GB livres</li>
                    <li>Windows 10/11 (64 bits)</li>
                    <li>Tela Full HD 1920×1080</li>
                    <li>Internet 20 Mbps</li>
                    <li>(Opcional) impressora de recibos, etiquetas; leitor de código de barras; gaveta de dinheiro</li>
                </ul>
        </SubClause>

        <SectionTitle>4. FUNCIONALIDADES DO PLANO {plan.name.toUpperCase()}</SectionTitle>
        <SubClause>
            <ul className="list-disc pl-5 space-y-1">
                {(planDetails[plan.id]?.features || []).map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </SubClause>

        <SectionTitle>5. COLETA E TRATAMENTO DE DADOS</SectionTitle>
        <SubClause>
            <ClauseText>5.1. <strong>Dados Coletados:</strong> Todos os dados informados no ato do cadastro, incluindo dados pessoais do usuário administrador (nome, CPF, etc.) e dados da empresa (CNPJ, endereço, etc.).</ClauseText>
            <ClauseText>5.2. <strong>Finalidade:</strong> Operacionalização do sistema, faturamento, emissão de documentos fiscais (quando aplicável), suporte técnico e cumprimento de obrigações legais.</ClauseText>
            <ClauseText>5.3. <strong>Base legal:</strong> Execução de contrato (LGPD art. 7º, V) e Cumprimento de obrigação legal.</ClauseText>
            <ClauseText>5.4. <strong>Retenção:</strong> Os dados são mantidos enquanto o contrato estiver ativo e por até 5 anos após o término para fins fiscais e legais. Após esse período, são anonimizados ou excluídos.</ClauseText>
            <ClauseText>5.5. <strong>Localização dos servidores:</strong> América do Sul (São Paulo – SP).</ClauseText>
            <ClauseText>5.6. <strong>Segurança:</strong> Criptografia de senhas, controle de acesso e permissões, e backups diários.</ClauseText>
            <ClauseText>5.7. <strong>Exercício de direitos:</strong> Solicitação via canais de suporte para acesso, correção ou portabilidade dos dados.</ClauseText>
        </SubClause>

        <SectionTitle>6. USO PERMITIDO E PROIBIDO</SectionTitle>
        <SubClause>
            <ClauseText>6.1. <strong>Permitido:</strong> Utilizar todas as funcionalidades do plano contratado para as operações legítimas da empresa.</ClauseText>
            <ClauseText>6.2. <strong>Proibido:</strong></ClauseText>
                <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Engenharia reversa, descompilação, cópia ou redistribuição sem autorização.</li>
                <li>Atividades ilícitas ou violação de leis.</li>
                <li>Compartilhamento de credenciais com não licenciados.</li>
                <li>Hospedagem de dados não relacionados à operação legítima.</li>
                </ul>
            <ClauseText>6.3. <strong>Consequências:</strong> Suspensão temporária ou rescisão do contrato; medidas legais cabíveis.</ClauseText>
        </SubClause>

        <SectionTitle>7. SUPORTE TÉCNICO</SectionTitle>
        <SubClause>
            <ClauseText>7.1. <strong>Canais:</strong> {planDetails[plan.id]?.support || 'Canais de suporte definidos no plano.'}</ClauseText>
            <ClauseText>7.2. <strong>Tempo de resposta:</strong> E-mail em até 48 horas úteis (seg–sex 9h–17h, sáb 9h–12h).</ClauseText>
            <ClauseText>7.3. <strong>Documentação:</strong> Acesso completo à base de conhecimento, com guias, PDFs e vídeos.</ClauseText>
        </SubClause>

        <SectionTitle>8. POLÍTICA DE COBRANÇA E PAGAMENTO</SectionTitle>
        <SubClause>
             <ClauseText>8.1. <strong>Modalidade:</strong> O plano é pré-pago. O acesso ao sistema é liberado após a confirmação do pagamento inicial.</ClauseText>
             <ClauseText>8.2. <strong>Cobrança Proporcional (Pro-Rata):</strong> No primeiro mês, será gerada uma cobrança proporcional pelos dias entre a data da contratação e a data de vencimento escolhida pelo cliente. Esta cobrança tem vencimento imediato.</ClauseText>
             <ClauseText>8.3. <strong>Assinatura Mensal:</strong> Simultaneamente à cobrança pro-rata, será criada a assinatura mensal recorrente no valor integral do plano, com o primeiro vencimento na data escolhida pelo cliente para os meses subsequentes.</ClauseText>
             <ClauseText>8.4. <strong>Meios de Pagamento:</strong> As cobranças são geradas via Boleto Bancário ou PIX.</ClauseText>
             <ClauseText>8.5. <strong>Intermediação:</strong> Todos os pagamentos são processados e gerenciados pelo gateway de pagamento ASAAS.</ClauseText>
             <ClauseText>8.6. <strong>Reajuste:</strong> O valor da mensalidade poderá ser reajustado anualmente, com base no índice IGP-M ou outro que venha a substituí-lo, mediante aviso prévio de 30 dias.</ClauseText>
             <ClauseText>8.7. <strong>Fórmula de cálculo do valor proporcional:</strong></ClauseText>
             <ClauseText className="italic text-center my-2">Valor proporcional = (Valor do plano / 30) × (Dias de uso até o vencimento)</ClauseText>
             <ClauseText>8.8. Os valores são baseados em meses de 30 dias para padronização do cálculo.</ClauseText>
             <ClauseText>8.9. No momento da contratação, podem haver dois valores em aberto: a cobrança proporcional e a primeira mensalidade.</ClauseText>
             <ClauseText>8.10. O acesso é liberado após a confirmação do pagamento, e o ciclo mensal seguirá a data de vencimento escolhida.</ClauseText>
             <ClauseText>8.11. O gateway de pagamento utilizado é o ASAAS.</ClauseText>
        </SubClause>

        <SectionTitle>9. DISPONIBILIDADE E MANUTENÇÃO (SLA)</SectionTitle>
        <SubClause>
            <ClauseText>9.1. <strong>Uptime do banco online:</strong> A LICENCIANTE garante um uptime (tempo de disponibilidade) de 98% para os serviços em nuvem, exceto em casos de manutenções ou falhas de terceiros.</ClauseText>
            <ClauseText>9.2. <strong>Manutenções programadas:</strong> Aviso prévio de 24h, geralmente realizadas entre 22h e 5h.</ClauseText>
            <ClauseText>9.3. <strong>Backup diário:</strong> Restauração a partir do backup mais recente em caso de falha.</ClauseText>
        </SubClause>

        <SectionTitle>10. COMUNICAÇÕES</SectionTitle>
        <SubClause>
            <ClauseText>10.1. Todas as comunicações oficiais serão enviadas para o e-mail comercial cadastrado pelo LICENCIADO.</ClauseText>
            <ClauseText>10.2. Avisos sobre o status da assinatura e faturamento serão enviados pelo gateway de pagamento e pela LICENCIANTE.</ClauseText>
            <ClauseText>10.3. Alterações nos termos serão comunicadas com 15 dias de antecedência.</ClauseText>
            <ClauseText>10.4. O suporte técnico deve ser acionado pelos canais oficiais.</ClauseText>
        </SubClause>
        
        <SectionTitle>11. JURISDIÇÃO E LEGISLAÇÃO</SectionTitle>
        <SubClause>
            <ClauseText>11.1. Este termo é regido pelas leis brasileiras. Fica eleito o foro da Comarca de Machado – MG para dirimir quaisquer controvérsias.</ClauseText>
        </SubClause>

        <SectionTitle>12. ACEITE ELETRÔNICO</SectionTitle>
        <SubClause>
            <ClauseText>12.1. O LICENCIADO declara ter lido, compreendido e concordado com todos os termos e condições aqui estabelecidos ao marcar a caixa de seleção de aceite durante o processo de contratação. Este aceite eletrônico possui plena validade jurídica.</ClauseText>
        </SubClause>

        <SectionTitle>13. ASSINATURA DIGITAL E VERIFICAÇÕES DE SEGURANÇA</SectionTitle>
        <SubClause>
            <SubSectionTitle>13.1. Instalador sem Certificado Digital:</SubSectionTitle>
            <ClauseText>Devido ao recente lançamento do NexusPro, o instalador disponibilizado para download pode não conter um certificado de assinatura digital. Consequentemente, o Windows poderá exibir alertas de segurança.</ClauseText>
            <SubSectionTitle>13.2. Garantia de Integridade e Segurança:</SubSectionTitle>
            <ClauseText>Apesar da ausência de assinatura, o instalador baixado do site oficial passa por rigorosos processos de verificação de integridade e análise anti-malware, assegurando que está livre de softwares maliciosos.</ClauseText>
            <ClauseText><strong>Observação:</strong> Recomenda-se baixar o instalador apenas do site oficial (https://www.andromedasolutions.com.br).</ClauseText>
        </SubClause>

        <SectionTitle>14. LIMITAÇÃO DE RESPONSABILIDADE E EXCLUSÃO DE DANOS</SectionTitle>
        <SubClause>
            <ClauseText>14.1. A responsabilidade da LICENCIANTE limita-se ao valor pago pelo cliente pela licença no mês do ocorrido. Não nos responsabilizamos por lucros cessantes, danos indiretos, ou falhas de terceiros (internet, energia, etc.).</ClauseText>
        </SubClause>
        
        <SectionTitle>15. PROPRIEDADE DOS DADOS E PORTABILIDADE</SectionTitle>
        <SubClause>
            <ClauseText>15.1. Os dados inseridos no sistema são de propriedade do LICENCIADO. Garantimos a possibilidade de exportação dos dados em formato CSV a qualquer momento durante a vigência do contrato e por 30 dias após seu término.</ClauseText>
        </SubClause>
        
        <SectionTitle>16. ATUALIZAÇÕES E MODIFICAÇÕES DO SOFTWARE</SectionTitle>
        <SubClause>
            <ClauseText>16.1. Todas as atualizações do NexusPro são obrigatórias e automáticas para garantir a segurança e o bom funcionamento da plataforma. Mudanças significativas serão comunicadas com antecedência.</ClauseText>
        </SubClause>

        <SectionTitle>17. POLÍTICA DE CANCELAMENTO</SectionTitle>
        <SubClause>
            <ClauseText>17.1. O cancelamento pode ser solicitado a qualquer momento via canais de suporte. O acesso será mantido até o fim do ciclo de faturamento vigente, e os dados ficarão disponíveis para exportação por 30 dias após o término.</ClauseText>
        </SubClause>

        <SectionTitle>18. RESOLUÇÃO DE DISPUTAS</SectionTitle>
        <SubClause>
            <ClauseText>18.1. As partes se comprometem a tentar resolver qualquer disputa de forma amigável antes de recorrer à via judicial.</ClauseText>
        </SubClause>

        <SectionTitle>19. CESSÃO E TRANSFERÊNCIA</SectionTitle>
        <SubClause>
            <ClauseText>19.1. O LICENCIADO não pode ceder ou transferir os direitos desta licença a terceiros sem o consentimento prévio e por escrito da LICENCIANTE.</ClauseText>
        </SubClause>
        
        <SectionTitle>20. VIGÊNCIA E ALTERAÇÕES</SectionTitle>
        <SubClause>
            <ClauseText>20.1. O contrato entra em vigor na data do aceite eletrônico e permanece ativo enquanto as mensalidades estiverem em dia. A LICENCIANTE pode alterar os termos mediante aviso prévio de 30 dias.</ClauseText>
        </SubClause>
        
        <SectionTitle>21. DISPOSIÇÕES FINAIS COMPLEMENTARES</SectionTitle>
        <SubClause>
            <ClauseText>21.1. Estas cláusulas complementares integram o presente contrato, não substituindo nem alterando as disposições principais.</ClauseText>
            <ClauseText>21.2. Em caso de conflito, prevalecerão as disposições mais específicas.</ClauseText>
            <ClauseText>21.3. A eventual invalidade de uma disposição não afetará as demais.</ClauseText>
            <ClauseText>21.4. Estas cláusulas têm efeitos imediatos a partir do aceite eletrônico.</ClauseText>
            <ClauseText>21.5. A LICENCIANTE reserva-se o direito de alterar estas cláusulas, mediante comunicação prévia.</ClauseText>
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
