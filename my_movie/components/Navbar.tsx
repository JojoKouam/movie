import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-[#1c1c1c]/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:rotate-12 transition-transform">🍿</span>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            CinéMathé
          </h1>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          
          <Link href="/" className="text-white hover:text-green-400 transition">
            Accueil
          </Link>
          
          <Link href="/cinemas" className="text-gray-300 hover:text-green-400 transition">
            Cinémas
          </Link>

          {/* Séparateur */}
          <div className="h-4 w-px bg-gray-700"></div>

          <div className="flex items-center gap-4">
            {/* Bouton Inscription (Discret) */}
            <Link href="/register" className="text-gray-300 hover:text-white transition">
              S&apos;inscrire
            </Link>

            {/* Bouton Connexion (Mis en avant) */}
            <Link href="/login" className="bg-green-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-green-700 transition shadow-lg shadow-green-900/20">
              Connexion
            </Link>
          </div>
        </nav>

        {/* MENU MOBILE (Burger) */}
        <button className="md:hidden text-white text-2xl p-2">
           ☰
        </button>
      </div>
    </header>
  );
}