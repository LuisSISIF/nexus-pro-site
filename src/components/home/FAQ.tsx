'use client'
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona o período de teste grátis?",
      answer: "Você tem 14 dias para testar todas as funcionalidades do NexusPro sem qualquer compromisso. Não cobramos cartão de crédito e você pode cancelar a qualquer momento."
    },
    {
      question: "Como agendar uma demonstração?",
      answer: "É muito simples! Clique no botão 'Agendar Demonstração' em nossa página inicial ou entre em contato diretamente pelo WhatsApp. Nossa equipe irá marcar um horário conveniente para você."
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
      answer: "O NexusPro foi desenvolvido para ser intuitivo, mas oferecemos treinamento gratuito para todos os clientes do plano Profissional e Empresarial. Também temos tutoriais em vídeo e suporte técnico."
    },
    {
      question: "O sistema integra com meu e-commerce?",
      answer: "Sim, no plano Profissional e Empresarial oferecemos integração com as principais plataformas de e-commerce do mercado, sincronizando automaticamente produtos e estoque."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tire suas dúvidas sobre o NexusPro
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-4">
              <AccordionTrigger className="w-full px-6 py-4 text-left text-lg font-semibold text-gray-900 dark:text-white pr-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
