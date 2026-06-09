import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook (starts with 'use')
const useFetch = (url) => {
  // State variables
  const [data, setData] = useState(null);     // Stores movies
  const [loading, setLoading] = useState(true); // Loading indicator
  const [error, setError] = useState(null);   // Error message

  // useEffect runs when component mounts OR url changes
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        setLoading(true);  // Show loading state
        const response = await axios.get(url); // Make API call
        setData(response.data.results); // Save movies to state
        setError(null); // Clear any errors
      } catch (err) {
        setError(err.message); // Save error message
      } finally {
        setLoading(false); // Hide loading state
      }
    };

    fetchData(); // Call the function
  }, [url]); // Re-run if URL changes

  // Return values for components to use
  return { data, loading, error };
};

export default useFetch;