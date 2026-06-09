// Test if environment variable works
console.log('API Key from env:', process.env.REACT_APP_TMDB_API_KEY);

// Test if we can make an actual API call
const testAPI = async () => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('API Test SUCCESS! Movies loaded:', data.results.length);
  } catch (error) {
    console.error('API Test FAILED:', error);
  }
};

testAPI();