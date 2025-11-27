// const TMDB_API_KEY = process.env.TMDB_API_KEY;
// const TMDB_BASE_URL = 'https://api.themoviedb.org/3';


// async function fetchTMDB(endpoint: string) {
//   const url = `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=fr-FR`;
  
//   const res = await fetch(url, {
//     next: { revalidate: 3600 } 
//   });

//   if (!res.ok) {
//     throw new Error(`Erreur TMDB: ${res.statusText}`);
//   }

//   return res.json();
// }

// // Nos fonctions prêtes à l'emploi
// export async function getNowPlayingMovies() {
//   return await fetchTMDB('/movie/now_playing');
// }

// export async function getUpcomingMovies() {
//   return await fetchTMDB('/movie/upcoming');
// }


const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
interface TMDBVideo {
  id: string;
  key: string; // C'est l'ID YouTube
  site: string; // ex: "YouTube"
  type: string; // ex: "Trailer", "Teaser"
  name: string;
}

//Récupérer les films du moment
export async function getNowPlayingMovies() {
  
  const reponse = await fetch((`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=fr-FR`),{next: { revalidate: 3600 }});
  const data = await reponse.json();
  return data.results;
}

//  Récupérer les films à venir 
export async function getUpcomingMovies() {
  
  const reponse = await fetch((`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=fr-FR`), {
    next: { revalidate: 3600 }
  });
  const data = await reponse.json();
  
  return data.results;
}
//  Récupérer les films les mieux notés
export async function getTopRatedMovies() {

  const reponse = await fetch((`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=fr-FR`), {
    next: { revalidate: 3600 }
  });
  const data = await reponse.json();
  
  return data.results;
}

//  Récupérer les détails d'un film précis (avec son ID)
export async function getMovieById(id: string) {

  const reponse = await fetch((`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`), {
    next: { revalidate: 3600 }
  });
return reponse.json();
}

//  Récupérer les détails d'un film précis (avec son ID)
export async function getMovieCast(id: string) {

  const reponse = await fetch((`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`), {
    next: { revalidate: 3600 }
  });
    if (!reponse.ok) return { cast: [] }; 
    return reponse.json();
}

export async function getMovieVideos(id: string) {
  // 1. Essayer de récupérer les vidéos en Français
  let url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=fr-FR`;
  let res = await fetch(url, { next: { revalidate: 3600 } });
  let data = await res.json();

  // On cherche un trailer YouTube
  let trailer = data.results.find((vid: TMDBVideo) => vid.type === "Trailer" && vid.site === "YouTube");

  // 2. Si pas de trailer FR, on essaie en Anglais (US)
  if (!trailer) {
    url = `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    res = await fetch(url, { next: { revalidate: 3600 } });
    data = await res.json();
    
    // On cherche un trailer US
    trailer = data.results.find((vid: TMDBVideo) => vid.type === "Trailer" && vid.site === "YouTube");
  }

  // 3. Si toujours rien, on prend la première vidéo YouTube dispo (Teaser, Clip...)
  if (!trailer) {
    trailer = data.results.find((vid: TMDBVideo) => vid.site === "YouTube");
  }

  return trailer;
}