import axios from "axios"
import React from "react";
import { useEffect,useState } from "react";
import BookCard from "./BookCard";
import  {getRecentBooks,getBooks}  from "../api/book.js"

function NewlyAddedBook(){
   
const [recentbooks,setRecentbooks]=useState(null); //Creting use state to get books recently added

   
    // Fetch books when the component is loaded
    useEffect(()=>{
        const getBook=async()=>{
            try{
                const res=await getRecentBooks(); // Fetching the books from API
                console.log(res)
                if(res)
                setRecentbooks(res) // Setting the books to state
                console.log(res);
            }
            catch(error)
            {
                console.error("Failed to get newly added books:", error);
            }
          
        };
        getBook();
    },[]);  //Nodependencies so should run once after render
    return(
        <div className='px-4 py-2 bg-black'>
        <h2 className='text-3xl text-yellow-500 mt-5'>Newly added books to our store</h2>
        {!recentbooks &&
          <div className='flex item-center justify-center'>
          <h1>Loading...</h1>
          </div>
        }
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-4">
        {recentbooks && recentbooks.length > 0 ? (
          recentbooks.map((book) => (
            <div key={book.id || book.title}> {/* Use a unique identifier if possible */}
              <BookCard book={book} />
            </div>
          ))
        ) : (
          <p>No recent books available</p> // Fallback message in case there are no books
        )}
      </div>
      </div>
    )
}

export default NewlyAddedBook;