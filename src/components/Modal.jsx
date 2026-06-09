import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { FaTimes } from 'react-icons/fa';
import { IMAGE_BASE_URL } from '../utils/constants';

const Modal = ({ movie, onClose, trailerKey }) => {
  // Effect to prevent background scrolling when modal is open
  useEffect(() => {
    // Save original overflow style
    const originalStyle = document.body.style.overflow;
    
    // Disable scrolling on body
    document.body.style.overflow = 'hidden';
    
    // Cleanup function: restore scrolling when modal closes
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []); // Empty array = runs when modal opens

  // Don't render if no movie selected
  if (!movie) return null;

  return (
    // Modal backdrop (dark overlay)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Modal Content Container */}
      <div className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full hover:bg-black/80"
        >
          <FaTimes size={24} />
        </button>

        {/* Trailer Video */}
        {trailerKey && (
          <div className="aspect-video">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerKey}`}
              width="100%"
              height="100%"
              playing={true}  // Auto-play trailer
              controls={true} // Show YouTube controls
            />
          </div>
        )}

        {/* Movie Information */}
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-2">
            {movie.title || movie.name}
          </h2>
          
          {/* Rating and Year */}
          <div className="flex gap-4 text-sm text-gray-400 mb-4">
            <span>⭐ {movie.vote_average?.toFixed(1)}/10</span>
            <span>
              📅 {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}
            </span>
          </div>
          
          {/* Description */}
          <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
          
          {/* Action Buttons */}
          <div className="mt-4 flex gap-3">
            <button className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200">
              Play
            </button>
            <button className="bg-gray-600 text-white px-6 py-2 rounded font-semibold hover:bg-gray-700">
              My List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;