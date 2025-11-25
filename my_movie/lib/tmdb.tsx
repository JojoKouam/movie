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