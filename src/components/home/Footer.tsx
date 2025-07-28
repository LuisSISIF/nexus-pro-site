import React from 'react';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import Image from 'next/image';
import LogoImg from '@/images/logo.png';

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

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2">
              <Image src={LogoImg} alt="Andromeda Solutions Logo" width={32} height={32} className="h-8 w-auto" />
              <span className="text-xl font-bold">Andromeda Solutions</span>
            </a>
            <p className="text-gray-300 leading-relaxed">
              Transformando a gestão de estoque e vendas com tecnologia inovadora e suporte excepcional.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/andromeda_solutions_oficial" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <a href="tel:+5535998615203" className="text-gray-300 hover:text-white transition-colors">(35) 99861-5203</a>
              </div>
               <div className="flex items-center space-x-3">
                <WhatsAppIcon className="w-5 h-5 text-green-400" />
                <a href="https://wa.me/5535998615203" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">WhatsApp</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a href="mailto:andromedasolutions2025@hotmail.com" className="text-gray-300 truncate hover:text-white transition-colors">andromedasolutions2025@hotmail.com</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Machado, MG</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <div className="space-y-2">
              <a href="/#features" className="block text-gray-300 hover:text-white transition-colors">Funcionalidades</a>
              <a href="/#pricing" className="block text-gray-300 hover:text-white transition-colors">Preços</a>
              <a href="/#testimonials" className="block text-gray-300 hover:text-white transition-colors">Depoimentos</a>
              <a href="/#support" className="block text-gray-300 hover:text-white transition-colors">Suporte</a>
              <a href="/#faq" className="block text-gray-300 hover:text-white transition-colors">FAQ</a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="space-y-2">
              <a href="/privacy-policy" className="block text-gray-300 hover:text-white transition-colors">Política de Privacidade</a>
              <a href="/terms-of-use" className="block text-gray-300 hover:text-white transition-colors">Termos de Uso</a>
              <a href="/lgpd" className="block text-gray-300 hover:text-white transition-colors">LGPD</a>
              <a href="/cookies" className="block text-gray-300 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              Comece a Transformar o Controle de Estoque e Vendas da Sua Empresa!
            </h3>
            <p className="text-blue-100 mb-6">
              Seja um dos primeiros a inovar com a solução que vai revolucionar o mercado.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              Iniciar Teste Grátis Agora
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 Andromeda Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
