// YOUR API KEY FROM TMDB (replace with your actual key)
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Base URLs for API calls
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

// Different movie categories endpoints
export const endpoints = {
  // Trending movies/shows this week
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  
  // Netflix original content
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  
  // Top rated movies of all time
  topRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  
  // Action movies (genre ID 28)
  actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  
  // Comedy movies (genre ID 35)
  comedies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  
  // Horror movies (genre ID 27)
  horror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  
  // Romance movies (genre ID 10749)
  romance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
};