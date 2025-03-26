import  { useState,useEffect } from "react";  
import React from "react";
import { getBooks } from "../api/book";  //This points to API from backend
import BookCard from "../components/BookCard";


function AllBooks(){
    const [books,setBooks]=useState(null);  //Books and SetBooks to maintain the state and will store data fro API
    const fetchBooks=async()=>{
        try {
            const response=await getBooks();  //It will get details for all the books 
            console.log(response)
            //This setBooks is state method that will set books
            setBooks(response)
            
        } catch (error) {
            console.error("Failed to get books",error);
        }
    }
    useEffect(()=>{ //On load Fetch the books
        fetchBooks()
    },[]);  //no dependencies right now 
    return(
        <div className='bg-zinc-900 h-auto px-4 sm:px-12 py-8'>
        <h4 className='text-3xl text-yellow-100'>All Books</h4>
        {
            //If books present than show all books
            books?(
                <div className="bookList grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
                {
                  books && books.map((book, index) =>
                    <div key={index}>
                      <BookCard book={book} />
                    </div>)
                }
        
              </div>
            ): //Else if books not present show message loading
            <div className='flex item-center justify-center'>
           <h2>Loading...</h2>
          </div>

        }
      </div>

    );
}

export default AllBooks;