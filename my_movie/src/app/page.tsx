import { getNowPlayingMovies, getUpcomingMovies, getTopRatedMovies } from '../../lib/tmdb';
import MovieCard from '../../components/MovieCard';
import Image from 'next/image';

export default async function Home() {
  //récupèrer les listes 
  const [nowPlaying, upcoming, topRated] = await Promise.all([
    getNowPlayingMovies(),
    getUpcomingMovies(),
    getTopRatedMovies()
  ]);

  return (
    <main className="min-h-screen bg-[#111] font-sans text-gray-100 pb-20">
      
      


      {/*  SECTION 1 : À L'AFFICHE */}
      <section id="now-playing" className="px-4 py-8 max-w-7xl mx-auto border-t border-gray-800/50">
        <div className="px-4 mb-4 flex items-end justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
             <span className="w-1 h-6 bg-green-500 rounded-full inline-block"></span>
            À l&apos;affiche au cinéma
          </h2>
        <a href="#" className="text-sm text-green-500 hover:underline">Voir tout</a>

        </div>

        <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800">
          {nowPlaying.map((movie: any) => (
            <div key={movie.id} className="min-w-[160px] md:min-w-[200px] snap-start"><MovieCard movie={movie} /></div>
            
          ))}
        </div>
      </section>
      {/* SECTION 2 : PROCHAINEMENT */}
      
      <section id="upcoming" className="pt-8 pb-4 max-w-7xl mx-auto border-t border-gray-800/50">
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

{/* SECTION 3 : FILMS NOTÉS*/}
     <section className="pt-8 pb-4 max-w-7xl mx-auto border-t border-gray-800/50">
        <div className="px-4 mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-red-500 rounded-full inline-block"></span>
            Les mieux notés par les spectateurs
          </h2>
        </div>
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