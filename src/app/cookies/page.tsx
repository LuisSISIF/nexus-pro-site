'use client';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import React from 'react';
import AnimatedSection from '@/components/home/AnimatedSection';

const CookiesPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-gray-800 dark:text-gray-200">
        <AnimatedSection>
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-headline">
            Política de Cookies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Última atualização: 09 de agosto de 2025
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">1. O que são cookies?</h2>
              <p>
                Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem, ou funcionarem de forma mais eficiente, bem como para fornecer informações aos proprietários do site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">2. Como usamos cookies?</h2>
              <p>
                Usamos cookies para várias finalidades, incluindo:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento do site, permitindo que você navegue e use nossas funcionalidades, como o acesso a áreas seguras.</li>
                <li><strong>Cookies de Desempenho e Análise:</strong> Coletam informações sobre como os visitantes usam nosso site, por exemplo, quais páginas são mais visitadas. Esses dados nos ajudam a otimizar o site e a melhorar sua experiência.</li>
                <li><strong>Cookies de Funcionalidade:</strong> Permitem que o site se lembre das escolhas que você faz (como seu nome de usuário, idioma ou a região em que você está) e forneça recursos aprimorados e mais pessoais.</li>
                <li><strong>Cookies de Marketing:</strong> São usados para fornecer anúncios mais relevantes para você e seus interesses. Eles também são usados para limitar o número de vezes que você vê um anúncio, bem como ajudar a medir a eficácia da campanha publicitária.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">3. Gerenciando suas preferências de cookies</h2>
              <p>
                A maioria dos navegadores permite que você controle os cookies através de suas configurações. Você pode configurar seu navegador para recusar todos os cookies ou para indicar quando um cookie está sendo enviado. No entanto, se você não aceitar cookies, talvez não consiga usar algumas partes do nosso Serviço.
              </p>
               <p className="mt-2">
                Para saber mais sobre como gerenciar cookies em navegadores populares, visite os links abaixo:
              </p>
               <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Microsoft Edge</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Safari</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">4. Alterações nesta Política de Cookies</h2>
              <p>
                Podemos atualizar nossa Política de Cookies de tempos em tempos. Aconselhamos que você revise esta página periodicamente para quaisquer alterações. Notificaremos sobre quaisquer alterações, publicando a nova Política de Cookies nesta página.
              </p>
            </section>

             <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">5. Contato</h2>
              <p>
                Se você tiver alguma dúvida sobre esta Política de Cookies, entre em contato conosco:
              </p>
              <p className="mt-2">
                <strong>Andromeda Solutions</strong><br />
                E-mail: <a href="mailto:andromedasolutions2025@hotmail.com" className="text-blue-500 hover:underline">andromedasolutions2025@hotmail.com</a>
              </p>
            </section>
          </div>
        </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPage;
