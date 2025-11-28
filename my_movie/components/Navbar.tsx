"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import SearchBar from "./SearchBar";

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
            <h1 className="text-xl font-bold bg-linear-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              CinéMathé
            </h1>
          </Link>
          <div className="flex-1 mx-8 flex justify-center">
            <SearchBar />
          </div>
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
                      className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-green-400 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-3 text-gray-400 group-hover:text-green-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                      </svg>
                      Mon Profil
                    </Link>
                    <Link
                      href="/mes-reservations"
                      className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-green-400 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-3 text-gray-400 group-hover:text-green-400"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
                        />
                      </svg>
                      Mes billets
                    </Link>
                    {session.user?.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-sm text-yellow-500 hover:bg-gray-700 hover:text-yellow-400 transition border-t border-gray-700 mt-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        Dashboard Admin
                      </Link>
                    )}

                    <div className="border-t border-gray-700 mt-1 pt-1">
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                          />
                        </svg>
                        Déconnexion
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
