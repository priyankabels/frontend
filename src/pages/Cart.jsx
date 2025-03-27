import React from "react";
import {useState,useEffect,useContext} from "react";
import { getBookByID } from "../api/book";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Import CartContext


function Cart()
{
    //const [cart,setCart]=useState([]);  //Cart from localstorage will be set in thsi state 

     const { cart, removeFromCart } = useContext(CartContext); // Use cart context
    const [bookDetails,setBookDetails]=useState([]); //Book Details for the book can be maintained in this state
    const [totalPrice, setTotalPrice] = useState(0);  //Total Price is calculated and set acordingly
    // Fetch book details based on IDs in the cart
//   useEffect(() => {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve and parse cart
//     console.log(storedCart)
//     setCart(storedCart);  // Set the state with the cart array

//     const fetchBookDetails = async () => {
//       try {
//         const details = [];
//         let total = 0;
//         for (let id of storedCart) {
//             console.log("I am fetaching detaisl for book with Id",id)
//           const response = await getBookByID(id)  // Fetch book details by ID
//           console.log(response)
//           details.push(response);  // Add book details to the array
//           total += response.price;  
//         }
//         setBookDetails(details);  // Update the state with all book details
//         setTotalPrice(total); 
//       } catch (error) {
//         console.error("Error fetching book details:", error);
//       }
//     };

//     if (storedCart.length > 0) {
//       fetchBookDetails();  // Fetch book details if cart has IDs
//     }

//   },[]);  // Empty dependency array to run only once when the component mounts
useEffect(() => {
    const fetchBookDetails = async () => {
      const details = [];
      let total = 0;
      for (let id of cart) {
        const response = await getBookByID(id);
        details.push(response);
        total += response.price;
      }
      setBookDetails(details);
      setTotalPrice(total);
    };

    fetchBookDetails();
  }, [cart]); // Dependency on cart so it updates when cart changes


    //Handling remove functionality

    
  // Handle book removal from the cart
  const handleRemoveFromCart = (id) => {
    console.log("Cart",cart);
    console.log(id)
    // const updatedCart = cart.filter((bookId) => bookId !== id); // Remove the selected book from the cart
    // console.log(updatedCart)
    // setCart(updatedCart); // Update state with the new cart
    // //localStorage.clear();
    // localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save the updated cart to localStorage
    //  // Update the book details state by filtering out the removed book
    // const updatedBookDetails = bookDetails.filter((book) => book._id !== id);
    // setBookDetails(updatedBookDetails); // Update the book details in the state

    // // Recalculate total price after removing the book
    // const newTotalPrice = updatedBookDetails.reduce((total, book) => total + book.price, 0);
    // setTotalPrice(newTotalPrice); // Set the new total price after removal
    removeFromCart(id);  // Call removeFromCart from context to remove item
    const updatedBookDetails = bookDetails.filter((book) => book._id !== id);
    setBookDetails(updatedBookDetails); // Update the book details in the state after removal

    // Recalculate total price after removing the book
    const newTotalPrice = updatedBookDetails.reduce((total, book) => total + book.price, 0);
    setTotalPrice(newTotalPrice); // Set the new total price after removal
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="mt-6">
        {bookDetails.length > 0 ? (
          <div>
            {/* Display cart items */}
          
            <ul>
              {bookDetails.map((book) => (
                <li key={book._id} className="flex justify-between items-center mb-4 p-4 bg-gray-800 rounded-lg">
                  <div>
                  <Link to={`/bookdetails/${book._id}`}>
                    <h2 className="text-xl text-white">{book.title}</h2>
                    <p className="text-gray-400">{book.author}</p>
                    <p className="text-gray-400">Price: ${book.price}</p>
                    </Link>
                  </div>

                  <button
                    className="bg-orange-800 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleRemoveFromCart(book._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
         

            {/* Total Price */}
            <div className="mt-6 text-lg font-semibold">
              <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
            </div>

            {/* Checkout Button */}
            <div className="mt-6">
              <button className="text-xl bg-yellow-400 text-white px-6 py-3 rounded-lg w-60 align-center">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p>Your cart is empty!</p>
        )}
      </div>
    </div>
    );
}

export default Cart;