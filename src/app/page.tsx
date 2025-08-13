import FAQ from '@/components/home/FAQ';
import Features from '@/components/home/Features';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Pricing from '@/components/home/Pricing';
import Support from '@/components/home/Support';
import Testimonials from '@/components/home/Testimonials';
import AnimatedSection from '@/components/home/AnimatedSection';
import React from 'react';
import { BackToTopButton } from '@/components/home/BackToTopButton';
import CTA from '@/components/home/CTA';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      <Header />
      <Hero />
      <AnimatedSection>
        <Features />
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials />
      </AnimatedSection>
      <AnimatedSection>
        <Pricing />
      </AnimatedSection>
      <AnimatedSection>
        <Support />
      </AnimatedSection>
      <AnimatedSection>
        <CTA />
      </AnimatedSection>
      <AnimatedSection>
        <FAQ />
      </AnimatedSection>
      <Footer />
      <BackToTopButton />
    </div>
  );
}

export default App;
