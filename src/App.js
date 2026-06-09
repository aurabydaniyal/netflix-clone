import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Row from './components/Row';
import Modal from './components/Modal';
import useFetch from './hooks/useFetch';
import { endpoints, BASE_URL, API_KEY } from './utils/constants';

function App() {
  // State for modal
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState('');
  
  // State for search
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all movie categories using our custom hook
  const { data: trending, loading: trendingLoading } = useFetch(`${BASE_URL}${endpoints.trending}`);
  const { data: netflixOriginals } = useFetch(`${BASE_URL}${endpoints.netflixOriginals}`);
  const { data: topRated } = useFetch(`${BASE_URL}${endpoints.topRated}`);
  const { data: actionMovies } = useFetch(`${BASE_URL}${endpoints.actionMovies}`);
  const { data: comedies } = useFetch(`${BASE_URL}${endpoints.comedies}`);

  // Pick random movie from trending for hero banner
  const heroMovie = trending?.[Math.floor(Math.random() * trending?.length)];

  // Check URL for search query when page loads
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query);
    }
  }, []);

  // Function to search movies
  const fetchSearchResults = async (query) => {
    const response = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${query}`
    );
    setSearchResults(response.data.results);
  };

  // Handle clicking on a movie
  const handleMovieClick = async (movie) => {
    setSelectedMovie(movie);
    
    // Fetch trailer video from TMDB
    const response = await axios.get(
      `${BASE_URL}/${movie.media_type || 'movie'}/${movie.id}/videos?api_key=${API_KEY}`
    );
    
    // Find first YouTube trailer
    const trailer = response.data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );
    
    setTrailerKey(trailer?.key || '');
  };

  // Close modal
  const closeModal = () => {
    setSelectedMovie(null);
    setTrailerKey('');
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      {heroMovie && (
        <Hero movie={heroMovie} onPlay={() => handleMovieClick(heroMovie)} />
      )}
      
      {/* Movie Rows */}
      <div className="-mt-20 relative z-10">
        <Row 
          title="Trending Now" 
          movies={trending} 
          onMovieClick={handleMovieClick}
        />
        <Row title="Netflix Originals" movies={netflixOriginals} onMovieClick={handleMovieClick} />
        <Row title="Top Rated" movies={topRated} onMovieClick={handleMovieClick} />
        <Row title="Action Movies" movies={actionMovies} onMovieClick={handleMovieClick} />
        <Row title="Comedies" movies={comedies} onMovieClick={handleMovieClick} />
        
        {/* Search Results Row */}
        {searchResults && (
          <Row 
            title={`Search Results for "${searchQuery}"`} 
            movies={searchResults} 
            onMovieClick={handleMovieClick}
          />
        )}
      </div>
      
      {/* Movie Modal */}
      {selectedMovie && (
        <Modal movie={selectedMovie} onClose={closeModal} trailerKey={trailerKey} />
      )}
    </div>
  );
}

export default App;