import {
  getMovieById,
  getMovieCast,
  getMovieVideos,
  type MovieDetails,
  type CastMember,
  type TMDBVideo,
} from "../../../../lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import TrailerModal from "components/TrailerModal";
import { prisma } from "../../../../lib/prisma";
import FavoriteButton from "components/FavoriteButton";
import StarRating from "components/StarRating";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieById(id);

  if (!movie) return { title: "Film introuvable" };

  return {
    title: `${movie.title} (Projet Démo)`,
    description: `Détails techniques et API pour ${movie.title}.`,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`],
    },
  };
}

export default async function MoviePage({ params,}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const session = await auth();

  const favorite = session?.user?.id
    ? await prisma.favorite.findUnique({
        where: {
          userId_movieId: {
            userId: session.user.id,
            movieId: id,
          },
        },
      })
    : null;

  const isFavorite = !!favorite;

  const userRating = session?.user?.id
    ? await prisma.rating.findUnique({
        where: {
          userId_movieId: {
            userId: session.user.id,
            movieId: id,
          },
        },
      })
    : null;
  const initialScore = userRating?.score || 0;
  // les infos du film et le casting
  const [movie, castData, videoData] = (await Promise.all([
    getMovieById(id),
    getMovieCast(id),
    getMovieVideos(id),
  ])) as [MovieDetails, { cast: CastMember[] }, TMDBVideo | undefined];

  // les 5 premiers acteurs
  const mainCast = castData?.cast ? castData.cast.slice(0, 5) : [];
  if (!movie || !movie.title) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#111] text-white font-sans">
      {/* HERO SECTION  */}
      <div className="relative w-full min-h-[85vh] md:h-[80vh] flex items-end">
        {/* Image de fond */}
        <div className="absolute inset-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover opacity-50"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#111] via-[#111]/50 to-transparent" />
        </div>

        {/* Contenu */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-24 pb-8 md:pt-32 md:pb-12 flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
          {/* Poster */}
          <div className="hidden md:block w-64 h-96 relative rounded-lg overflow-hidden shadow-2xl border-2 border-gray-700 shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Textes */}
          <div className="flex-1 space-y-4 w-full">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {movie.title}
            </h1>

            <div className="flex items-center gap-4 text-sm md:text-base text-gray-300">
              {movie.vote_average ? (
                <span className="bg-green-600 text-white px-2 py-1 rounded font-bold">
                  {movie.vote_average.toFixed(1)}
                </span>
              ) : null}
              <span>
                {movie.release_date
                  ? movie.release_date.split("-")[0]
                  : "Date inconnue"}
              </span>
              <span>
                {movie.runtime
                  ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                  : "Durée inconnue"}
              </span>{" "}
              <span>•</span>
              {/* Liste des genres */}
              <div className="flex gap-2">
                {movie.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="border border-gray-600 px-2 py-0.5 rounded-full text-xs"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="py-4 border-t border-gray-800 my-4 flex items-center justify-between">
              {/* Affichage des étoiles seulement si connecté */}
              {session && (
                <StarRating movieId={id} initialRating={initialScore} />
              )}
            </div>

            <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
              {movie.overview}
            </p>

            {/* Bouton Réserver */}
            <div className="flex flex-col md:flex-row gap-4 pt-6 w-full md:w-auto">
              {session ? (
                // utilisateur connecté réserve
                <Link
                  href={`/film/${movie.id}/reservation`}
                  className="bg-green-600 text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-transform transform hover:scale-105 shadow-lg shadow-yellow-500/20 w-full md:w-auto text-center"
                >
                  🎟️ Réserver ma place
                </Link>
              ) : (
                // utilisateur pas connecté pas de réservation
                <Link
                  href={`/login?callbackUrl=/film/${movie.id}`}
                  className="inline-block bg-gray-700 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-600 transition-transform transform hover:scale-105"
                >
                  🔒 Se connecter pour réserver
                </Link>
              )}
              <TrailerModal videoKey={videoData?.key} />
              <div className="flex justify-center md:justify-start">
                <FavoriteButton movieId={id} initialIsFavorite={isFavorite} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION CASTING */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-yellow-500 pl-3">
          Casting principal
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700">
          {mainCast.map((actor) => (
            <div key={actor.id} className="min-w-[120px] text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-2 relative border border-gray-700">
                {actor.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs">
                    No Image
                  </div>
                )}
              </div>
              <p className="font-bold text-sm">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
