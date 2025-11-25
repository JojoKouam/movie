import Image from 'next/image';
import Link from 'next/link';

// L'URL pour afficher les images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };
}

export default function MovieCard({ movie }: MovieProps) {
  return (
    <div className="relative group bg-[#1c1c1c] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image du film */}
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/placeholder.jpg'}
          alt={movie.title}
          fill // Remplit le conteneur parent
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link 
            href={`/film/${movie.id}`}
            className="bg-green-600 text-white px-4 py-2 rounded-full font-bold hover:bg-green-700 transition-colors"
          >
            Voir détails
          </Link>
        </div>
        
        {/* Badge de note */}
        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
          {movie.vote_average.toFixed(1)}
        </span>
      </div>

      {/* Infos en bas */}
      <div className="p-3">
        <h3 className="text-white text-sm font-semibold truncate" title={movie.title}>
          {movie.title}
        </h3>
        <p className="text-gray-400 text-xs mt-1">
          {movie.release_date?.split('-')[0] || 'Inconnu'} • Film
        </p>
      </div>
    </div>
  );
}