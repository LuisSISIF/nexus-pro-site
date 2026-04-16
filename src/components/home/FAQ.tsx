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
      question: "O NexusPro é um Sistema de Gestão Empresarial para PMEs Brasil?",
      answer: "Sim, o NexusPro é um software de gestão empresarial completo desenvolvido especificamente para as necessidades operacionais de Pequenas e Médias Empresas no Brasil."
    },
    {
      question: "Como funciona o período de teste grátis de 14 dias?",
      answer: "Você terá acesso total a todas as funcionalidades do plano Profissional por 14 dias. Não pedimos cartão de crédito no cadastro. É uma cortesia para você comprovar a economia de tempo e eficiência do sistema antes de qualquer compromisso financeiro."
    },
    {
      question: "Como funciona a conexão do sistema com a nuvem?",
      answer: "O NexusPro opera com sincronização em tempo real com servidores de alta disponibilidade. Isso garante que seus dados estejam sempre seguros, com backups automáticos e acessíveis de onde você estiver, exigindo uma conexão ativa com a internet para garantir a integridade total das informações."
    },
    {
      question: "Quais as formas de pagamento para os planos pagos?",
      answer: "As formas de pagamento aceitas são PIX ou Boleto Bancário. Pagamentos anuais possuem 10% de desconto adicional."
    },
    {
      question: "Preciso pagar taxa de implantação ou setup?",
      answer: "Não! No NexusPro não cobramos taxa de setup. A implantação e o treinamento inicial básico são gratuitos para ajudar você a começar a lucrar e organizar sua empresa o quanto antes."
    },
    {
      question: "Como é oferecido o suporte técnico?",
      answer: "Oferecemos suporte humanizado via WhatsApp, E-mail e, dependendo do plano, através de Acesso Remoto. Nosso time de especialistas está pronto para resolver suas dúvidas em horário comercial de forma ágil."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-headline">
            Dúvidas Frequentes sobre o NexusPro
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tudo o que você precisa saber antes de transformar sua gestão.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="bg-white dark:bg-gray-700 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-600 overflow-hidden px-6">
              <AccordionTrigger className="text-left text-lg font-bold py-6 hover:no-underline text-gray-900 dark:text-white">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Rich Snippet Content Placeholder */}
        <div className="mt-20 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/50">
            <h4 className="font-bold mb-4">Ainda tem dúvidas?</h4>
            <p className="text-sm text-gray-500 mb-6">Nosso time comercial está disponível para uma consultoria gratuita de 15 minutos sobre como o NexusPro se adapta ao seu negócio.</p>
            <a href="https://wa.me/5535998615203" target="_blank" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold inline-block hover:bg-blue-700 transition-colors">Falar com Consultor</a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
