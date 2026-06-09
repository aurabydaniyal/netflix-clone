import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IMAGE_BASE_URL } from '../utils/constants';
import LoadingCard from './LoadingCard';  // ← ADD THIS IMPORT

// ← ADD 'loading' to the props
const Row = ({ title, movies, onMovieClick, loading }) => {
  // Reference to the scrollable div (like getElementById but React way)
  const rowRef = useRef(null);
  
  // State to show/hide scroll buttons
  const [isHovered, setIsHovered] = useState(false);

  // Function to scroll left or right
  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' 
        ? scrollLeft - clientWidth  // Move left by screen width
        : scrollLeft + clientWidth; // Move right by screen width
      
      // Smooth scroll animation
      rowRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group mb-8">
      {/* Row Title */}
      <h2 className="text-xl md:text-2xl font-bold px-4 md:px-12 mb-2">
        {title}
      </h2>
      
      {/* Row Container with Scroll Buttons */}
      <div className="relative">
        {/* Left Scroll Button */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-r 
            transition-all duration-300 hover:bg-black/80 
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <FaChevronLeft size={30} />
        </button>

        {/* Horizontal Scrolling Movie List */}
        <div
          ref={rowRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex overflow-x-scroll scrollbar-hide scroll-smooth gap-2 px-4 md:px-12"
        >
          {/* SHOW LOADING SKELETONS OR MOVIES - ONLY ONE OF THESE */}
          {loading ? (
            // Show 5 skeleton cards while loading
            Array(5).fill().map((_, i) => <LoadingCard key={i} />)
          ) : (
            // Show actual movies when loaded
            movies?.map((movie) => (
              <div
                key={movie.id}
                onClick={() => onMovieClick(movie)}
                className="relative min-w-[150px] md:min-w-[200px] cursor-pointer transition-transform 
                  duration-300 hover:scale-105 hover:z-20"
              >
                {/* Movie Poster */}
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="rounded-md object-cover w-full h-auto"
                  onError={(e) => {
                    // Fallback image if poster doesn't load
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                  }}
                />
                
                {/* Hover Overlay with Movie Title */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 
                  transition-opacity rounded-md flex items-center justify-center">
                  <p className="text-white text-center p-2 text-sm">
                    {movie.title || movie.name}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-l 
            transition-all duration-300 hover:bg-black/80 
            ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          <FaChevronRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default Row;