const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
interface TMDBVideo {
  id: string;
  key: string; 
  site: string; 
  type: string;
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

//  Récupérer les détails d'un film précis 
export async function getMovieById(id: string) {

  const reponse = await fetch((`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=fr-FR`), {
    next: { revalidate: 3600 }
  });
return reponse.json();
}

//  Récupérer les cteur d'u film précis 
export async function getMovieCast(id: string) {

  const reponse = await fetch((`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=fr-FR`), {
    next: { revalidate: 3600 }
  });
    if (!reponse.ok) return { cast: [] }; 
    return reponse.json();
}

export async function getMovieVideos(id: string) {
  // recup les vidéos en Français
 
  let res = await fetch((`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=fr-FR`), { next: { revalidate: 3600 } });
  let data = await res.json();
  let trailer = data.results.find((vid: TMDBVideo) => vid.type === "Trailer" && vid.site === "YouTube");

  // dans le cas contraire en anglais
  if (!trailer) {
    
    res = await fetch((`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`), { next: { revalidate: 3600 } });
    data = await res.json();
  
    trailer = data.results.find((vid: TMDBVideo) => vid.type === "Trailer" && vid.site === "YouTube");
  }

  if (!trailer) {
    trailer = data.results.find((vid: TMDBVideo) => vid.site === "YouTube");
  }

  return trailer;
}