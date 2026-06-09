import { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  // State for navbar background (transparent vs black)
  const [scrolled, setScrolled] = useState(false);
  
  // State for search input
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to detect scroll position
  useEffect(() => {
    // Function that runs when user scrolls
    const handleScroll = () => {
      // If scrolled down more than 50px, change navbar
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function (removes listener when component unmounts)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty array = runs once when component mounts

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (searchTerm.trim()) {
      // Redirect to search page with query parameter
      window.location.href = `/search?q=${searchTerm}`;
    }
  };

  return (
    // Navbar container - fixed at top, changes background based on scroll
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md' // When scrolled: black with blur
        : 'bg-gradient-to-b from-black/80 to-transparent' // Top: gradient
    }`}>
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        
        {/* Left section - Logo and menu */}
        <div className="flex items-center space-x-8">
          {/* Netflix Logo */}
          <h1 className="text-red-600 text-3xl font-bold tracking-wider">
            NETFLIX
          </h1>
          
          {/* Navigation Links (hidden on mobile) */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition">Home</a>
            <a href="#" className="hover:text-gray-300 transition">TV Shows</a>
            <a href="#" className="hover:text-gray-300 transition">Movies</a>
            <a href="#" className="hover:text-gray-300 transition">New & Popular</a>
            <a href="#" className="hover:text-gray-300 transition">My List</a>
          </div>
        </div>

        {/* Right section - Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/60 border border-white/20 rounded px-3 py-1 text-sm focus:outline-none focus:border-white/50"
            />
            <button type="submit" className="ml-2">
              <FaSearch className="text-xl cursor-pointer hover:text-gray-300" />
            </button>
          </form>
          
          {/* Notification Bell */}
          <FaBell className="text-xl cursor-pointer hover:text-gray-300" />
          
          {/* User Avatar */}
          <FaUserCircle className="text-2xl cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;