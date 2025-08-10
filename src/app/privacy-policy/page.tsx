import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 dark:text-gray-200">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-headline">
            Política de Privacidade
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Última atualização: 29 de julho de 2024
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. Nosso Compromisso</h2>
              <p>
                A Andromeda Solutions ("nós", "nosso"), desenvolvedora do sistema NexusPro, está comprometida em proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nosso site e nosso sistema. Ao usar nossos serviços, você concorda com a coleta e uso de informações de acordo com esta política.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Coleta de Informações</h2>
              <p>
                Coletamos informações que você nos fornece diretamente, como quando você se cadastra para um teste, contrata um plano ou entra em contato com o suporte. As informações podem incluir:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Nome, e-mail, telefone e informações de contato.</li>
                <li>Nome da empresa e detalhes relacionados ao seu negócio.</li>
                <li>Dados de pagamento e faturamento.</li>
                <li>Informações que você envia através dos nossos canais de suporte.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. Uso das Informações</h2>
              <p>
                As informações que coletamos são usadas para:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Fornecer, operar e manter nosso sistema NexusPro.</li>
                <li>Melhorar, personalizar e expandir nossos serviços.</li>
                <li>Entender e analisar como você utiliza nosso sistema.</li>
                <li>Processar suas transações e gerenciar seus pedidos.</li>
                <li>Comunicar com você, seja para atendimento ao cliente, para fornecer atualizações e outras informações sobre o serviço.</li>
                <li>Prevenir fraudes e garantir a segurança.</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Compartilhamento de Informações</h2>
              <p>
                Nós não vendemos, comercializamos ou alugamos suas informações de identificação pessoal para terceiros. Podemos compartilhar informações com prestadores de serviços terceirizados que nos ajudam a operar nosso negócio (como processadores de pagamento e provedores de hospedagem), desde que essas partes concordem em manter as informações confidenciais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">5. Segurança dos Dados</h2>
              <p>
                A segurança de suas informações é uma prioridade. Empregamos uma variedade de medidas de segurança, como criptografia e servidores seguros, para manter a segurança de suas informações pessoais. No entanto, nenhum método de transmissão pela Internet ou de armazenamento eletrônico é 100% seguro.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">6. Seus Direitos</h2>
              <p>
                Em conformidade com a legislação aplicável, você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre em contato conosco. Para mais detalhes sobre seus direitos de proteção de dados, consulte nossa <a href="/lgpd" className="text-blue-500 hover:underline">página da LGPD</a>.
              </p>
            </section>

             <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">7. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco:
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

export default PrivacyPolicyPage;
