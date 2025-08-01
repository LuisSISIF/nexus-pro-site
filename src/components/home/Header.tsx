'use client'
import React, { useState } from 'react';
import { Phone, Calendar, Zap, Menu, X, User } from 'lucide-react';
import { ThemeToggleButton } from '../theme-toggle';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/images/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/#features', label: 'Funcionalidades' },
    { href: '/#testimonials', label: 'Depoimentos' },
    { href: '/#pricing', label: 'Preços' },
    { href: '/#faq', label: 'FAQ' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <Image src={Logo} alt="Andromeda Solutions Logo" width={40} height={40} className="h-10 w-auto" data-ai-hint="logo" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Andromeda Solutions</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
             <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
                <User className="w-4 h-4" />
                Área do Cliente
            </Link>
            <ThemeToggleButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggleButton />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {link.label}
              </a>
            ))}
             <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
             <Link href="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                Área do Cliente
              </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
