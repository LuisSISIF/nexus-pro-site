
'use client';

import React, { useState, useEffect } from 'react';
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
    <h2 className="text-lg font-bold mt-4 mb-2 text-foreground">{children}</h2>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-3">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <div className="pl-2 text-muted-foreground">{children}</div>
    </div>
);


const ContractContent = ({ formData, systemVersion }: { formData: RegistrationFormValues, systemVersion: string }) => (
    <div className="space-y-4 text-sm text-muted-foreground">
        <p className="font-semibold text-center text-lg">Termos de Uso – Período de Teste Gratuito (14 dias) para o Software NexusPro</p>
        
        <SectionTitle>1. Identificação das Partes</SectionTitle>
        <SubSection title="Licenciante:">
            <p><strong>ANDROMEDA SOLUTIONS</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 53.489.502/0001-94, com domicílio fiscal à Rua Varginha, nº 6, Santa Luiza, Machado – MG, CEP 37750-000 (endereço residencial do representante legal, visto que a empresa não possui sede comercial), neste ato representada por seu CEO Luís Henrique Freire de Lima, brasileiro, e-mail andromedasolutions2025@outlook.com, telefone (35) 99861-5203.</p>
        </SubSection>
        <SubSection title="Licenciado/Usuário:">
            <p>Pessoa física ou jurídica que aceita estes termos para uso do NexusPro no período de teste gratuito.</p>
            <p><strong>Nome:</strong> {formData.fullName}</p>
            <p><strong>CPF:</strong> {formData.cpf}</p>
            <p><strong>Empresa:</strong> {formData.companyName}</p>
        </SubSection>

        <SectionTitle>2. Objeto</SectionTitle>
        <p>Concessão de licença temporária, não exclusiva e intransferível de uso do software NexusPro, plataforma de gerenciamento e automação de estoque, vendas, finanças, controle de clientes e crédito para comércios de varejo em geral, pelo prazo de 14 (quatorze) dias corridos, iniciando-se no primeiro acesso.</p>

        <SectionTitle>3. Descrição técnica</SectionTitle>
        <p>a) <strong>Categoria:</strong> ERP especializado para gestão de varejo, com recursos de vendas, estoque, financeiro e relatórios integrados.</p>
        <p>b) <strong>Implementação:</strong> instalação local + banco de dados em servidor na nuvem + plataforma web para controle financeiro.</p>
        <SubSection title="c) Requisitos mínimos:">
             <ul className="list-disc pl-5 space-y-1">
                <li>Processador Intel Core i3 ou AMD equivalente</li>
                <li>4 GB RAM</li>
                <li>10 GB livres no HD/SSD</li>
                <li>Windows 10 (64 bits)</li>
                <li>Tela 1366×768</li>
                <li>Internet 5 Mbps</li>
                <li>(Opcional) impressora de recibos, etiquetas; leitor de código de barras</li>
            </ul>
        </SubSection>
         <SubSection title="d) Requisitos recomendados:">
             <ul className="list-disc pl-5 space-y-1">
                <li>Intel Core i5 (8ª geração) ou AMD Ryzen 5</li>
                <li>8 GB RAM</li>
                <li>SSD 20 GB livres</li>
                <li>Windows 10/11 (64 bits)</li>
                <li>Tela Full HD 1920×1080</li>
                <li>Internet 20 Mbps</li>
                <li>(Opcional) impressora de recibos, etiquetas; leitor de código de barras; gaveta de dinheiro</li>
            </ul>
        </SubSection>

        <SectionTitle>4. Limitações do plano de teste</SectionTitle>
        <ul className="list-disc pl-5 space-y-1">
            <li>Até 2 usuários simultâneos.</li>
            <li>Controle de apenas 1 loja.</li>
            <li>14 dias a contar do cadastro.</li>
            <li>Impressão de cupom não fiscal indisponível (CNPJ cliente não coletado).</li>
            <li>Demonstração de crediário limitada a 1 cliente.</li>
            <li>Suporte via e-mail (retorno em 24–48 h; seg–sex 9h–17h, sáb 9h–12h).</li>
        </ul>
        
        <SectionTitle>5. Coleta e tratamento de dados</SectionTitle>
         <ul className="list-disc pl-5 space-y-1">
            <li><strong>Dados coletados:</strong> nome, CPF, e-mail, telefone, sexo, login e senha de administrador; nome, atividade principal e endereço da empresa.</li>
            <li><strong>Finalidade:</strong> operacional para uso básico, cadastro de produtos, vendas, estoque, financeiro, funcionários e relatórios; sincronização e backup remoto para bancos online.</li>
            <li><strong>Base legal:</strong> Execução de contrato (LGPD art. 7º, V) e Cumprimento de obrigação legal (emissão de NF-e).</li>
            <li><strong>Retenção:</strong> 30 dias pós-teste para migração, depois exclusão.</li>
            <li><strong>Localização dos servidores:</strong> América do Sul (São Paulo – SP).</li>
            <li><strong>Segurança:</strong> criptografia de senhas; controle de acesso e permissões; credenciais no banco de dados.</li>
            <li><strong>Exercício de direitos:</strong> solicitação via e-mail/suporte para acesso, correção ou exclusão.</li>
        </ul>
        
        <SectionTitle>6. Uso permitido e proibido</SectionTitle>
        <p><strong>Permitido:</strong> avaliação das funcionalidades conforme limitações acima.</p>
        <p><strong>Proibido:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
            <li>Engenharia reversa, descompilação, cópia ou redistribuição sem autorização.</li>
            <li>Atividades ilícitas ou violação de leis.</li>
            <li>Compartilhamento de credenciais.</li>
            <li>Hospedagem de dados não relacionados à operação legítima.</li>
        </ul>
        <p><strong>Consequências:</strong> suspensão temporária ou rescisão sem reembolso; medidas legais cabíveis.</p>
        
        <SectionTitle>7. Suporte técnico</SectionTitle>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Canais:</strong> e-mail, WhatsApp/chat, telefone (seg–sex 8h–18h, exceto feriados).</li>
            <li><strong>Tempo de resposta:</strong> e-mail até 48 h úteis; chat/WhatsApp até 2 h úteis (planos pagos); telefone imediato (planos pagos).</li>
            <li><strong>Limitações no teste:</strong> dúvidas de instalação/configuração inicial apenas.</li>
            <li><strong>Documentação:</strong> guia rápido, PDFs e vídeos.</li>
        </ul>

        <SectionTitle>8. Transição para Plano Pago e Política de Cobrança Proporcional</SectionTitle>
        <p><strong>Planos pagos:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
            <li>Essencial (vendas, estoque, financeiro): R$ 80,00/mês</li>
            <li>Profissional (+ relatórios avançados, integrações): R$ 120,00/mês</li>
            <li>Empresarial (+ personalizações, suporte prioritário, multiunidade): R$ 190,00/mês</li>
        </ul>
        <p>Dados do teste mantidos integralmente; contratação sem reinstalação.</p>
        <p>Backup diário em nuvem; checagem de integridade após ativação.</p>
        <p>Ofertas especiais conforme campanhas vigentes.</p>
        <p className='mt-2'>Os planos pagos do NexusPro são oferecidos sob a modalidade pré-paga: o usuário realiza o pagamento antecipadamente para liberar o acesso ao sistema. Ao finalizar o período de teste, o usuário pode escolher a data de vencimento de sua mensalidade.</p>
        <p>De acordo com a data escolhida para vencimento, será aplicada a cobrança proporcional referente aos dias de utilização entre o início do plano e a data de vencimento definida. Exemplos:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li>Se o início for no dia 10 e o vencimento escolhido for dia 20, será cobrado proporcionalmente pelos 10 dias de utilização.</li>
            <li>Se o início for dia 10 e o vencimento escolhido for o dia 5 do mês seguinte, será cobrado proporcionalmente pelo período entre o dia atual e o próximo vencimento.</li>
        </ul>
        <p className='mt-2'><strong>Fórmula de cálculo do valor proporcional:</strong></p>
        <p className='italic text-center my-2'>Valor proporcional = (Valor do plano escolhido / 30) × (Quantidade de dias de uso até o vencimento)</p>
        <p>Os valores são baseados em meses de 30 dias para padronização do cálculo.</p>
        <p className='mt-2'>No momento da transição pode haver dois valores em aberto:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li>O valor proporcional referente aos dias até o vencimento escolhido.</li>
            <li>O valor da mensalidade integral, com vencimento na data definida pelo usuário.</li>
        </ul>
        <p className='mt-2'>O acesso ao sistema é liberado mediante pagamento dos valores proporcionais e, posteriormente, o ciclo mensal será sempre iniciado e cobrado conforme a data de vencimento fixada pelo usuário.</p>

        <SectionTitle>9. Disponibilidade e manutenção</SectionTitle>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>Uptime banco online:</strong> ≥ 98%, salvo manutenções ou eventos de provedor.</li>
            <li><strong>Manutenções programadas:</strong> aviso prévio de 24 h, geralmente 22h–5h.</li>
            <li><strong>Backup diário:</strong> restauração a partir do backup mais recente.</li>
        </ul>
        
        <SectionTitle>10. Comunicações</SectionTitle>
        <ul className="list-disc pl-5 space-y-1">
            <li><strong>E-mail oficial:</strong> cadastrado pelo cliente no início do teste.</li>
            <li><strong>Aviso de término:</strong> e-mail e mensagem no sistema com ≥ 3 dias de antecedência.</li>
            <li><strong>Alterações nos termos:</strong> aviso com ≥ 15 dias.</li>
            <li><strong>Suporte técnico:</strong> e-mail ou telefone conforme horários acima.</li>
        </ul>

        <SectionTitle>11. Jurisdição e legislação</SectionTitle>
        <p>Este termo é regido pelas leis brasileiras. Fica eleito o foro da Comarca de Machado – MG para dirimir quaisquer controvérsias, com exclusão de qualquer outro.</p>

        <SectionTitle>12. Aceite eletrônico</SectionTitle>
        <p>O usuário declara que leu e aceitou estes termos ao marcar a opção “Li e aceito os termos de uso” no sistema. O sistema registra data, hora e usuário para comprovação. Este aceite possui validade jurídica equiparada à assinatura manuscrita, nos termos da MP 2.200-2/2001.</p>
        
        <SectionTitle>13. Assinatura Digital e Verificações de Segurança</SectionTitle>
        <SubSection title="13.1. Instalador sem Certificado Digital:">
          <p>Devido ao recente lançamento do NexusPro, o instalador disponibilizado para download não contém certificado de assinatura digital emitido por autoridade certificadora. Consequentemente, sistemas operacionais como o Windows poderão exibir alertas de “aplicativo possivelmente perigoso” ou “fornecedor não reconhecido” ao executar o instalador.</p>
        </SubSection>
        <SubSection title="13.2. Garantia de Integridade e Segurança:">
          <p>Apesar da ausência de assinatura digital, todo pacote de instalação baixado diretamente do site oficial da Andromeda Solutions passa por rigorosos processos de:</p>
          <ul className="list-disc pl-5 space-y-1">
              <li>Verificação de integridade (hash de arquivos)</li>
              <li>Análise anti-malware automatizada</li>
              <li>Testes de risco em ambiente controlado</li>
          </ul>
          <p className="mt-2">Essas medidas asseguram que o instalador esteja livre de softwares maliciosos e que os dados do cliente sejam protegidos em todas as etapas de instalação e uso do sistema.</p>
          <p className="mt-2"><strong>Observação:</strong> recomenda-se executar o instalador apenas a partir do site oficial (https://www.andromedasolutions.com.br) e manter o antivírus atualizado para evitar alertas ou bloqueios indevidos.</p>
        </SubSection>
        
        <div className="pt-4 mt-4 border-t">
            <p><strong>Versão do Documento:</strong> {systemVersion}</p>
        </div>
    </div>
);


export const ContractDialog: React.FC<ContractDialogProps> = ({ isOpen, onOpenChange, onAccept, isLoading, formData }) => {
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
