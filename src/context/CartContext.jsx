import React from "react"
import { createContext,useEffect,useState } from "react"

// Create Context
export const CartContext = createContext();

//Create Provider

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(storedCart);
    }, []);
  
    const addToCart = (id) => {
      if (!cart.includes(id)) {
        const updatedCart = [...cart, id];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    };
  
    const removeFromCart = (id) => {
      const updatedCart = cart.filter(item => item !== id);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };