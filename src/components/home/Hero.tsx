'use client';

import React, { useState } from 'react';
import { CircleCheckBig, PlayCircle, Star, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import placeholderData from '@/app/lib/placeholder-images.json';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Hero = () => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  // ID do vídeo atualizado conforme solicitado
  const videoId = "yxlD53vXaSw";

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20 pb-32 overflow-hidden border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-center lg:text-left">
            {/* Gatilho de Autoridade/Prova Social no Topo */}
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold">
              <Users className="w-4 h-4" />
              <span>Confiado por mais de 500 empresas no Brasil</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] font-headline tracking-tight">
                Economize até <span className="text-blue-600 dark:text-blue-400">30h por mês</span> na gestão do seu estoque
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0 font-body">
                O NexusPro é o Sistema de Gestão Empresarial para PMEs que automatiza o controle de vendas e estoque, permitindo que você foque no que importa: <strong className="text-gray-900 dark:text-white">vender mais</strong>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2"
              >
                Teste Grátis por 14 Dias
              </Link>
              <button 
                onClick={() => setIsPlayerOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-gray-600 dark:text-gray-300 font-bold hover:text-blue-600 transition-colors px-8 py-5 group"
              >
                <PlayCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Ver Demonstração (60s)
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 border-t pt-8 border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400"><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /></div>
                <span>4.9/5 estrelas</span>
              </div>
              <div className="flex items-center space-x-2">
                <CircleCheckBig className="w-5 h-5 text-green-500" />
                <span>Sem cartão de crédito</span>
              </div>
              <div className="flex items-center space-x-2">
                <CircleCheckBig className="w-5 h-5 text-green-500" />
                <span>Migração Grátis</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-20 blur-3xl rounded-full"></div>
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-2 border border-gray-100 dark:border-gray-700 transform lg:rotate-2 hover:rotate-0 transition-all duration-500">
              <Image 
                src={placeholderData.hero_interface.url}
                alt="Interface do Sistema de Gestão Empresarial NexusPro" 
                className="rounded-xl shadow-lg w-full h-auto"
                width={1200}
                height={800}
                data-ai-hint="software dashboard"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal do Player de Vídeo */}
      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black border-none ring-0">
          <div className="aspect-video w-full">
            {isPlayerOpen && (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Demonstração NexusPro"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Hero;