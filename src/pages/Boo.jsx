import React from "react"
import { useParams,useNavigate } from "react-router-dom"  //The parameter _id is passed from previous page of allbooks
import { getBookByID,updateBook,deleteBook } from "../api/book";
import { useEffect,useState } from "react";
import { MdDelete,MdRemoveShoppingCart } from "react-icons/md";
import { FaEdit,FaShoppingCart } from "react-icons/fa";

import axios from "axios"

function BookDetails()
{
    const [bookDetails,setBookDetails]=useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false); // State to control form visibility
    const [review, setReview] = useState(""); // State to store review input
    const [cart,setCart]=useState([]) ; //State to handle the cart 
    const [showRemoveCart, setShowRemoveCart] = useState(false);
    

    const isAdmin=true;
    const navigate = useNavigate();
    // console.log(useParams());  //PARAMS contains id=_id(book Id value)
    const {id}=useParams(); //So getting value for ID into id
    console.log(id);
    const handleEdit = () => {
        console.log("Navigating to edit book with ID:", id); // Debugging the ID
        navigate(`/addBook/${id}`);
      };
    const getBookData=async()=>{
        try {
            const result=await getBookByID(id);
            console.log(result);
            setBookDetails(result);  //Using UseState function setBookDetails to set the data
            console.log(bookDetails)
            
        } catch (error) {
            console.error(error,`Error getting details for the book with ID ${id}`);
        }
    }
  // Hanle Ad to Cart here Set state and maintain local storage
  const handleCart=()=>{
    console.log('Stored Cart:', cart);
    console.log('BookID Cart:', id);

    if (!cart.includes(id))
    {
        const updatedCart= [...cart,id]// Create a shallow copy of the cart
        //updatedCart.push(id); // Add the ID as a whole string
        setCart(updatedCart); // Update the state with the new cart //Make a shallow copy exitsing items of a cart and add new one 
     
        console.log("Im in the cart ",cart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage with the new cart
        setShowRemoveCart(true);
        alert("Book added successfully to the cart");
        
    }
    else
    {
      // Filter the cart to remove the item with the given ID
        const updatedCart = cart.filter(itemId => itemId !== id);   
        // Update the state with the new cart
        setCart(updatedCart);
            // Update localStorage with the new cart
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        console.log(`Item with ID ${id} has been removed from the cart.`);
        setShowRemoveCart(false);
        alert("Book removed from the cart.")
    }
   
  }

     // Update book with new review
  const addReview = async () => {
    if (review) {
      try {
             // Get the current timestamp (ISO format)
      const timestamp = new Date().toISOString();

      // Create review data
      const recentReview = 
        {
          comment: review,
          timestamp: timestamp,
        }
      
      console.log(recentReview);
      console.log(id)

          // Add the review to the list of reviews (could be saved in a database in a real app)
        setReview([...bookDetails.reviews, review]);
      console.log("Review from line 90",review[0].comment);
     // Append the new review to existing reviews
      const updatedReviews = [...bookDetails.reviews, recentReview];
      // Update the book with the new review combination of old Plus new in updatedReviews
      console.log("Review from line 94",updatedReviews);
      const updatedBook = await updateBook(id, {
        reviews: updatedReviews
      });

  
        setBookDetails(updatedBook); // Update book details in the state
        setReview(""); // Reset review field
        setShowReviewForm(false); // Close the form after submission
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

const handleDelete=async()=>{
    let confirmDelete=prompt("Are you sure you want to delete?? Confirm by writing delete.")
    if(confirmDelete=="delete")
    {
        try {
             // Ensure the id is valid
            //  if (!mongoose.Types.ObjectId.isValid(id)) {
            //     alert("Invalid book ID");
            //     return;
            // }
            const response=await deleteBook(id);
            console.log(id);
            console.log(response.data)
            navigate("/allbooks");

        } catch (error) {
            console.error("Failed to delete book.",error)
        }
    }


}
    useEffect(()=>{
      // Get items from the local storage and setCart accordingly
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);

        // Check if the current book ID is in the cart
        if (storedCart && storedCart.includes(id)) {
            setShowRemoveCart(true);
        }

        if (id) {
            getBookData(); // Fetch book data
  }
    },[id])  //IF Id changes the useeffect shoudl rerender so adding as dependency

//This event will occur when user submist reviews
  const handleReviewSubmit = () => {
    if (review) {
      // Add the review to the list of reviews (could be saved in a database in a real app)
      setReview([...bookDetails.reviews, review]);
      setReview(""); // Clear the review input after submitting
    }
  };
    return(
        <div className="p-6">
        {bookDetails ? (
          <div className="bg-zinc-900 text-white rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Section */}
              <div className="md:w-1/3">
                <img
                  src={bookDetails.url}
                  alt="bookimage"
                  className="w-full h-auto rounded-lg mt-20 ml-15 mb-20"
                />
              </div>
  
              {/* Book Details Section */}
              <div className="md:w-2/3">
                <div className="mb-4 mt-20 ml-30">
                  <h1 className="text-3xl font-bold">{bookDetails.title}</h1>
                  <h2 className="text-xl text-gray-400 mt-5">{bookDetails.author}</h2>
                  <h3 className="text-xl text-gray-400">Category: {bookDetails.category}</h3>
                </div>
            
                <p className="text-lg mb-4 mt-10 ml-30">{bookDetails.desc}</p>

                <p className="font-semibold text-yellow-500 text-xl ml-30">
                  Price: ${bookDetails.price}
                </p>
                 {/* Add to Cart Button */}
                {!showRemoveCart && <button
                  className="mt-4 bg-orange-800 ml-30 text-white px-4 py-2 flex rounded-lg gap-2"
                  onClick={handleCart}
                >
                 <FaShoppingCart /> Add to Cart
                </button>}
                  {/* Add to Cart Button */}
                  {showRemoveCart &&
                  <button
                  className="mt-4 bg-orange-800 ml-30 text-white px-4 py-2 flex rounded-lg gap-2"
                  onClick={handleCart}
                >
                 <MdRemoveShoppingCart /> Remove From Cart
                </button>
                 }
                {
                    bookDetails.reviews && bookDetails.reviews.length > 0 ? (
                        <div className="text-lg mb-4 mt-10 ml-30">
                        <p>Reviews:</p>
                        <ul className="list-disc pl-5"> {/* This is the unordered list */}
                            {bookDetails.reviews.map((review, index) => (
                            <li key={index} className="mb-2">{review.comment}</li> 
                            ))}
                        </ul>
                        </div>
                    ) : (
                        <div className="text-lg mb-4 mt-10 ml-30">
                        <p>No reviews yet. Be the first to add one!</p>
                        </div>
                    )
                 }
                         {/* Add Review Link/Button */}
              {!showReviewForm && (
                <div className="mt-4 ml-30">
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="text-blue-500 hover:underline"
                  >
                    Write a Review
                  </button>
                </div>
              )}

              {/* Review Form */}
              {showReviewForm && (
                <div className="mt-6">
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="w-1/3 p-2 bg-zinc-800 text-white rounded-lg ml-30"
                    rows="4"
                    placeholder="Write your review here..."
                  ></textarea>
                  <br/>
                  <button
                    onClick={addReview}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg ml-30"
                  >
                    Submit Review
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="mt-4 ml-4 bg-gray-500 text-white px-4 py-2 rounded-lg ml-5"
                  >
                    Cancel
                  </button>
                </div>
              )}
               
               
               

              {/* Admin Buttons */}
              {isAdmin && (
                <div className="mt-10 flex space-x-4 ml-30">
                  <button
                    onClick={handleEdit}
                    className="bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <FaEdit /> Edit Book
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-orange-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <MdDelete /> Delete Book
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <h2>Loading...</h2>
          </div>
        )}
      </div>
    )
}

export default BookDetails