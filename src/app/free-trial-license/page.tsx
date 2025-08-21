
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
            Exemplo de Contrato de Licença de Uso
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center">
            Modelo de Termos de Uso – Plano {plan.name} para o Software NexusPro
          </p>

          <div className="space-y-6">
            <SectionTitle>1. PARTES CONTRATANTES</SectionTitle>
            <SubClause>
                <SubSectionTitle>1.1. LICENCIANTE:</SubSectionTitle>
                <ClauseText><strong>ANDROMEDA SOLUTIONS</strong>, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 53.489.502/0001-94, com domicílio fiscal à Rua Varginha, nº 6, Santa Luiza, Machado – MG, CEP 37750-000, e-mail andromedasolutions2025@outlook.com, telefone (35) 99861-5203.</ClauseText>
            </SubClause>
            <SubClause>
                <SubSectionTitle>1.2. LICENCIADO/USUÁRIO:</SubSectionTitle>
                <ClauseText>Pessoa física ou jurídica que aceita estes termos para contratar e utilizar o software NexusPro.</ClauseText>
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
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    {plan.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </SubClause>

            <SectionTitle>4. POLÍTICA DE COBRANÇA</SectionTitle>
            <SubClause>
                <ClauseText>
                    4.1. <strong>Pagamento:</strong> O plano é na modalidade pré-paga. O acesso ao sistema é liberado após a confirmação do pagamento inicial.
                </ClauseText>
                <ClauseText>
                    4.2. <strong>Cobrança Proporcional (Pro-Rata):</strong> No primeiro mês, será gerada uma cobrança proporcional pelos dias entre a data da contratação e a data de vencimento escolhida pelo cliente. Esta cobrança tem vencimento imediato.
                </ClauseText>
                <ClauseText>
                    4.3. <strong>Assinatura Mensal:</strong> Simultaneamente à cobrança pro-rata, será criada a assinatura mensal recorrente no valor integral do plano, com o primeiro vencimento na data escolhida pelo cliente para os meses subsequentes.
                </ClauseText>
                <ClauseText>
                    4.4. <strong>Meios de Pagamento:</strong> As cobranças serão geradas via Boleto Bancário ou PIX.
                </ClauseText>
                <ClauseText>
                    4.5. <strong>Intermediação:</strong> Todos os pagamentos são processados e gerenciados pelo gateway de pagamento ASAAS.
                </ClauseText>
            </SubClause>

            <SectionTitle>5. VIGÊNCIA E RESCISÃO</SectionTitle>
            <SubClause>
                <ClauseText>
                    5.1. <strong>Vigência:</strong> Este contrato tem vigência indeterminada, sendo renovado automaticamente a cada mês mediante o pagamento da mensalidade.
                </ClauseText>
                <ClauseText>
                    5.2. <strong>Cancelamento:</strong> O cliente pode solicitar o cancelamento a qualquer momento, sem multas ou taxas de rescisão. O acesso ao sistema permanecerá ativo até o final do período mensal já pago. Não haverá reembolso por períodos não utilizados.
                </ClauseText>
            </SubClause>

            <SectionTitle>6. OBRIGAÇÕES, RESPONSABILIDADES E DISPOSIÇÕES GERAIS</SectionTitle>
             <SubClause>
                <ClauseText>
                    6.1. As demais cláusulas sobre propriedade intelectual, uso permitido e proibido do software, tratamento de dados (LGPD), níveis de serviço (SLA), suporte técnico e foro seguem o disposto em nossos <a href="/terms-of-use" target="_blank" className="text-primary hover:underline">Termos de Uso</a> e <a href="/privacy-policy" target="_blank" className="text-primary hover:underline">Política de Privacidade</a>, que são partes integrantes deste contrato.
                </ClauseText>
            </SubClause>

            <SectionTitle>7. ACEITE ELETRÔNICO</SectionTitle>
            <SubClause>
                <ClauseText>
                    7.1. O LICENCIADO declara ter lido, compreendido e concordado com todos os termos e condições aqui estabelecidos ao marcar a caixa de seleção de aceite durante o processo de contratação. Este aceite eletrônico, registrado por endereço de IP, data e hora, possui plena validade jurídica.
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
