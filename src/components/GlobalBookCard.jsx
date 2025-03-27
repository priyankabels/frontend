

// This will hold information of the book to display to the user
// BookCard Component
function GlobalBookCard({ book }) {
     // Ensure book data is available and valid
  const buyLink = book.infoLink || '#'; // Fallback to '#' if no buy link exists
  const previewLink = book.previewLink || '#'; // Fallback to '#' if no preview link exists
console.log(book)
   // console.log("Book details from BookCArds",book)
    return (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg p-5 flex flex-col justify-between hover:transform hover:translate-y-1 hover:scale-105 transition-all duration-200 border-1 border-yellow-500">
        {/* Book Image */}
        <img
          src={book.imageLinks?.thumbnail}
          alt={book.title}
          className="w-34 h-34 object-cover rounded-md mb-4" // Adjusted image size
        />
  
        <div className="flex flex-col justify-between flex-grow">
        <h3 className="text-xl font-bold mb-2">{book.title}</h3>
          <p className="text-lg mb-1">By: {book.authors?.join(", ")}</p>
          <p className="text-lg mb-1">Published By: {book.publisher}</p>
          <p className="text-lg mb-1">Page Count: {book.pageCount}</p>
          <p className="text-lg mb-1">Published Date: {book.publishedDate}</p>
  
          {/* Preview Link */}
          <a 
            href={previewLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-lg font-semibold text-yellow-400"
          >
            Preview
          </a>
  
        </div>
      </div>
    );
  }
  
  export default GlobalBookCard;