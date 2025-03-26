import React,{ useState,useEffect } from "react";
import GlobalBookCard from "../components/GlobalBookCard";
import axios from "axios"

function GlobalExplorer(){
    //Declaring state variables
    const[loading,setLoading]=useState(false) //Expecting to be true or false value
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("bestsellers");
    const [books, setBooks] = useState([]);

    const API_KEY=import.meta.env.VITE_BOOK_API_KEY;
     // Handle input change for the search bar
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to fetch books from Google Books API
  const fetchBooks = async (query) => {
    console.log("Fetch books called",query)
    if (!query) return; // Don't search if query is empty
    setLoading(true);
    setError(null); // Reset errors

    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
        params: {
          q: query,
          maxResults: 20, // Limit the number of results
          key: API_KEY, //API_KEY getting from above
        },
      });
      setBooks(response.data.items || []); // Store the books in state
    } catch (err) {
      setError('An error occurred while fetching books.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery);
  };
  useEffect(()=>{
  //Instead of blank page show some books to the user when he navigates to this page
  fetchBooks(searchQuery)
 
  },[searchQuery])  //Adding searchQuery as dependency because when query changes results should chnage 
    return(
        <div className="min-h-screen p-6 bg-black">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Books</h1>

      {/* Centered Search Bar with Orange Border */}
      <div className="flex justify-center mb-6">
        <form onSubmit={handleSearchSubmit} className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for books..."
            className="p-4 w-96 border-2 border-yellow-500 rounded-lg text-white"
          />
          <button type="submit" className="p-4 bg-yellow-500 w-50 text-white rounded-lg ml-2">
            Search
          </button>
        </form>
      </div>
           
             {/* Display loading or error message */}
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display Books */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <GlobalBookCard key={book.id} book={book.volumeInfo} />
        ))}
      </div>
        </div>
    )
}

export default GlobalExplorer