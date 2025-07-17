import {useState,useEffect} from 'react'
import { useDebounce } from 'react-use'
import Search from './components/search.jsx'  
import Spinner from './components/Spinner.jsx' // Importing the Spinner component
import MovieCard from './components/MovieCard.jsx';
import { updateSearchCount, getTrendingMovies } from './appwirte.js';



const API_BASE_URL = 'https://api.themoviedb.org/3'; // Replace with your actual API base URL
const API_KEY= import.meta.env.VITE_TMDB_API_KEY; // Ensure you have this in your .env file

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};  

const App = () => {
  const[searchTerm, setSearchTerm] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');

  const [movielist, setMovieList] = useState([]); // Assuming you want to store the movie list

  const[isloading, setIsLoading] = useState(false); // State to manage loading status

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); 

  const [trendingMovies, setTrendingMovies] = useState([]); // State to store trending movies

  useDebounce(() => {setDebouncedSearchTerm(searchTerm)}, 500, [searchTerm]); // Debounce the search term
  
  const fetchMovies = async (query = '') => {
    setIsLoading(true); // Set loading to true when fetching starts
    setErrorMessage(''); // Clear any previous error messages

    try {
      const endpoint = query 
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&sort_by=popularity.desc`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      if (data.response === 'False  ') { 
        setErrorMessage(data.error || 'No results found');
        setMovieList([]); // Clear the movie list if no results found
        return;
      }
      setMovieList(data.results || []); // Set the movie list to the results from the API   
      // Process the data as needed, e.g., set it to state or display it
      // setMovies(data.results); // Assuming you have a state to hold movies
      setErrorMessage(''); // Clear any previous error messages 
      if (query && data.results && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]); // Update search count in Appwrite
      }

      
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false); // Set loading to false when fetching is done
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      if (movies && movies.length > 0) {
        setTrendingMovies(movies);
      }

    } catch (error) {
      console.error('Error fetching trending movies:', error);
      
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);

  }, [debouncedSearchTerm]); // This effect runs when the component mounts or when searchTerm changes.
    // This effect runs when the component mounts or when searchTerm changes.
    // You can add any side effects here, such as fetching data based on searchTerm.

    useEffect(() => {
      loadTrendingMovies(); // Load trending movies when the component mounts
    }, []); // Empty dependency array means this effect runs once when the component mounts.

  return (
    <main>
      <div className='pattern'>
        <div className='wrapper'>
          <header>
            <img src="./hero-img.png" alt='Hero Banner'/>
          
            <h1> Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
             <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <h1>{searchTerm}</h1>
          </header>
          {trendingMovies.length > 0 && (
            <section className='trending'>
              <h2>Trending Movies</h2>
              <ul>
                {trendingMovies.map((movie, index) => (
                  <li key={movie.id}>
                    <p> {index +1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                  </li>
                ))}
              </ul>
              </section>
              
              )}

          <section className='all-movies'>
            <h2>All Movies</h2>

           {isloading ? (
            <Spinner />
            ) : movielist.length === 0 ? (
              <p className="text-gray-500">No movies found. Please try a different search.</p>
           ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
            ) : ( 
              <ul>
                {movielist.map((movie) => (
                 <MovieCard key={movie.id} movie={movie}/>
                  
                  ))}
              </ul>


            )}

            </section>

         
        </div>

      </div>
    </main>
  )
}

export default App