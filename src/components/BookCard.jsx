
import { Link } from "react-router-dom";
// This will hold information of the book to display to the user
// BookCard Component
function BookCard({ book }) {
    console.log("Book details from BookCArds",book)
    return (
      <div className="bookCard bg-gray-900 text-white rounded-lg shadow-lg p-5 flex flex-col justify-between hover:transform hover:translate-y-1 hover:scale-105 transition-all duration-200 border-1 border-yellow-400">
  {/* This link will redirect to Book details page  even if you click anywhere */}
<Link to={`/bookdetails/${book._id}`}>
        {/* Book Image */}
        <img
          src={book.url}
          alt={book.title}
          className="w-full h-64 object-cover rounded-md mb-4" // Reduced height of the image
        />
  
        <div className="flex flex-col justify-between flex-grow">
          <h3 className="text-xl font-bold mb-2">{book.title}</h3>
          <p className="text-lg mb-1">{book.author}</p>
          <p className="text-lg font-semibold text-yellow-400">${book.price}</p>
        
        </div>
        </Link>
      </div>
    );
  }
  
  export default BookCard;