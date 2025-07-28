import FAQ from '@/components/home/FAQ';
import Features from '@/components/home/Features';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import React from 'react';



function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      
    </div>
  );
}

export default App;