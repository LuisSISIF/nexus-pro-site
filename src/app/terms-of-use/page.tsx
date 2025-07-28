import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import React from 'react';

const TermsOfUsePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 dark:text-gray-200">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-headline">
            Termos de Licença de Uso do Sistema NexusPro
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Última atualização: 24 de julho de 2024
          </p>

          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
              Bem-vindo ao <strong>NexusPro</strong>! Antes de utilizar nosso sistema, é fundamental que você leia e compreenda os termos abaixo. Ao instalar, acessar ou utilizar o sistema, você concorda integralmente com os termos aqui descritos. Caso não concorde, por favor, não prossiga com a instalação ou uso.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. Licença de Uso</h2>
              <p>
                O NexusPro é licenciado, não vendido. A <strong>Andromeda Solutions</strong>, detentora de todos os direitos autorais, concede a você (o "cliente") uma licença limitada, não exclusiva, intransferível e revogável para utilizar o sistema, estritamente de acordo com os seguintes termos:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                <li>A licença é válida exclusivamente para o CNPJ/empresa contratante e não pode ser sublicenciada.</li>
                <li>O sistema pode ser instalado em múltiplas máquinas dentro da mesma empresa, desde que os limites de usuários e outros termos do plano contratado sejam respeitados.</li>
                <li>O uso do sistema destina-se unicamente às atividades comerciais internas da empresa cliente.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Propriedade Intelectual</h2>
              <p>
                Todo o conteúdo, estrutura, design, código-fonte, logotipos e funcionalidades do NexusPro são de propriedade intelectual exclusiva da Andromeda Solutions e protegidos pelas leis de direitos autorais. É estritamente proibido:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                <li>Realizar engenharia reversa, descompilar, desmontar ou tentar descobrir o código-fonte do sistema.</li>
                <li>Reproduzir, copiar, modificar ou redistribuir o sistema, total ou parcialmente, sem nossa autorização prévia e por escrito.</li>
                <li>Comercializar, alugar, arrendar ou ceder o sistema a terceiros.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. Atualizações e Suporte Técnico</h2>
              <p>
                O NexusPro está em constante evolução. Poderemos fornecer atualizações que incluem melhorias, correções de bugs e novos recursos. O acesso a essas atualizações pode depender do plano contratado. O suporte técnico é um benefício exclusivo para clientes com contrato ativo e deve ser solicitado através dos nossos canais oficiais.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Limitação de Responsabilidade</h2>
              <p>
                A Andromeda Solutions não se responsabiliza por quaisquer danos diretos, indiretos, incidentais, consequenciais ou especiais decorrentes do uso ou da incapacidade de uso do NexusPro. Isso inclui, mas não se limita a, perda de lucros, interrupção de negócios, perda de dados ou falhas operacionais. A responsabilidade da Andromeda Solutions limita-se ao valor pago pelo cliente pela licença.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">5. Privacidade e Segurança de Dados</h2>
              <p>
                Todos os dados inseridos e processados no NexusPro são de propriedade e responsabilidade do cliente. A Andromeda Solutions adota as melhores práticas de segurança para proteger a infraestrutura do sistema, mas não acessa, utiliza ou compartilha os dados dos seus clientes, exceto quando necessário para prestar suporte técnico (com sua permissão) ou se exigido por lei. Para mais detalhes, consulte nossa <a href="/privacy-policy" className="text-blue-500 hover:underline">Política de Privacidade</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">6. Rescisão da Licença</h2>
              <p>
                A violação de qualquer um dos termos aqui descritos resultará na revogação imediata e automática da sua licença de uso, sem prejuízo de eventuais sanções legais e contratuais cabíveis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">7. Disposições Gerais</h2>
              <ul className="list-disc list-inside mt-2 space-y-2 pl-4">
                <li>Estes termos podem ser atualizados periodicamente. Manteremos a versão mais recente disponível em nosso site. O uso contínuo do sistema após qualquer alteração constitui sua aceitação dos novos termos.</li>
                <li>Este acordo é regido pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de Machado, MG, para dirimir quaisquer controvérsias decorrentes deste contrato, com renúncia a qualquer outro, por mais privilegiado que seja.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">8. Contato</h2>
              <p>
                Para qualquer dúvida sobre estes termos, entre em contato conosco.
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

export default TermsOfUsePage;
