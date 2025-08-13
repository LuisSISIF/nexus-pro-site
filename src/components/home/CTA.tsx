'use client';

import React from 'react';
import { Rocket, Calendar } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
    return (
        <section id="cta" className="bg-white dark:bg-gray-900 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-headline mb-4">
                    Pronto para Simplificar sua Gestão?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                    Junte-se a centenas de empresas que já estão economizando tempo e vendendo mais com o NexusPro.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/signup"
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        <Rocket className="w-5 h-5"/>
                        Quero meu Teste Gratuito
                    </Link>
                    <a
                        href="https://wa.me/5535998615203"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center space-x-2 border-2 border-blue-600 dark:border-blue-400"
                    >
                        <Calendar className="w-5 h-5" />
                        <span>Agendar uma Demonstração</span>
                    </a>
                </div>
                 <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">Teste grátis por 10 dias • Sem cartão de crédito • Cancele quando quiser</p>
            </div>
        </section>
    )
}

export default CTA;
