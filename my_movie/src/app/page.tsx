import { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies } from '../../lib/tmdb';
import MovieCard from '../../components/MovieCard';
import Image from 'next/image';

export default async function Home() {
  // 🚀 On récupère les deux listes en parallèle (c'est plus rapide)
  const [nowPlaying, upcoming, topRated] = await Promise.all([
    getNowPlayingMovies(),
    getUpcomingMovies(),
    getTopRatedMovies()
  ]);

  return (
    <main className="min-h-screen bg-[#111] font-sans text-gray-100 pb-20">
      
      {/* --- HEADER --- */}
      <header className="bg-[#1c1c1c]/90 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo simple */}
            <span className="text-2xl">🍿</span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              CinéMathé
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#" className="text-green-500">Accueil</a>
            <a href="#now-playing" className="hover:text-green-400 text-gray-300 transition-colors">À l'affiche</a>
            <a href="#upcoming" className="hover:text-green-400 text-gray-300 transition-colors">Prochainement</a>
          </nav>
        </div>
      </header>


      {/* --- SECTION 1 : À L'AFFICHE --- */}
      <section id="now-playing" className="px-4 py-8 max-w-7xl mx-auto border-t border-gray-800/50">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
             <span className="w-1 h-6 bg-green-500 rounded-full inline-block"></span>
            À l&apos;affiche au cinéma
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800">
          {nowPlaying.map((movie: any) => (
            <div key={movie.id} className="min-w-[160px] md:min-w-[200px] snap-start"><MovieCard movie={movie} /></div>
            
          ))}
        </div>
      </section>
      {/* --- SECTION 2 : PROCHAINEMENT --- */}
      
      <section id="upcoming" className="pt-8 pb-4 max-w-7xl mx-auto">
        <div className="px-4 mb-4 flex items-end justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full inline-block"></span>
            Prochaines sorties
          </h2>
          <a href="#" className="text-sm text-green-500 hover:underline">Voir tout</a>
        </div>

        {/* Conteneur avec défilement horizontal */}
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800">
          {upcoming.map((movie: any) => (
            <div key={movie.id} className="min-w-[160px] md:min-w-[200px] snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>


     <section className="pt-8 pb-4 max-w-7xl mx-auto border-t border-gray-800/50">
        <div className="px-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            {/* Petit code couleur rouge pour changer */}
            <span className="w-1 h-6 bg-red-500 rounded-full inline-block"></span>
            Les mieux notés par les spectateurs
          </h2>
        </div>

        {/* On réutilise le même style de slider que "Prochainement" */}
        <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-gray-800">
          {topRated.map((movie: any) => (
            <div key={movie.id} className="min-w-[160px] md:min-w-[200px] snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>


   

    </main>
  );
}