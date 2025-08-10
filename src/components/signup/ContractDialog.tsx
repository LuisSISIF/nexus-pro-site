
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

interface ContractDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAccept: () => void;
  isLoading: boolean;
  formData: RegistrationFormValues;
}

export const ContractDialog: React.FC<ContractDialogProps> = ({ isOpen, onOpenChange, onAccept, isLoading, formData }) => {
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [contractText, setContractText] = useState('Carregando contrato...');
  const [isContractLoading, setIsContractLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el) {
      // Use Math.ceil para evitar problemas de arredondamento com valores de pixel
      const isAtBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
      if (isAtBottom) {
        setHasScrolledToEnd(true);
      }
    }
  };

  useEffect(() => {
    const fetchContractData = async () => {
      if (isOpen) {
        setIsContractLoading(true);
        const versionResult = await getSystemVersion();
        const systemVersion = versionResult.success ? versionResult.version : '[Versão não disponível]';

        setContractText(`
Termos de Uso – Período de Teste Gratuito (14 dias)
Software NexusPro

1. Identificação das Partes
Licenciante:
ANDROMEDA SOLUTIONS, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 53.489.502/0001-94, com domicílio fiscal à Rua Varginha, nº 6, Santa Luiza, Machado – MG, CEP 37750-000 (endereço residencial do representante legal, visto que a empresa não possui sede comercial), neste ato representada por seu CEO Luís Henrique Freire de Lima, brasileiro, e-mail andromedasolutions2025@outlook.com, telefone (35) 99861-5203.

Licenciado/Usuário:
Pessoa física ou jurídica que aceita estes termos para uso do NexusPro no período de teste gratuito.
Nome: ${formData.fullName}
CPF: ${formData.cpf}
Empresa: ${formData.companyName}

2. Objeto
Concessão de licença temporária, não exclusiva e intransferível de uso do software NexusPro, plataforma de gerenciamento e automação de estoque, vendas, finanças, controle de clientes e crédito para comércios de varejo em geral, pelo prazo de 14 (quatorze) dias corridos, iniciando-se no primeiro acesso.

3. Descrição técnica
a) Categoria: ERP especializado para gestão de varejo, com recursos de vendas, estoque, financeiro e relatórios integrados.
b) Implementação: instalação local + banco de dados em servidor na nuvem + plataforma web para controle financeiro.
c) Requisitos mínimos:
Processador Intel Core i3 ou AMD equivalente
4 GB RAM
10 GB livres no HD/SSD
Windows 10 (64 bits)
Tela 1366×768
Internet 5 Mbps
(Opcional) impressora de recibos, etiquetas; leitor de código de barras
d) Requisitos recomendados:
Intel Core i5 (8ª geração) ou AMD Ryzen 5
8 GB RAM
SSD 20 GB livres
Windows 10/11 (64 bits)
Tela Full HD 1920×1080
Internet 20 Mbps
(Opcional) impressora de recibos, etiquetas; leitor de código de barras; gaveta de dinheiro

4. Limitações do plano de teste
Até 2 usuários simultâneos.
Controle de apenas 1 loja.
14 dias a contar do cadastro.
Impressão de cupom não fiscal indisponível (CNPJ cliente não coletado).
Demonstração de crediário limitada a 1 cliente.
Suporte via e-mail (retorno em 24–48 h; seg–sex 9h–17h, sáb 9h–12h).

5. Coleta e tratamento de dados
Dados coletados: nome, CPF, e-mail, telefone, sexo, login e senha de administrador; nome, atividade principal e endereço da empresa.
Finalidade: operacional para uso básico, cadastro de produtos, vendas, estoque, financeiro, funcionários e relatórios; sincronização e backup remoto para bancos online.
Base legal:
Execução de contrato (LGPD art. 7º, V)
Cumprimento de obrigação legal (emissão de NF-e)
Retenção: 30 dias pós-teste para migração, depois exclusão.
Localização dos servidores: América do Sul (São Paulo – SP).
Segurança: criptografia de senhas; controle de acesso e permissões; credenciais no banco de dados.
Exercício de direitos: solicitação via e-mail/suporte para acesso, correção ou exclusão.

6. Uso permitido e proibido
Permitido: avaliação das funcionalidades conforme limitações acima.
Proibido:
Engenharia reversa, descompilação, cópia ou redistribuição sem autorização.
Atividades ilícitas ou violação de leis.
Compartilhamento de credenciais.
Hospedagem de dados não relacionados à operação legítima.
Consequências: suspensão temporária ou rescisão sem reembolso; medidas legais cabíveis.

7. Suporte técnico
Canais: e-mail, WhatsApp/chat, telefone (seg–sex 8h–18h, exceto feriados).
Tempo de resposta: e-mail até 48 h úteis; chat/WhatsApp até 2 h úteis (planos pagos); telefone imediato (planos pagos).
Limitações no teste: dúvidas de instalação/configuração inicial apenas.
Documentação: guia rápido, PDFs e vídeos.

8. Transição para plano pago
Planos pagos:
Essencial (vendas, estoque, financeiro): R$ 80,00/mês
Profissional (+ relatórios avançados, integrações): R$ 120,00/mês
Empresarial (+ personalizações, suporte prioritário, multiunidade): R$ 190,00/mês
Dados do teste mantidos integralmente; contratação sem reinstalação.
Backup diário em nuvem; checagem de integridade após ativação.
Ofertas especiais conforme campanhas vigentes.

9. Disponibilidade e manutenção
Uptime banco online: ≥ 98%, salvo manutenções ou eventos de provedor.
Manutenções programadas: aviso prévio de 24 h, geralmente 22h–5h.
Backup diário: restauração a partir do backup mais recente.

10. Comunicações
E-mail oficial: cadastrado pelo cliente no início do teste.
Aviso de término: e-mail e mensagem no sistema com ≥ 3 dias de antecedência.
Alterações nos termos: aviso com ≥ 15 dias.
Suporte técnico: e-mail ou telefone conforme horários acima.

11. Jurisdição e legislação
Este termo é regido pelas leis brasileiras. Fica eleito o foro da Comarca de Machado – MG para dirimir quaisquer controvérsias, com exclusão de qualquer outro.

12. Aceite eletrônico
O usuário declara que leu e aceitou estes termos ao marcar a opção “Li e aceito os termos de uso” no sistema. O sistema registra data, hora e usuário para comprovação. Este aceite possui validade jurídica equiparada à assinatura manuscrita, nos termos da MP 2.200-2/2001.

13. ASSINATURA DIGITAL E VERIFICAÇÕES DE SEGURANÇA
13.1. Instalador sem Certificado Digital:
Devido ao recente lançamento do NexusPro, o instalador disponibilizado para download não contém certificado de assinatura digital emitido por autoridade certificadora. Consequentemente, sistemas operacionais como o Windows poderão exibir alertas de “aplicativo possivelmente perigoso” ou “fornecedor não reconhecido” ao executar o instalador.

13.2. Garantia de Integridade e Segurança:
Apesar da ausência de assinatura digital, todo pacote de instalação baixado diretamente do site oficial da Andromeda Solutions passa por rigorosos processos de:
Verificação de integridade (hash de arquivos)
Análise anti-malware automatizada
Testes de risco em ambiente controlado
Essas medidas asseguram que o instalador esteja livre de softwares maliciosos e que os dados do cliente sejam protegidos em todas as etapas de instalação e uso do sistema.
Observação: recomenda-se executar o instalador apenas a partir do site oficial (https://www.andromedasolutions.com.br) e manter o antivírus atualizado para evitar alertas ou bloqueios indevidos.

Data de vigência: 09/08/2025
Versão: ${systemVersion}
Documento gerado eletronicamente pela Andromeda Solutions.
`);
        setIsContractLoading(false);
      }
    };

    fetchContractData();
  }, [isOpen, formData]);


  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setHasScrolledToEnd(false);
      setIsAccepted(false);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Termos de Uso – Período de Teste Gratuito</DialogTitle>
          <DialogDescription>
            Leia atentamente o contrato de licença. Você precisa rolar até o final para poder aceitar os termos.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-96 w-full rounded-md border p-4" onScroll={handleScroll} ref={scrollRef}>
            {isContractLoading ? (
                 <div className="flex items-center justify-center h-full">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    <span>Carregando contrato...</span>
                </div>
            ) : (
                <pre className="text-xs whitespace-pre-wrap font-sans">{contractText}</pre>
            )}
        </ScrollArea>
        
        <DialogFooter className="flex-col sm:flex-col sm:space-x-0 items-start gap-4">
            <div className="flex items-center space-x-2">
                <Checkbox 
                    id="terms" 
                    disabled={!hasScrolledToEnd || isLoading || isContractLoading}
                    checked={isAccepted}
                    onCheckedChange={(checked) => setIsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms" className={!hasScrolledToEnd ? 'text-muted-foreground' : ''}>
                    Li e aceito os termos de uso
                </Label>
            </div>
            {!hasScrolledToEnd && !isContractLoading && (
                <p className="text-xs text-yellow-600">Role até o final do contrato para habilitar o aceite.</p>
            )}

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
