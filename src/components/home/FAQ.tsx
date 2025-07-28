'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Zap } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Como funciona o período de teste grátis?",
      answer: "Você tem 14 dias para testar todas as funcionalidades do NexusPro sem qualquer compromisso. Não cobramos cartão de crédito e você pode cancelar a qualquer momento."
    },
    {
      question: "Como agendar uma demonstração?",
      answer: "Clique no botão 'Agendar Demonstração' no topo da página ou entre em contato pelo telefone (35) 99861-5203. Nossa equipe irá marcar um horário conveniente para você."
    },
    {
      question: "Quais são as formas de pagamento aceitas?",
      answer: "Aceitamos cartões de crédito, débito, PIX e boleto bancário. Para pagamentos anuais, oferecemos 10% de desconto."
    },
    {
      question: "O sistema é compatível com qual versão do Windows?",
      answer: "O NexusPro funciona perfeitamente no Windows 10 ou superior. Também oferecemos uma versão web que pode ser acessada de qualquer navegador."
    },
    {
      question: "Posso alterar meu plano a qualquer momento?",
      answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As alterações são aplicadas no próximo ciclo de cobrança."
    },
    {
      question: "Meus dados ficam seguros na nuvem?",
      answer: "Absolutamente. Utilizamos criptografia de ponta, certificados SSL e fazemos backup automático diário. Seus dados ficam armazenados em servidores seguros no Brasil."
    },
    {
      question: "Preciso de treinamento para usar o sistema?",
      answer: "O NexusPro foi desenvolvido para ser intuitivo, mas oferecemos treinamento gratuito para todos os clientes do plano Profissional. Também temos tutoriais em vídeo e suporte técnico."
    },
    {
      question: "O sistema integra com meu e-commerce?",
      answer: "Sim, no plano Profissional oferecemos integração com as principais plataformas de e-commerce do mercado, sincronizando automaticamente produtos e estoque."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tire suas dúvidas sobre o NexusPro
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-white dark:bg-gray-700 rounded-xl p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Ainda tem dúvidas?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Nossa equipe está pronta para ajudar você a tomar a melhor decisão
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/5535998615203"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>WhatsApp: (35) 99861-5203</span>
            </a>
            <a 
              href="tel:+5535998615203"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
               <span>Ligar Agora</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
