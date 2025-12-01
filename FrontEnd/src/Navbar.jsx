import React, { useState } from 'react';
import { Menu, X, Heart} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
        <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed w-full top-0 z-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              WildresQ
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              How It Works
            </a>
            <a href="#categories" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Categories
            </a>
            <a href="#about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              About
            </a>
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200">
              Admin Login
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-3">
            <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium">
              How It Works
            </a>
            <a href="#categories" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium">
              Categories
            </a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-emerald-600 font-medium">
              About
            </a>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full font-semibold">
              Admin Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;