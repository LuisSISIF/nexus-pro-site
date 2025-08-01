import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import React from 'react';

const LgpdPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 dark:text-gray-200">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-headline">
            Política de Privacidade e Proteção de Dados (LGPD)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Última atualização: 24 de julho de 2024
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. Introdução</h2>
              <p>
                A Andromeda Solutions, desenvolvedora do sistema NexusPro, preza pela sua privacidade e pela proteção dos seus dados. Esta política descreve como coletamos, usamos, compartilhamos e protegemos suas informações pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Quais dados coletamos?</h2>
              <p>
                Coletamos informações que você nos fornece diretamente ao se cadastrar para o teste grátis, contratar um plano ou entrar em contato com o suporte:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Dados de Identificação:</strong> Nome completo, e-mail, telefone, CPF/CNPJ.</li>
                <li><strong>Dados da Empresa:</strong> Nome da empresa, endereço, segmento de atuação.</li>
                <li><strong>Dados de Pagamento:</strong> Informações de cartão de crédito ou dados para faturamento (processados por parceiros seguros).</li>
                <li><strong>Dados de Uso do Sistema:</strong> Informações sobre como você utiliza o NexusPro, como funcionalidades acessadas e volume de dados processados (vendas, estoque, etc.), para fins de melhoria do serviço.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. Como usamos seus dados?</h2>
              <p>
                Utilizamos seus dados para:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Prestar, manter e melhorar o sistema NexusPro.</li>
                <li>Processar transações e enviar informações de faturamento.</li>
                <li>Enviar comunicações sobre o serviço, como atualizações, alertas de segurança e mensagens de suporte.</li>
                <li>Personalizar sua experiência e oferecer suporte técnico.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Com quem compartilhamos seus dados?</h2>
              <p>
                A Andromeda Solutions não vende suas informações pessoais. Podemos compartilhar seus dados com:
              </p>
               <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Provedores de Serviço:</strong> Empresas que nos auxiliam na operação, como provedores de hospedagem em nuvem (servidores seguros no Brasil) e processadores de pagamento.</li>
                <li><strong>Integrações:</strong> Caso opte por integrar o NexusPro com outras plataformas (e-commerce, etc.), compartilharemos os dados necessários para a sincronização.</li>
                <li><strong>Requisição Legal:</strong> Se formos obrigados por lei ou por ordem judicial.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">5. Seus Direitos como Titular dos Dados</h2>
              <p>
                Você tem o direito de solicitar a qualquer momento:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>A confirmação da existência de tratamento de seus dados.</li>
                <li>O acesso aos seus dados.</li>
                <li>A correção de dados incompletos, inexatos ou desatualizados.</li>
                <li>A anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
                <li>A portabilidade dos seus dados a outro fornecedor de serviço.</li>
                <li>A eliminação dos dados tratados com o seu consentimento.</li>
                <li>Informações sobre com quem compartilhamos seus dados.</li>
              </ul>
              <p className="mt-2">
                Para exercer seus direitos, entre em contato conosco pelo e-mail: <a href="mailto:andromedasolutions2025@hotmail.com" className="text-blue-500 hover:underline">andromedasolutions2025@hotmail.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">6. Segurança dos Dados</h2>
              <p>
                Adotamos medidas de segurança técnicas e administrativas para proteger seus dados, incluindo criptografia, certificados SSL, controle de acesso e backups automáticos diários.
              </p>
            </section>

             <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">7. Contato</h2>
              <p>
                Se tiver qualquer dúvida sobre esta política ou sobre como tratamos seus dados, entre em contato:
              </p>
              <p className="mt-2">
                <strong>Andromeda Solutions</strong><br />
                E-mail: <a href="mailto:andromedasolutions2025@hotmail.com" className="text-blue-500 hover:underline">andromedasolutions2025@hotmail.com</a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LgpdPage;
