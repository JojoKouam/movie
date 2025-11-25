"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  // État pour gérer l'ouverture du menu 
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-[#1c1c1c]/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
       
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <span className="text-2xl group-hover:rotate-12 transition-transform">🍿</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              CinéMathé
            </h1>
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-white hover:text-green-400 transition">Accueil</Link>
            <Link href="/cinemas" className="text-gray-300 hover:text-green-400 transition">Cinémas</Link>
            
            <div className="h-4 w-px bg-gray-700"></div>

            <div className="flex items-center gap-4">
              <Link href="/register" className="text-gray-300 hover:text-white transition">S'inscrire</Link>
              <Link href="/login" className="bg-green-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-700 transition shadow-lg shadow-green-900/20">
                Connexion
              </Link>
            </div>
          </nav>

          {/* Bouton Burger */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden text-white text-2xl p-2 focus:outline-none"
            aria-label="Ouvrir le menu"
          >
         
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* MENU MOBILE*/}
      
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-800 pt-4 animate-in slide-in-from-top-5 fade-in duration-200">
            <nav className="flex flex-col gap-4 text-center">
              <Link 
                href="/" 
                onClick={closeMenu}
                className="text-white text-lg py-2 hover:bg-white/5 rounded-lg transition"
              >
                Accueil
              </Link>
              <Link 
                href="/cinemas" 
                onClick={closeMenu}
                className="text-gray-300 text-lg py-2 hover:bg-white/5 rounded-lg transition"
              >
                Cinémas
              </Link>
              
              <hr className="border-gray-800" />

              <Link 
                href="/register" 
                onClick={closeMenu}
                className="text-gray-300 py-2 hover:text-white"
              >
                S&apos;inscrire
              </Link>
              <Link 
                href="/login" 
                onClick={closeMenu}
                className="bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition mx-4 shadow-lg"
              >
                Connexion
              </Link>
            </nav>
          </div>
        )}

      </div>
    </header>
  );
}