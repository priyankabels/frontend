import React, { useState, useEffect, useContext } from 'react';
import {Link} from 'react-router-dom'
import logoImg from "../assets/logo.jpg"

import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext"; // Import the CartContext


function Navbar(){
// const[cart,setcart]=useState(null);
// useEffect(()=>{
//     const storedCart=JSON.parse(localStorage.getItem("cart"))||[];
//     setcart(storedCart);
// },[]);

const { cart } = useContext(CartContext); // Get cart data from context

  // Function to update the cart when a new book is added
//   const updateCart = (newCart) => {
//     setcart(newCart); // Update the state
//     localStorage.setItem("cart", JSON.stringify(newCart)); // Persist changes in localStorage
//   };
    return(
        <div className="bg-gray-800 text-white px-8 py-4 shadow-lg fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
            <div className="flex items-center space-x-4">
                <img className="logoImg" src={logoImg} alt="Book Logo" />
                <h1 className="font-bold text-3xl text-yellow-500 cursor-pointer">BookStore</h1>
            </div>
            
            <div className="hidden md:flex space-x-6">
          <Link to="/home" className="text-lg hover:text-yellow-500 transition duration-200">Home</Link>
          <Link to="/allBooks" className="text-lg hover:text-yellow-500 transition duration-200">All Books</Link>
          <Link to="/login" className="text-lg hover:text-yellow-500 transition duration-200">Login</Link>  
          <Link to="/addBook" className="text-lg hover:text-yellow-500 transition duration-200">Add Book</Link>
          <Link to="/addBook" className="text-lg hover:text-yellow-500 transition duration-200">Global Book</Link>




          <div className="relative flex items-center">
            <Link to="/cart" className="text-lg hover:text-yellow-500 transition duration-200">Cart</Link>
            {cart && cart.length > 0 && (
              <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                {cart.length}
              </span>
            )}
          </div>

        
        </div>
      </div>
    </div>
  );
}


export default Navbar;