
'use client';

import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import { motion } from 'framer-motion';
import { PartyPopper, Star, Sparkles } from 'lucide-react';

export default function CongratulationsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center overflow-hidden">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mb-8 p-6 bg-blue-100 dark:bg-blue-900/30 rounded-full"
        >
          <PartyPopper className="w-20 h-20 text-blue-600 dark:text-blue-400" />
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold font-headline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
        >
          Parabéns!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl"
        >
          Você encontrou nossa página especial! Estamos muito felizes em ter você aqui explorando o universo da Andromeda Solutions.
        </motion.p>

        <div className="mt-12 flex gap-4">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            >
              {i === 2 ? <Star className="w-8 h-8 text-yellow-400 fill-current" /> : <Sparkles className="w-8 h-8 text-blue-400" />}
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
