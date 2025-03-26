import React from "react"
import { createContext,useEffect,useState } from "react"

// Create Context
export const CartContext = createContext();

//Create Provider

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
  //At the load check if there are any items set in Lcoak Storage
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart); //UseState method setCart will set all the bookIDS in storage in cart
    }, []);
  //This addToCART would be a common function used at all the pages
    const addToCart = (id) => { 
      if (!cart.includes(id)) { //The Id passed is not there in cart then add to cart else dont do anything 
        const updatedCart = [...cart, id];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    };
  
    const removeFromCart = (id) => {
      if(cart && cart.includes(id)){
        const updatedCart = cart.filter(item => item !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));  //Update local storage so deleted ID is no longer there in local sstorage
      }
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children} 
      </CartContext.Provider>
    );
  };