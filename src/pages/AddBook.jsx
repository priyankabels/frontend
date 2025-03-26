import React from "react";
import { useState,useEffect } from "react";
import { addBook, getBookByID,updateBook } from "../api/book";
import { useParams } from "react-router-dom";
import axios from "axios"
function AddBook(){

  const { id } = useParams();  // Grab the bookId from the URL params (if available)
  let bookId=id;
  console.log("BookId",bookId)
 
  //This useState will be used to maintain book state and setBookDetails will set all the imput values to the object
    const [book, setBook] = useState({
        title: "",
        author: "",
        desc:"",
        price: "",
        category: "",
        url: "",
      });
      //Trying to do some validations with this usestate
    const [error,setError]=useState({
      title: "",
      author: "",
      desc:"",
      price: "",
      category: "",
      url: "",
    });

      // State for success message  Intially it is false will set if book submitted successfull 
  const [succcessMessage,setSuccessMessage] = useState(false);

//Trying to reuse the same form for EDIT 

//API call to get details of bookById
const getBookData=async()=>{
  try {
    const res=await getBookByID(bookId);
    console.log("Response from GETBYID",res)
    setBook({
      title: res.title,
      author: res.author,
      desc: res.desc,
      price: res.price,
      category: res.category,
      url: res.url,
    })
  } catch (error) {
    console.error("Eror getting data for book",error)
  }

};
// Fetch the book details if we are in edit mode
useEffect(() => {
  if (bookId) {
    getBookData()
  }
}, [bookId]);  //When bookID change information should change so adding it as dependecny

    
      // Handle input change
      const handleChange = (e) => {
        const { name, value } = e.target;//take values from input
        setBook({ ...book, [name]: value })//pass values to the useState 
    
      
        // setBook((prevDetails) => ({
        //   ...prevDetails,
        //   [name]: value,
        // }));
      };

      //Validate form
      const validateForm=(e)=>{
        const newerror={};
        if(!book.title) newerror.title="Title is required to add a book."
        if(!book.author) newerror.title="Author is required to add a book."
        if(!book.desc || book.desc.length>3000){
          newerror.desc="Description is required and should not be more than  1000 characters."
        }
        if (!book.price || isNaN(book.price) || Number(book.price) <= 0) {
          newerror.price = 'Price must be a valid number greater than 0';
        }
          // Validate URL (Book Image URL)
          const imageUrlPattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i; // Regex to match image URLs
          if (!book.url || !/^https?:\/\/[^\s]+$/.test(book.url)) {
            newerror.url = 'Please provide a valid URL';
          } else if (!imageUrlPattern.test(book.url)) {
            newerror.url = 'Please provide a valid image URL (jpg, jpeg, png, gif, bmp, webp)';
          }

        if (!book.category) newerror.category = 'Category is required';

        setError(newerror)

        return Object.keys(newerror).length === 0; // If no errors, return true
      };
      //This function will addBook and call the API post we created in backend
     const submitBook=async()=>{
      //If we have Book Id means we are in EDIT mode then calll update else call POST 
      if(bookId)
      {
        try {
          const res=await updateBook(bookId,book);
          console.log("Book updated successfully:", res);
        } catch (error) {
          console.error("Error while updating book",error)
        }
      }
      else
      {
                try{
                //const res=await AddBook(book) //not working this way 
                  const res = addBook(book);
                    console.log("Book added successfully:", res);
               
                }
                catch(error)
                {
                  console.error("Failed to add the book:", error);
                }
              }
              
      };
      // Handle form submit
      const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm())
        {
          submitBook()
          console.log('Book added successfully', book);
          //Now CLear the input fields once book is added
          setBook({
            title: "",
            author: "",
            desc: "",
            price: "",
            category: "",
            url: "",
          });
           // Show success message
       // Show success message
       setSuccessMessage(true); //Set it to true from false once form is submitted successfully
       setTimeout(() => setSuccessMessage(false), 3000); //Message should disapper after 3 seconds
        } else {
          console.log('Form has errors');
        }
        // You can send the book details to an API here or handle them as needed
        console.log("Book added successfully: ", book);
        navigate("/allbooks")
      };
    
    return(
      <div className="min-h-screen flex justify-center items-center  bg-gray-900">
      <div className="bg-white p-10 rounded-lg shadow-md w-4/5 max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-black mb-4 mt-20"> 
          {bookId ? "Edit Book" : "Add a New Book"}</h2>

        {/* Success message */}
        {succcessMessage && (
          <div className="text-center text-green-500 font-semibold mb-4">
           {bookId ? "Book updated successfully!" : "Book added successfully!"}
          
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-lg font-medium text-gray-700 font-bold">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter the title of the book"
            />
            {error.title && <p className="text-red-500 text-sm">{error.title}</p>}
          </div>

          {/* Author Input */}
          <div className="mb-6">
            <label htmlFor="author" className="block text-lg font-medium text-gray-700">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter the author's name"
            />
            {error.author && <p className="text-red-500 text-sm">{error.author}</p>}
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label htmlFor="desc" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={book.desc}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter description of the book"
              rows="4"
            />
            {error.desc && <p className="text-red-500 text-sm">{error.desc}</p>}
          </div>

          {/* Price Input */}
          <div className="mb-6">
            <label htmlFor="price" className="block text-lg font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={book.price}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter the price of the book"
            />
            {error.price && <p className="text-red-500 text-sm">{error.price}</p>}
          </div>

          {/* Category Input */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-lg font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={book.category}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option value="">Select a category</option>
              <option value="Fiction">Fiction</option>
              <option value="Novel">Novel</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Thriller">Thriller</option>
              <option value="Science">Science</option>
              <option value="Technology">Technology</option>
            </select>
            {error.category && <p className="text-red-500 text-sm">{error.category}</p>}
          </div>

          {/* URL Input */}
          <div className="mb-6">
            <label htmlFor="url" className="block text-lg font-medium text-gray-700">
              Book Image URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={book.url}
              onChange={handleChange}
              className="w-full p-4 mt-2 border border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter the Image URL for the book"
            />
            {error.url && <p className="text-red-500 text-sm">{error.url}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-500 text-white font-bold text-lg rounded-md hover:bg-yellow-400 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default AddBook;