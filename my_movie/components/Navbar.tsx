"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-[#1c1c1c]/95 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={closeMenu}
          >
            <span className="text-2xl group-hover:rotate-12 transition-transform">
              🍿
            </span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              CinéMathé
            </h1>
          </Link>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-white hover:text-green-400 transition"
            >
              Accueil
            </Link>
            <Link
              href="/cinemas"
              className="text-gray-300 hover:text-green-400 transition"
            >
              Cinémas
            </Link>

            <div className="h-4 w-px bg-gray-700"></div>

            {/*  AUTHENTIFICATION  */}
            {session ? (
              // Utilisateur connecté
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-white hover:text-green-400 transition focus:outline-none"
                >
                  <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg border-2 border-[#1c1c1c]">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="max-w-[100px] truncate">
                    {session.user?.name}
                  </span>
                  <span className="text-xs">▼</span>
                </button>

                {/* Menu Déroulant */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-[#2a2a2a] rounded-xl shadow-2xl border border-gray-700 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="text-xs text-gray-400">
                        Connecté en tant que
                      </p>
                      <p className="text-sm font-bold text-white truncate">
                        {session.user?.email}
                      </p>
                    </div>

                    <Link
                      href="/profil"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-green-400 transition"
                    >
                      👤 Mon Profil
                    </Link>
                    <Link
                      href="/mes-reservations"
                      className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-green-400 transition"
                    >
                      🎟️ Mes billets
                    </Link>

                    <div className="border-t border-gray-700 mt-1 pt-1">
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                      >
                        🚪 Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              //  utilisateur pas connecté
              <div className="flex items-center gap-4">
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-white transition"
                >
                  S&apos;inscrire
                </Link>
                <Link
                  href="/login"
                  className="bg-green-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-700 transition shadow-lg shadow-green-900/20"
                >
                  Connexion
                </Link>
              </div>
            )}
          </nav>

          {/* Bouton Burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl p-2"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-800 pt-4">
            <Link
              href="/"
              onClick={closeMenu}
              className="block text-white py-2"
            >
              Accueil
            </Link>
            <Link
              href="/cinemas"
              onClick={closeMenu}
              className="block text-gray-300 py-2"
            >
              Cinémas
            </Link>
            <hr className="border-gray-800" />

            {session ? (
              <>
                <div className="flex items-center gap-3 py-3 border-b border-gray-800 mb-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center font-bold text-sm">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-white">
                      {session.user?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {session.user?.email}
                    </span>
                  </div>
                </div>

                <Link
                  href="/profil"
                  onClick={closeMenu}
                  className="block text-gray-300 py-2 hover:text-white hover:bg-white/5 rounded pl-2 transition"
                >
                  👤 Mon Profil
                </Link>

                <Link
                  href="/mes-reservations"
                  onClick={closeMenu}
                  className="block text-gray-300 py-2 hover:text-white hover:bg-white/5 rounded pl-2 transition"
                >
                  🎟️ Mes billets
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-400 py-2 mt-2 block w-full text-left hover:bg-red-500/10 rounded pl-2 transition"
                >
                  🚪 Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="block text-gray-300 py-2"
                >
                  S&apos;inscrire
                </Link>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block bg-green-600 text-white text-center py-3 rounded-lg font-bold mt-2"
                >
                  Connexion
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
