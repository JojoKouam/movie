import { redirect } from "next/navigation";
import {  type MovieDetails } from 'lib/tmdb';

import MovieCard from "components/MovieCard";
import Link from "next/link";

// Fonction API dédiée à la recherche
async function searchMovies(query: string) {
  const API_KEY = process.env.TMDB_API_KEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}&page=1`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results;
}

// Composant Page
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q;

  // Si pas de recherche, on redirige vers l'accueil
  if (!query) redirect("/");

  const movies = await searchMovies(query);

  return (
    <div className="min-h-screen bg-[#111] text-white pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Titre avec le mot recherché */}
        <h1 className="text-3xl font-bold mb-8">
          Résultats pour <span className="text-green-500">&quot;{query}&quot;</span>
        </h1>

        {/* Affichage des résultats */}
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie: MovieDetails) => (
              movie.poster_path && <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-xl font-bold mb-2">Aucun film trouvé</h2>
            <p className="text-gray-400 mb-6">Essayez avec un autre titre.</p>
            <Link href="/" className="text-green-500 hover:underline">
              Retour à l&apos;accueil
            </Link>
          </div>
        )}
        
      </div>
    </div>
  );
}