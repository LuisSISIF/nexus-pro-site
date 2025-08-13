
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


const ContractContent = ({ formData, systemVersion }: { formData: RegistrationFormValues, systemVersion: string }) => (
    <div className="space-y-4 text-xs text-muted-foreground">
        <p className="font-semibold text-center text-md text-foreground">Termos de Uso – Período de Teste Gratuito (10 dias) para o Software NexusPro</p>
        
        <SectionTitle>1. IDENTIFICAÇÃO DAS PARTES</SectionTitle>
        <SubClause>
            <SubSectionTitle>1.1. LICENCIANTE:</SubSectionTitle>
            <ClauseText><strong>ANDROMEDA SOLUTIONS</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 53.489.502/0001-94, com domicílio fiscal à Rua Varginha, nº 6, Santa Luiza, Machado – MG, CEP 37750-000 (endereço residencial do representante legal, visto que a empresa não possui sede comercial), neste ato representada por seu CEO Luís Henrique Freire de Lima, brasileiro, e-mail andromedasolutions2025@outlook.com, telefone (35) 99861-5203.</ClauseText>
        </SubClause>
        <SubClause>
            <SubSectionTitle>1.2. LICENCIADO/USUÁRIO:</SubSectionTitle>
            <ClauseText>Pessoa física ou jurídica que aceita estes termos para uso do NexusPro no período de teste gratuito.</ClauseText>
            <ClauseText><strong>Nome:</strong> {formData.fullName}</ClauseText>
            <ClauseText><strong>CPF:</strong> {formData.cpf}</ClauseText>
            <ClauseText><strong>Empresa:</strong> {formData.companyName}</ClauseText>
        </SubClause>

        <SectionTitle>2. OBJETO</SectionTitle>
         <SubClause>
            <ClauseText>2.1. Concessão de licença temporária, não exclusiva e intransferível de uso do software NexusPro, plataforma de gerenciamento e automação de estoque, vendas, finanças, controle de clientes e crédito para comércios de varejo em geral, pelo prazo de 10 (dez) dias corridos, iniciando-se no primeiro acesso.</ClauseText>
        </SubClause>

        <SectionTitle>3. DESCRIÇÃO TÉCNICA</SectionTitle>
        <SubClause>
            <ClauseText>3.1. <strong>Categoria:</strong> ERP especializado para gestão de varejo, com recursos de vendas, estoque, financeiro e relatórios integrados.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>3.2. <strong>Implementação:</strong> instalação local + banco de dados em servidor na nuvem + plataforma web para controle financeiro.</ClauseText>
        </SubClause>
        <SubClause>
             <SubSectionTitle>3.3. Requisitos mínimos:</SubSectionTitle>
             <ul className="list-disc pl-5 space-y-1">
                <li>Processador Intel Core i3 ou AMD equivalente</li>
                <li>4 GB RAM</li>
                <li>10 GB livres no HD/SSD</li>
                <li>Windows 10 (64 bits)</li>
                <li>Tela 1366×768</li>
                <li>Internet 5 Mbps</li>
                <li>(Opcional) impressora de recibos, etiquetas; leitor de código de barras</li>
            </ul>
        </SubClause>
        <SubClause>
             <SubSectionTitle>3.4. Requisitos recomendados:</SubSectionTitle>
             <ul className="list-disc pl-5 space-y-1">
                <li>Intel Core i5 (8ª geração) ou AMD Ryzen 5</li>
                <li>8 GB RAM</li>
                <li>SSD 20 GB livres</li>
                <li>Windows 10/11 (64 bits)</li>
                <li>Tela Full HD 1920×1080</li>
                <li>Internet 20 Mbps</li>
                <li>(Opcional) impressora de recibos, etiquetas; leitor de código de barras; gaveta de dinheiro</li>
            </ul>
        </SubClause>

        <SectionTitle>4. LIMITAÇÕES DO PLANO DE TESTE</SectionTitle>
        <SubClause>
            <ClauseText>4.1. Até 2 usuários simultâneos.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>4.2. Controle de apenas 1 loja.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>4.3. 10 dias a contar do cadastro.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>4.4. Impressão de cupom não fiscal indisponível (CNPJ cliente não coletado).</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>4.5. Demonstração de crediário limitada a 1 cliente.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>4.6. Suporte via e-mail (retorno em 24–48 h; seg–sex 9h–17h, sáb 9h–12h).</ClauseText>
        </SubClause>
        
        <SectionTitle>5. COLETA E TRATAMENTO DE DADOS</SectionTitle>
        <SubClause>
            <ClauseText>5.1. <strong>Dados coletados:</strong> nome, CPF, e-mail, telefone, sexo, login e senha de administrador; nome, atividade principal e endereço da empresa.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>5.2. <strong>Finalidade:</strong> operacional para uso básico, cadastro de produtos, vendas, estoque, financeiro, funcionários e relatórios; sincronização e backup remoto para bancos online.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>5.3. <strong>Base legal:</strong> Execução de contrato (LGPD art. 7º, V) e Cumprimento de obrigação legal (emissão de NF-e).</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>5.4. <strong>Retenção:</strong> 30 dias pós-teste para migração, depois exclusão.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>5.5. <strong>Localização dos servidores:</strong> América do Sul (São Paulo – SP).</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>5.6. <strong>Segurança:</strong> criptografia de senhas; controle de acesso e permissões; credenciais no banco de dados.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>5.7. <strong>Exercício de direitos:</strong> solicitação via e-mail/suporte para acesso, correção ou exclusão.</ClauseText>
        </SubClause>
        
        <SectionTitle>6. USO PERMITIDO E PROIBIDO</SectionTitle>
        <SubClause>
            <ClauseText>6.1. <strong>Permitido:</strong> avaliação das funcionalidades conforme limitações acima.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>6.2. <strong>Proibido:</strong></ClauseText>
            <ul className="list-disc pl-5 space-y-1">
                <li>Engenharia reversa, descompilação, cópia ou redistribuição sem autorização.</li>
                <li>Atividades ilícitas ou violação de leis.</li>
                <li>Compartilhamento de credenciais.</li>
                <li>Hospedagem de dados não relacionados à operação legítima.</li>
            </ul>
        </SubClause>
        <SubClause>
            <ClauseText>6.3. <strong>Consequências:</strong> suspensão temporária ou rescisão sem reembolso; medidas legais cabíveis.</ClauseText>
        </SubClause>
        
        <SectionTitle>7. SUPORTE TÉCNICO</SectionTitle>
        <SubClause>
            <ClauseText>7.1. <strong>Canais:</strong> e-mail, WhatsApp/chat, telefone (seg–sex 8h–18h, exceto feriados).</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>7.2. <strong>Tempo de resposta:</strong> e-mail até 48 h úteis; chat/WhatsApp até 2 h úteis (planos pagos); telefone imediato (planos pagos).</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>7.3. <strong>Limitações no teste:</strong> dúvidas de instalação/configuração inicial apenas.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>7.4. <strong>Documentação:</strong> guia rápido, PDFs e vídeos.</ClauseText>
        </SubClause>

        <SectionTitle>8. TRANSIÇÃO PARA PLANO PAGO E POLÍTICA DE COBRANÇA PROPORCIONAL</SectionTitle>
        <SubClause>
            <ClauseText>8.1. <strong>Planos pagos:</strong></ClauseText>
            <ul className="list-disc pl-5 space-y-1">
                <li>Essencial (vendas, estoque, financeiro): R$ 80,00/mês</li>
                <li>Profissional (+ relatórios avançados, integrações): R$ 120,00/mês</li>
                <li>Empresarial (+ personalizações, suporte prioritário, multiunidade): R$ 190,00/mês</li>
            </ul>
        </SubClause>
        <SubClause>
            <ClauseText>8.2. Dados do teste mantidos integralmente; contratação sem reinstalação.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>8.3. Backup diário em nuvem; checagem de integridade após ativação.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>8.4. Ofertas especiais conforme campanhas vigentes.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>8.5. Os planos pagos do NexusPro são oferecidos sob a modalidade pré-paga: o usuário realiza o pagamento antecipadamente para liberar o acesso ao sistema. Ao finalizar o período de teste, o usuário pode escolher a data de vencimento de sua mensalidade.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>8.6. De acordo com a data escolhida para vencimento, será aplicada a cobrança proporcional referente aos dias de utilização entre o início do plano e a data de vencimento definida. Exemplos:</ClauseText>
            <ul className="list-disc pl-5 space-y-1">
                <li>Se o início for no dia 10 e o vencimento escolhido for dia 20, será cobrado proporcionalmente pelos 10 dias de utilização.</li>
                <li>Se o início for dia 10 e o vencimento escolhido for o dia 5 do mês seguinte, será cobrado proporcionalmente pelo período entre o dia atual e o próximo vencimento.</li>
            </ul>
        </SubClause>
        <SubClause>
            <ClauseText>8.7. <strong>Fórmula de cálculo do valor proporcional:</strong></ClauseText>
            <p className='italic text-center my-2 text-xs'>Valor proporcional = (Valor do plano escolhido / 30) × (Quantidade de dias de uso até o vencimento)</p>
        </SubClause>
        <SubClause>
            <ClauseText>8.8. Os valores são baseados em meses de 30 dias para padronização do cálculo.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>8.9. No momento da transição pode haver dois valores em aberto:</ClauseText>
            <ul className="list-disc pl-5 space-y-1">
                <li>O valor proporcional referente aos dias até o vencimento escolhido.</li>
                <li>O valor da mensalidade integral, com vencimento na data definida pelo usuário.</li>
            </ul>
        </SubClause>
        <SubClause>
            <ClauseText>8.10. O acesso ao sistema é liberado mediante pagamento dos valores proporcionais e, posteriormente, o ciclo mensal será sempre iniciado e cobrado conforme a data de vencimento fixada pelo usuário.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>8.11. Todos os pagamentos relativos ao software NexusPro serão processados e intermediados pela instituição de pagamento ASAAS, nos termos de sua política de cobrança e conformidade, garantindo segurança e confiabilidade nas transações.</ClauseText>
        </SubClause>

        <SectionTitle>9. DISPONIBILIDADE E MANUTENÇÃO</SectionTitle>
        <SubClause>
            <ClauseText>9.1. <strong>Uptime banco online:</strong> ≥ 98%, salvo manutenções ou eventos de provedor.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>9.2. <strong>Manutenções programadas:</strong> aviso prévio de 24 h, geralmente 22h–5h.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>9.3. <strong>Backup diário:</strong> restauração a partir do backup mais recente.</ClauseText>
        </SubClause>
        
        <SectionTitle>10. COMUNICAÇÕES</SectionTitle>
        <SubClause>
            <ClauseText>10.1. <strong>E-mail oficial:</strong> cadastrado pelo cliente no início do teste.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>10.2. <strong>Aviso de término:</strong> e-mail e mensagem no sistema com ≥ 3 dias de antecedência.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>10.3. <strong>Alterações nos termos:</strong> aviso com ≥ 15 dias.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>10.4. <strong>Suporte técnico:</strong> e-mail ou telefone conforme horários acima.</ClauseText>
        </SubClause>

        <SectionTitle>11. JURISDIÇÃO E LEGISLAÇÃO</SectionTitle>
        <SubClause>
            <ClauseText>11.1. Este termo é regido pelas leis brasileiras. Fica eleito o foro da Comarca de Machado – MG para dirimir quaisquer controvérsias, com exclusão de qualquer outro.</ClauseText>
        </SubClause>

        <SectionTitle>12. ACEITE ELETRÔNICO</SectionTitle>
        <SubClause>
            <ClauseText>12.1. O usuário declara que leu e aceitou estes termos ao marcar a opção “Li e aceito os termos de uso” no sistema. O sistema registra data, hora e usuário para comprovação. Este aceite possui validade jurídica equiparada à assinatura manuscrita, nos termos da MP 2.200-2/2001.</ClauseText>
        </SubClause>
        
        <SectionTitle>13. ASSINATURA DIGITAL E VERIFICAÇÕES DE SEGURANÇA</SectionTitle>
        <SubClause>
            <SubSectionTitle>13.1. Instalador sem Certificado Digital:</SubSectionTitle>
            <ClauseText>Devido ao recente lançamento do NexusPro, o instalador disponibilizado para download não contém certificado de assinatura digital emitido por autoridade certificadora. Consequentemente, sistemas operacionais como o Windows poderão exibir alertas de “aplicativo possivelmente perigoso” ou “fornecedor não reconhecido” ao executar o instalador.</ClauseText>
        </SubClause>
        <SubClause>
            <SubSectionTitle>13.2. Garantia de Integridade e Segurança:</SubSectionTitle>
            <ClauseText>Apesar da ausência de assinatura digital, todo pacote de instalação baixado diretamente do site oficial da Andromeda Solutions passa por rigorosos processos de:</ClauseText>
            <ul className="list-disc pl-5 space-y-1">
                <li>Verificação de integridade (hash de arquivos)</li>
                <li>Análise anti-malware automatizada</li>
                <li>Testes de risco em ambiente controlado</li>
            </ul>
            <ClauseText className="mt-2">Essas medidas asseguram que o instalador esteja livre de softwares maliciosos e que os dados do cliente sejam protegidos em todas as etapas de instalação e uso do sistema.</ClauseText>
            <ClauseText className="mt-2"><strong>Observação:</strong> recomenda-se executar o instalador apenas a partir do site oficial (https://www.andromedasolutions.com.br) e manter o antivírus atualizado para evitar alertas ou bloqueios indevidos.</ClauseText>
        </SubClause>
        
        <SectionTitle>14. LIMITAÇÃO DE RESPONSABILIDADE E EXCLUSÃO DE DANOS</SectionTitle>
        <SubClause>
            <ClauseText>14.1. A Andromeda Solutions não se responsabiliza, em nenhuma hipótese, por lucros cessantes, danos morais, interrupção de atividades comerciais ou quaisquer outros danos indiretos. A responsabilidade por força maior (fenômenos naturais, atos governamentais, pandemias) ou falhas de terceiros (internet, energia, equipamentos) é excluída. O usuário é o único responsável pela integridade dos dados inseridos e por eventuais exclusões.</ClauseText>
        </SubClause>

        <SectionTitle>15. PROPRIEDADE DOS DADOS E PORTABILIDADE</SectionTitle>
        <SubClause>
            <ClauseText>15.1. O usuário tem o direito garantido de exportar integralmente seus dados em formato CSV durante o período de teste e por até 30 dias após seu término. A Andromeda Solutions garante que não fará uso comercial dos dados do cliente.</ClauseText>
        </SubClause>

        <SectionTitle>16. ATUALIZAÇÕES E MODIFICAÇÕES DO SOFTWARE</SectionTitle>
        <SubClause>
            <ClauseText>16.1. Todas as atualizações do NexusPro são obrigatórias e automáticas para garantir a segurança, integridade e compatibilidade do sistema. Mudanças significativas serão comunicadas com 48 horas de antecedência. Não é possível recusar atualizações, pois o sistema depende delas para funcionar corretamente.</ClauseText>
        </SubClause>

        <SectionTitle>17. POLÍTICA DE CANCELAMENTO (PERÍODO DE TESTE)</SectionTitle>
        <SubClause>
            <ClauseText>17.1. O cancelamento durante o período de teste é imediato, pode ser feito a qualquer momento sem justificativa e não gera qualquer tipo de reembolso, pois o serviço é gratuito. Após o cancelamento, o acesso é bloqueado, e os dados serão mantidos para download por 30 dias.</ClauseText>
        </SubClause>

        <SectionTitle>18. RESOLUÇÃO ALTERNATIVA DE DISPUTAS</SectionTitle>
        <SubClause>
            <ClauseText>18.1. Qualquer disputa será resolvida primeiramente por negociação direta em até 15 dias. Persistindo o desacordo, as partes se comprometem a participar de uma sessão de mediação online, com custos rateados, por até 30 dias antes de qualquer medida judicial.</ClauseText>
        </SubClause>

        <SectionTitle>19. CESSÃO E TRANSFERÊNCIA</SectionTitle>
        <SubClause>
            <ClauseText>19.1. O cliente não pode ceder ou transferir os direitos desta licença a terceiros. Em caso de fusão ou aquisição da empresa do cliente, a Andromeda Solutions deverá ser notificada em até 30 dias para avaliação da continuidade do contrato.</ClauseText>
        </SubClause>

        <SectionTitle>20. VIGÊNCIA ESPECÍFICA PARA TESTE</SectionTitle>
        <SubClause>
            <ClauseText>20.1. A vigência de 10 dias inicia-se no momento exato do registro na plataforma, utilizando o fuso horário de Brasília (GMT-3). O término é automático, e a contagem regressiva será exibida na interface do sistema.</ClauseText>
        </SubClause>
        
        <SectionTitle>21. DISPOSIÇÕES FINAIS COMPLEMENTARES</SectionTitle>
        <SubClause>
            <ClauseText>21.1. Estas cláusulas complementares integram o presente contrato de termos de uso do período de teste gratuito do software NexusPro, não substituindo nem alterando quaisquer disposições já estabelecidas nas cláusulas principais (1 a 20).</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>21.2. Em caso de conflito ou dúvida quanto à interpretação entre quaisquer das cláusulas complementares e as cláusulas principais, prevalecerão as disposições mais específicas relacionadas ao objeto do contrato.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>21.3. A eventual invalidade, nulidade ou inexequibilidade de qualquer disposição destas cláusulas complementares não afetará ou invalidará as demais disposições, que permanecerão em pleno vigor e efeito.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>21.4. Estas cláusulas exercem efeitos imediatos a partir do aceite eletrônico pelo LICENCIADO e têm a mesma validade jurídica das demais disposições contratuais, sendo consideradas parte integrante e inseparável do contrato de licença de uso do período de teste gratuito.</ClauseText>
        </SubClause>
        <SubClause>
            <ClauseText>21.5. A ANDROMEDA SOLUTIONS reserva-se o direito de alterar estas cláusulas complementares a qualquer tempo, mediante comunicação ao LICENCIADO com antecedência mínima de 15 (quinze) dias, sendo que o uso continuado do software após o prazo de comunicação implicará na aceitação das novas condições.</ClauseText>
        </SubClause>

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
                <Label htmlFor="terms" className={cn("text-sm", isContractLoading && 'text-muted-foreground')}>
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
