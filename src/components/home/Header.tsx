import React from 'react';
import { Phone, Calendar } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Andromeda Solutions</span>
              </div>
            </div>
          </div>

          {/* Contact and CTA */}
          <div className="flex items-center space-x-6">
            <a 
              href="tel:+553233111870" 
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">(32) 3311-1870</span>
            </a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Agendar Demonstração</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;