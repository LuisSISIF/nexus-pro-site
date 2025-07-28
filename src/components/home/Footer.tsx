import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">Andromeda Solutions</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Transformando a gestão de estoque e vendas com tecnologia inovadora e suporte excepcional.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">(32) 3311-1870</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">contato@andromedas.com.br</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Juiz de Fora, MG</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links Rápidos</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Funcionalidades</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Preços</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Depoimentos</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Suporte</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Blog</a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">LGPD</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors">Cookies</a>
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
              Junte-se a mais de 500 empresas que já escolheram o NexusPro
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
              Iniciar Teste Grátis Agora
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 Andromeda Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;