import { auth } from "@/auth";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getMovieById } from "lib/tmdb";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // 1. On récupère TOUT ce qui concerne l'utilisateur en une seule requête DB
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      reservations: { orderBy: { createdAt: "desc" }, take: 3 }, // Les 3 derniers billets
      favorites: true, // Tous les favoris (juste les IDs)
    },
  });

  if (!user) redirect("/login");

  // 2. Pour les favoris, on a que les IDs. On va chercher les images chez TMDB.
  // On utilise Promise.all pour charger tous les films favoris en parallèle (rapide)
  const favoriteMovies = await Promise.all(
    user.favorites.map((fav) => getMovieById(fav.movieId))
  );

  return (
    <div className="min-h-screen bg-[#111] text-white pb-20">
      
      {/* --- EN-TÊTE PROFIL (Bannière verte) --- */}
      <div className="bg-linear-to-r from-green-900 to-[#111] pt-32 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6">
          
          {/* Avatar Géant */}
          <div className="w-32 h-32 bg-[#111] rounded-full border-4 border-green-500 flex items-center justify-center text-5xl font-bold shadow-2xl">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          
          {/* Infos */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
            <p className="text-green-400">{user.email}</p>
            <p className="text-xs text-gray-400 mt-2">
              Membre depuis le {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Stats rapides */}
          <div className="flex gap-6 bg-black/30 p-4 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <span className="block text-2xl font-bold">{user.reservations.length}</span>
              <span className="text-xs text-gray-400 uppercase">Billets</span>
            </div>
            <div className="text-center border-l border-gray-600 pl-6">
              <span className="block text-2xl font-bold">{user.favorites.length}</span>
              <span className="text-xs text-gray-400 uppercase">Favoris</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 grid gap-12">
        
        {/* --- SECTION 1 : DERNIÈRES RÉSERVATIONS --- */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold border-l-4 border-green-500 pl-3">Dernières Réservations</h2>
            <Link href="/mes-reservations" className="text-sm text-gray-400 hover:text-white transition">
              Voir tout l&apos;historique →
            </Link>
          </div>

          {user.reservations.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {user.reservations.map((res) => (
                <div key={res.id} className="bg-[#1c1c1c] border border-gray-800 p-5 rounded-xl hover:border-green-600 transition group relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                    PAYÉ
                  </div>
                  <h3 className="font-bold truncate pr-8">{res.movieTitle}</h3>
                  <p className="text-sm text-gray-400 mt-1">📍 {res.cinema}</p>
                  <p className="text-sm text-gray-400">📅 {new Date(res.createdAt).toLocaleDateString()} à {res.showTime}</p>
                  <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                    <span className="font-mono text-green-400">{res.seats}</span>
                    <span className="font-bold">{res.totalPrice} F</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">Aucune réservation pour le moment.</p>
          )}
        </section>

        {/* --- SECTION 2 : MES FAVORIS (Grille Films) --- */}
        <section>
          <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3 mb-6">Ma Liste de Favoris ❤️</h2>
          
          {favoriteMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {favoriteMovies.map((movie: any) => (
                <Link key={movie.id} href={`/film/${movie.id}`} className="group">
                  <div className="relative aspect-2/3 rounded-lg overflow-hidden border border-gray-800 group-hover:border-white transition">
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                      <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">Voir</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium truncate group-hover:text-green-400 transition">{movie.title}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#1c1c1c] p-8 rounded-xl text-center">
              <p className="text-gray-400 mb-4">Vous n&apos;avez pas encore de favoris.</p>
              <Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition">
                Explorer les films
              </Link>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}