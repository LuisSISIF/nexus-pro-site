
'use client';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">{children}</h2>
);

const SubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
     <h3 className="font-semibold text-xl mt-4 text-gray-800 dark:text-gray-100">{children}</h3>
);

const ClauseText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{children}</p>
);

const SubClause: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="pl-4 mt-4">
        {children}
    </div>
);


const PaidLicensePage = () => {
  const plan = {
      name: "Essencial",
      price: 80,
      features: [
        "Até 2 usuários simultâneos",
        "Controle de Crédito Simples",
        "Relatórios Básicos (vendas, caixa)",
        "Controle de Acesso",
        "Acesso a tutoriais",
        "Suporte via E-mail",
      ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 dark:text-gray-200">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-headline text-center">
            Modelo de Contrato de Licença de Uso – Plano Essencial
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
            Estes são os termos aplicáveis à contratação do Plano {plan.name} do Software NexusPro.
          </p>

          <div className="space-y-6">
            <SectionTitle>1. IDENTIFICAÇÃO DAS PARTES</SectionTitle>
            <SubClause>
                <SubSectionTitle>1.1. LICENCIANTE:</SubSectionTitle>
                <ClauseText><strong>ANDROMEDA SOLUTIONS</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 53.489.502/0001-94, com domicílio fiscal à Rua Varginha, nº 6, Santa Luiza, Machado – MG, CEP 37750-000, e-mail andromedasolutions2025@outlook.com, telefone (35) 99861-5203.</ClauseText>
            </SubClause>
            <SubClause>
                <SubSectionTitle>1.2. LICENCIADO/USUÁRIO:</SubSectionTitle>
                <ClauseText>Pessoa física ou jurídica que aceita estes termos para contratar e utilizar o software NexusPro no Plano Essencial.</ClauseText>
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
                    <SubSectionTitle>3.3. Requisitos Mínimos e Recomendados:</SubSectionTitle>
                    <ClauseText>O LICENCIADO declara estar ciente dos requisitos técnicos para o bom funcionamento do sistema, conforme detalhado no site oficial.</ClauseText>
                </SubClause>


            <SectionTitle>4. FUNCIONALIDADES DO PLANO {plan.name.toUpperCase()}</SectionTitle>
            <SubClause>
                 <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </SubClause>

            <SectionTitle>5. POLÍTICA DE COBRANÇA</SectionTitle>
            <SubClause>
                <ClauseText>
                    5.1. <strong>Pagamento:</strong> O plano é na modalidade pré-paga. O acesso ao sistema é liberado após a confirmação do pagamento inicial.
                </ClauseText>
                <ClauseText>
                    5.2. <strong>Cobrança Proporcional (Pro-Rata):</strong> No primeiro mês, será gerada uma cobrança proporcional pelos dias entre a data da contratação e a data de vencimento escolhida pelo cliente. Esta cobrança tem vencimento imediato.
                </ClauseText>
                <ClauseText>
                    5.3. <strong>Assinatura Mensal:</strong> Simultaneamente à cobrança pro-rata, será criada a assinatura mensal recorrente no valor integral do plano, com o primeiro vencimento na data escolhida pelo cliente para os meses subsequentes.
                </ClauseText>
                <ClauseText>
                    5.4. <strong>Meios de Pagamento:</strong> As cobranças serão geradas via Boleto Bancário ou PIX.
                </ClauseText>
                <ClauseText>
                    5.5. <strong>Intermediação:</strong> Todos os pagamentos são processados e gerenciados pelo gateway de pagamento ASAAS.
                </ClauseText>
                 <ClauseText>
                    5.6. <strong>Reajuste:</strong> O valor da mensalidade poderá ser reajustado anualmente, com base no índice IGP-M ou outro que venha a substituí-lo, mediante aviso prévio de 30 dias.
                </ClauseText>
            </SubClause>
            
            <SectionTitle>6. COLETA E TRATAMENTO DE DADOS</SectionTitle>
            <SubClause>
                <ClauseText>6.1. <strong>Dados Coletados:</strong> Todos os dados informados no ato do cadastro, incluindo dados pessoais do usuário administrador (nome, CPF, etc.) e dados da empresa (CNPJ, endereço, etc.).</ClauseText>
                 <ClauseText>6.2. <strong>Finalidade:</strong> Operacionalização do sistema, faturamento, emissão de documentos fiscais (quando aplicável), suporte técnico e cumprimento de obrigações legais.</ClauseText>
                  <ClauseText>6.3. <strong>Conformidade:</strong> O tratamento de dados segue a nossa <a href="/lgpd" target="_blank" className="text-primary hover:underline">Política de Privacidade e Proteção de Dados (LGPD)</a>, que é parte integrante deste contrato.</ClauseText>
            </SubClause>
            
            <SectionTitle>7. USO PERMITIDO E PROIBIDO</SectionTitle>
             <SubClause>
                <ClauseText>O uso do software deve se limitar às atividades legítimas da empresa. É proibido realizar engenharia reversa, cópia, redistribuição ou qualquer uso que viole a propriedade intelectual da LICENCIANTE ou a legislação vigente.</ClauseText>
            </SubClause>

            <SectionTitle>8. SUPORTE TÉCNICO</SectionTitle>
             <SubClause>
                <ClauseText>O suporte para o Plano Essencial é oferecido via e-mail, com prazo de resposta de até 48 horas úteis, de segunda a sexta, das 09h às 17h, e aos sábados, das 09h às 12h.</ClauseText>
            </SubClause>
            
            <SectionTitle>9. VIGÊNCIA E RESCISÃO</SectionTitle>
            <SubClause>
                <ClauseText>
                    9.1. <strong>Vigência:</strong> Este contrato tem vigência indeterminada, sendo renovado automaticamente a cada mês mediante o pagamento da mensalidade.
                </ClauseText>
                <ClauseText>
                    9.2. <strong>Cancelamento:</strong> O cliente pode solicitar o cancelamento a qualquer momento, sem multas ou taxas de rescisão. O acesso ao sistema permanecerá ativo até o final do período mensal já pago. Não haverá reembolso por períodos não utilizados.
                </ClauseText>
            </SubClause>
            
            <SectionTitle>10. DISPONIBILIDADE (SLA)</SectionTitle>
             <SubClause>
                <ClauseText>A LICENCIANTE garante um uptime (tempo de disponibilidade) de 98% para os serviços em nuvem, exceto em casos de manutenções programadas (com aviso prévio) ou falhas de terceiros.</ClauseText>
            </SubClause>
            
            <SectionTitle>11. COMUNICAÇÕES</SectionTitle>
            <SubClause>
                <ClauseText>Todas as comunicações oficiais serão enviadas para o e-mail comercial cadastrado pelo LICENCIADO.</ClauseText>
            </SubClause>
            
            <SectionTitle>12. JURISDIÇÃO E LEGISLAÇÃO</SectionTitle>
             <SubClause>
                <ClauseText>Este termo é regido pelas leis brasileiras. Fica eleito o foro da Comarca de Machado – MG para dirimir quaisquer controvérsias.</ClauseText>
            </SubClause>
            
            <SectionTitle>13. ASSINATURA DIGITAL E SEGURANÇA</SectionTitle>
             <SubClause>
                <ClauseText>O instalador do NexusPro pode não possuir certificado digital, o que pode gerar alertas de segurança no Windows. A LICENCIANTE garante a integridade e segurança do arquivo baixado do site oficial.</ClauseText>
            </SubClause>

            <SectionTitle>14. LIMITAÇÃO DE RESPONSABILIDADE</SectionTitle>
             <SubClause>
                <ClauseText>A responsabilidade da LICENCIANTE limita-se ao valor pago pelo cliente pela licença no mês do ocorrido. Não nos responsabilizamos por lucros cessantes ou danos indiretos.</ClauseText>
            </SubClause>
            
            <SectionTitle>15. PROPRIEDADE E PORTABILIDADE DE DADOS</SectionTitle>
            <SubClause>
                <ClauseText>Os dados inseridos no sistema são de propriedade do LICENCIADO. Garantimos a possibilidade de exportação dos dados em formato CSV a qualquer momento durante a vigência do contrato.</ClauseText>
            </SubClause>

            <SectionTitle>16. ATUALIZAÇÕES DO SOFTWARE</SectionTitle>
            <SubClause>
                <ClauseText>As atualizações do sistema são automáticas e obrigatórias para garantir a segurança e o bom funcionamento da plataforma.</ClauseText>
            </SubClause>
            
            <SectionTitle>17. POLÍTICA DE CANCELAMENTO</SectionTitle>
             <SubClause>
                <ClauseText>O cancelamento pode ser solicitado a qualquer momento via canais de suporte. O acesso será mantido até o fim do ciclo de faturamento vigente, e os dados ficarão disponíveis para exportação por 30 dias após o término.</ClauseText>
            </SubClause>
            
            <SectionTitle>18. RESOLUÇÃO DE DISPUTAS</SectionTitle>
            <SubClause>
                <ClauseText>As partes se comprometem a tentar resolver qualquer disputa de forma amigável antes de recorrer à via judicial.</ClauseText>
            </SubClause>

            <SectionTitle>19. CESSÃO E TRANSFERÊNCIA</SectionTitle>
            <SubClause>
                <ClauseText>O LICENCIADO não pode ceder ou transferir os direitos desta licença a terceiros sem o consentimento prévio e por escrito da LICENCIANTE.</ClauseText>
            </SubClause>
            
            <SectionTitle>20. VIGÊNCIA E ALTERAÇÕES</SectionTitle>
             <SubClause>
                <ClauseText>O contrato entra em vigor na data do aceite eletrônico e permanece ativo enquanto as mensalidades estiverem em dia. A LICENCIANTE pode alterar os termos mediante aviso prévio de 30 dias.</ClauseText>
            </SubClause>

            <SectionTitle>21. ACEITE ELETRÔNICO</SectionTitle>
            <SubClause>
                <ClauseText>
                    O LICENCIADO declara ter lido, compreendido e concordado com todos os termos e condições aqui estabelecidos ao marcar a caixa de seleção de aceite durante o processo de contratação. Este aceite eletrônico, registrado por endereço de IP, data e hora, possui plena validade jurídica.
                </ClauseText>
            </SubClause>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaidLicensePage;

    