import { useState } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { IMAGE_BASE_URL } from '../utils/constants';

const Hero = ({ movie, onPlay }) => {
  const [showInfo, setShowInfo] = useState(false);

  // Don't render if no movie
  if (!movie) return null;

  // Get background image (backdrop preferred, fallback to poster)
  const backgroundImage = `${IMAGE_BASE_URL}${movie.backdrop_path || movie.poster_path}`;

  return (
    <div className="relative h-[80vh] md:h-[90vh]">
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient overlay (darkens image for text readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-center px-4 md:px-12">
        <div className="max-w-2xl space-y-4">
          {/* Movie Title */}
          <h1 className="text-4xl md:text-6xl font-bold">
            {movie.title || movie.name}
          </h1>
          
          {/* Movie Description (limited to 3 lines) */}
          <p className="text-sm md:text-base text-gray-200 line-clamp-3">
            {movie.overview}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onPlay}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded 
                font-semibold hover:bg-gray-200 transition"
            >
              <FaPlay /> Play
            </button>
            
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center gap-2 bg-gray-600/70 text-white px-6 py-2 rounded 
                font-semibold hover:bg-gray-600 transition"
            >
              <FaInfoCircle /> More Info
            </button>
          </div>

          {/* Expandable Info Panel */}
          {showInfo && (
            <div className="bg-black/80 p-4 rounded-lg mt-4">
              <p className="text-sm">{movie.overview}</p>
              <div className="mt-2 text-sm text-gray-300">
                Release: {movie.release_date || movie.first_air_date}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;