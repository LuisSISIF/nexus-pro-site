import { LifeBuoy, Mail, Phone } from 'lucide-react';
import React from 'react';


const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 4.971 4.971z" />
    </svg>
  );


const Support = () => {
    return (
        <section id="support" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
                        <LifeBuoy className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                        Suporte Dedicado
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Estamos aqui para ajudar você em cada etapa.
                    </p>
                </div>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Central de Ajuda</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Acesse nossa base de conhecimento com tutoriais em vídeo, guias passo a passo e respostas para as perguntas mais comuns.
                        </p>
                        <a 
                            href="/#faq"
                            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                        >
                            Acessar FAQ &rarr;
                        </a>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-sm border border-gray-200 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Fale Conosco</h3>
                         <div className="space-y-4">
                            <a href="https://wa.me/5535998615203" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <WhatsAppIcon className="w-6 h-6 text-green-500" />
                                <div>
                                    <p className="font-semibold">WhatsApp</p>
                                    <p className="text-sm">(35) 99861-5203</p>
                                </div>
                            </a>
                            <a href="mailto:andromedasolutions2025@hotmail.com" className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Mail className="w-6 h-6 text-blue-500" />
                                <div>
                                    <p className="font-semibold">E-mail</p>
                                    <p className="text-sm">andromedasolutions2025@hotmail.com</p>
                                </div>
                            </a>
                             <a href="tel:+5535998615203" className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <Phone className="w-6 h-6 text-blue-500" />
                                <div>
                                    <p className="font-semibold">Telefone</p>
                                    <p className="text-sm">(35) 99861-5203</p>
                                </div>
                            </a>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Support;
