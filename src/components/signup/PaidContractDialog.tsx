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

interface PaidContractDialogProps {
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
  plan: {
      id: number;
      name: string;
      price: number;
  };
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-sm font-bold mt-6 mb-2 text-foreground uppercase border-b pb-1">{children}</h2>
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

const ContractContent = ({ formData, systemVersion, plan }: { formData: PaidContractDialogProps['formData'], systemVersion: string, plan: PaidContractDialogProps['plan'] }) => {
    const userLimit = plan.id === 3 ? '2' : plan.id === 4 ? '5' : '12';
    const supportChannels = plan.id === 3 ? 'e-mail' : 'WhatsApp e e-mail';
    
    return (
        <div className="space-y-4 text-[11px] text-muted-foreground">
            <p className="font-bold text-center text-sm text-foreground mb-6 uppercase">CONTRATO DE LICENÇA DE USO DE SOFTWARE – PLANO {plan.name.toUpperCase()}</p>
            
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
                <ClauseText>2.1. O presente contrato tem por objeto a concessão de licença de uso temporária, onerosa, não exclusiva, intransferível e revogável, do software NexusPro, nos termos da legislação brasileira aplicável aos programas de computador.</ClauseText>
                <ClauseText>2.2. A licença concedida se limita às funcionalidades, quantidades, integrações, módulos e restrições correspondentes ao Plano {plan.name}, contratado pelo valor de R$ {plan.price.toFixed(2).replace('.', ',')} mensais.</ClauseText>
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
                <SubSectionTitle>3.4. Requisitos recomendados:</SubSectionTitle>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Intel Core i5 (5ª geração) ou AMD Ryzen 5;</li>
                        <li>8 GB RAM;</li>
                        <li>SSD com 20 GB livres;</li>
                        <li>Windows 10/11 (64 bits);</li>
                        <li>Tela Full HD 1920×1080;</li>
                        <li>Internet 20 Mbps;</li>
                        <li>(Opcional) impressora de recibos, impressora de etiquetas, leitor de código de barras e gaveta de dinheiro.</li>
                    </ul>
            </SubClause>

            <SectionTitle>4. FUNCIONALIDADES DO PLANO {plan.name.toUpperCase()}</SectionTitle>
            <SubClause>
                <ClauseText>4.1. O Plano {plan.name} contempla, observados os limites técnicos e comerciais do serviço:</ClauseText>
                <ul className="list-disc pl-5 space-y-1">
                    <li>até {userLimit} usuários simultâneos;</li>
                    <li>controle de crédito com limite e histórico;</li>
                    <li>relatórios avançados;</li>
                    <li>controle de acesso com permissões básicas;</li>
                    <li>treinamento incluso;</li>
                    <li>integração com e-commerce, quando tecnicamente compatível.</li>
                </ul>
            </SubClause>

            <SectionTitle>5. COLETA E TRATAMENTO DE DADOS</SectionTitle>
            <SubClause>
                <ClauseText>5.1. A LICENCIANTE poderá tratar os dados fornecidos no ato da contratação e durante a utilização do sistema, incluindo dados cadastrais do usuário administrador, representantes, colaboradores autorizados e dados empresariais necessários à execução do contrato.</ClauseText>
                <ClauseText>5.2. O tratamento de dados terá como finalidades a operacionalização do sistema, autenticação de usuários, suporte técnico, faturamento, prevenção a fraudes, emissão de documentos fiscais quando aplicável, cumprimento de obrigações legais e execução deste contrato.</ClauseText>
                <ClauseText>5.3. As bases legais aplicáveis incluem, conforme o caso, a execução de contrato ou de procedimentos preliminares relacionados a contrato, nos termos do art. 7º, V, da LGPD, bem como o cumprimento de obrigação legal ou regulatória.</ClauseText>
                <ClauseText>5.4. Os dados serão mantidos enquanto perdurar a relação contratual e, após o seu encerramento, pelo prazo necessário ao cumprimento de obrigações legais, regulatórias, fiscais, probatórias, de segurança e exercício regular de direitos.</ClauseText>
                <ClauseText>5.5. Os servidores e a infraestrutura principal de armazenamento estarão localizados, preferencialmente, na América do Sul, inclusive em São Paulo – SP.</ClauseText>
                <ClauseText>5.6. A LICENCIANTE adotará medidas técnicas e administrativas razoáveis de segurança, incluindo controle de acesso, criptografia de senhas e rotinas de backup.</ClauseText>
            </SubClause>

            <SectionTitle>6. USO PERMITIDO E PROIBIDO</SectionTitle>
            <SubClause>
                <ClauseText>6.1. É permitido ao LICENCIADO utilizar as funcionalidades disponibilizadas no plano contratado para fins legítimos e vinculados à atividade empresarial ou profissional informada no cadastro.</ClauseText>
                <ClauseText>6.2. É vedado ao LICENCIADO: praticar engenharia reversa; utilizar o sistema para atividades ilícitas; compartilhar credenciais de acesso com pessoas não autorizadas ou tentar contornar limites técnicos de segurança.</ClauseText>
                <ClauseText>6.3. O descumprimento desta cláusula poderá acarretar suspensão temporária do acesso e rescisão contratual por justa causa.</ClauseText>
            </SubClause>

            <SectionTitle>7. SUPORTE TÉCNICO</SectionTitle>
            <SubClause>
                <ClauseText>7.1. O suporte do Plano {plan.name} será prestado pelos canais oficiais informados pela LICENCIANTE, incluindo {supportChannels}.</ClauseText>
                <ClauseText>7.2. O prazo estimado de primeira resposta por e-mail será de até 48 horas úteis, considerando o horário de atendimento de segunda a sexta-feira, das 9h às 17h, e sábado, das 9h às 12h.</ClauseText>
                <ClauseText>7.3. A LICENCIANTE poderá disponibilizar base de conhecimento, manuais e vídeos.</ClauseText>
                <ClauseText>7.4. O suporte não abrange problemas decorrentes de uso indevido, falhas em equipamentos do LICENCIADO ou internet instável.</ClauseText>
            </SubClause>

            <SectionTitle>8. POLÍTICA DE COBRANÇA E PAGAMENTO</SectionTitle>
            <SubClause>
                 <ClauseText>8.1. O plano contratado é pré-pago, sendo o acesso ao sistema condicionado à confirmação do pagamento inicial.</ClauseText>
                 <ClauseText>8.2. No primeiro ciclo, poderá ser gerada cobrança proporcional correspondente ao período entre a data da contratação e a data de vencimento escolhida pelo LICENCIADO.</ClauseText>
                 <ClauseText>8.3. Simultaneamente à cobrança proporcional, poderá ser criada a cobrança recorrente mensal no valor integral do plano, com vencimento na data escolhida para os ciclos subsequentes.</ClauseText>
                 <ClauseText>8.4. Os meios de pagamento admitidos incluem boleto bancário e PIX.</ClauseText>
                 <ClauseText>8.5. Os pagamentos poderão ser processados por intermediador terceirizado, inclusive o gateway ASAAS.</ClauseText>
                 <ClauseText>8.6. O valor da mensalidade poderá ser reajustado anualmente com base no IGP-M, mediante aviso prévio de 30 dias.</ClauseText>
                 <ClauseText>8.7. Fórmula de cálculo proporcional: Valor proporcional = (valor do plano / 30) × (dias de uso até o vencimento).</ClauseText>
            </SubClause>

            <SectionTitle>9. DISPONIBILIDADE E MANUTENÇÃO (SLA)</SectionTitle>
            <SubClause>
                <ClauseText>9.1. A LICENCIANTE envidará esforços comercialmente razoáveis para manter disponibilidade mensal de 98% dos serviços em nuvem relacionados ao banco de dados online.</ClauseText>
                <ClauseText>9.2. As manutenções programadas serão comunicadas com antecedência mínima de 24 horas.</ClauseText>
                <ClauseText>9.3. A LICENCIANTE manterá rotina de backup diário, limitada ao backup mais recente tecnicamente disponível.</ClauseText>
            </SubClause>

            <SectionTitle>10. COMUNICAÇÕES</SectionTitle>
            <SubClause>
                <ClauseText>10.1. As comunicações oficiais serão encaminhadas ao e-mail cadastrado pelo LICENCIADO.</ClauseText>
                <ClauseText>10.2. Avisos relativos à assinatura poderão ser enviados pela LICENCIANTE e/ou pelo intermediador de pagamento.</ClauseText>
            </SubClause>
            
            <SectionTitle>11. JURISDIÇÃO E LEGISLAÇÃO</SectionTitle>
            <SubClause>
                <ClauseText>11.1. Este contrato será regido pelas leis da República Federativa do Brasil.</ClauseText>
                <ClauseText>11.2. Fica eleito o foro da Comarca de Machado – MG para dirimir controvérsias oriundas deste contrato.</ClauseText>
            </SubClause>

            <SectionTitle>12. ACEITE ELETRÔNICO</SectionTitle>
            <SubClause>
                <ClauseText>12.1. O LICENCIADO declara ter lido, compreendido e concordado com os termos deste contrato ao realizar o aceite eletrônico.</ClauseText>
                <ClauseText>12.2. O aceite eletrônico será considerado válido e eficaz para todos os fins de direito.</ClauseText>
            </SubClause>

            <SectionTitle>13. DISPONIBILIZAÇÃO OFICIAL DE INSTALADORES</SectionTitle>
            <SubClause>
                <ClauseText>13.1. O instalador do software NexusPro será disponibilizado única e exclusivamente por meio do site oficial www.andromedasolutions.com.br.</ClauseText>
                <ClauseText>13.2. A LICENCIANTE não se responsabiliza por arquivos obtidos por meio de fontes não oficiais.</ClauseText>
            </SubClause>

            <SectionTitle>14. LIMITAÇÃO DE RESPONSABILIDADE</SectionTitle>
            <SubClause>
                <ClauseText>14.1. A responsabilidade da LICENCIANTE ficará limitada aos danos diretos comprovadamente causados, até o limite do valor efetivamente pago pelo LICENCIADO nos 3 (três) meses anteriores ao evento.</ClauseText>
                <ClauseText>14.2. A LICENCIANTE não responderá por lucros cessantes, danos indiretos ou falhas de terceiros.</ClauseText>
            </SubClause>

            <SectionTitle>15. PROPRIEDADE DOS DADOS E PORTABILIDADE</SectionTitle>
            <SubClause>
                <ClauseText>15.1. Os dados inseridos no sistema pelo LICENCIADO permanecem de sua titularidade.</ClauseText>
                <ClauseText>15.2. A LICENCIANTE garantirá a possibilidade de exportação de dados em formato CSV durante a vigência contratual.</ClauseText>
            </SubClause>

            <SectionTitle>17-A. INADIMPLÊNCIA, SUSPENSÃO E RESCISÃO</SectionTitle>
            <SubClause>
                <ClauseText>17-A.1. O não pagamento de qualquer cobrança até o vencimento caracterizará inadimplência.</ClauseText>
                <ClauseText>17-A.2. Em caso de inadimplência superior a 5 (cinco) dias corridos, a LICENCIANTE poderá suspender integralmente o acesso ao sistema.</ClauseText>
                <ClauseText>17-A.3. Permanecendo a inadimplência por 30 (trinta) dias ou mais, o contrato poderá ser rescindido automaticamente por justa causa.</ClauseText>
                <ClauseText>17-A.4. Após a rescisão, o LICENCIADO terá até 30 dias para solicitar a exportação de seus dados.</ClauseText>
                <ClauseText>17-A.5. Decorrido este prazo, os dados poderão ser excluídos definitivamente da base de dados.</ClauseText>
            </SubClause>

            <SectionTitle>20. VIGÊNCIA E ALTERAÇÕES</SectionTitle>
            <SubClause>
                <ClauseText>20.1. O presente contrato entra em vigor na data do aceite eletrônico e permanecerá ativo enquanto houver licença válida.</ClauseText>
                <ClauseText>20.2. A LICENCIANTE poderá atualizar este contrato mediante aviso prévio de 30 (trinta) dias.</ClauseText>
            </SubClause>

            <div className="pt-4 mt-4 border-t">
                <p><strong>Versão do Documento:</strong> {systemVersion}</p>
            </div>
        </div>
    );
};

export const PaidContractDialog: React.FC<PaidContractDialogProps> = ({ isOpen, onOpenChange, onAccept, isLoading, formData, plan }) => {
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
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Contrato de Licença de Uso – Plano {plan.name}</DialogTitle>
          <DialogDescription>
            Leia e confirme os termos de contratação do sistema NexusPro.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] w-full rounded-md border p-8 bg-white dark:bg-slate-950">
            {isContractLoading ? (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="text-sm">Carregando termos contratuais...</span>
                </div>
            ) : (
                <ContractContent formData={formData} systemVersion={systemVersion} plan={plan} />
            )}
        </ScrollArea>
        
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 items-start gap-4 pt-4">
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="terms-paid" 
                    disabled={isLoading || isContractLoading}
                    checked={isAccepted}
                    onCheckedChange={(checked) => setIsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms-paid" className={cn("text-sm font-bold cursor-pointer", isContractLoading && 'text-muted-foreground')}>
                    Li, compreendo e concordo integralmente com todos os termos do contrato de licença.
                </Label>
            </div>
            
            <Button 
                type="button" 
                onClick={onAccept}
                disabled={!isAccepted || isLoading || isContractLoading} 
                className="w-full sm:w-auto h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processando Contratação...</>
              ) : (
                <><Check className="mr-2 h-4 w-4" /> Aceitar e Finalizar Contratação</>
              )}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};