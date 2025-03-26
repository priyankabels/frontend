import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookByID, updateBook, deleteBook } from "../api/book";
import { MdDelete, MdRemoveShoppingCart } from "react-icons/md";
import { FaEdit, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext"; // Import CartContext

function BookDetails() {
    const [bookDetails, setBookDetails] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [review, setReview] = useState(""); 
    const { cart, addToCart, removeFromCart } = useContext(CartContext); // Accessing CartContext
    const [showRemoveCart, setShowRemoveCart] = useState(false);  // Will be controlled by context

    const isAdmin = true;
    const navigate = useNavigate();
    const { id } = useParams();

    const handleEdit = () => {
        console.log("Navigating to edit book with ID:", id); 
        navigate(`/addBook/${id}`);
    };

    const getBookData = async () => {
        try {
            const result = await getBookByID(id);
            setBookDetails(result); 
        } catch (error) {
            console.error(error, `Error getting details for the book with ID ${id}`);
        }
    };

    // Check if the book is in the cart
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        if (storedCart.includes(id)) {
            setShowRemoveCart(true);
        }
        if (id) {
            getBookData(); 
        }
    }, [id]);

    const handleCart = () => {
        if (!cart.includes(id)) {
            addToCart(id);
            setShowRemoveCart(true);
            alert("Book added successfully to the cart");
        } else {
            removeFromCart(id);
            setShowRemoveCart(false);
            alert("Book removed from the cart.");
        }
    };

    const addReview = async () => {
        if (review) {
            const timestamp = new Date().toISOString();
            const recentReview = {
                comment: review,
                timestamp: timestamp,
            };
            const updatedReviews = [...bookDetails.reviews, recentReview];
            try {
                const updatedBook = await updateBook(id, { reviews: updatedReviews });
                setBookDetails(updatedBook); 
                setReview(""); 
                setShowReviewForm(false); 
            } catch (error) {
                console.error("Error adding review:", error);
            }
        }
    };

    const handleDelete = async () => {
        let confirmDelete = prompt("Are you sure you want to delete? Confirm by writing delete.");
        if (confirmDelete === "delete") {
            try {
                const response = await deleteBook(id);
                navigate("/allbooks");
            } catch (error) {
                console.error("Failed to delete book.", error);
            }
        }
    };

    return (
        <div className="p-6">
            {bookDetails ? (
                <div className="bg-zinc-900 text-white rounded-lg p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <img
                                src={bookDetails.url}
                                alt="bookimage"
                                className="w-full h-auto rounded-lg mt-20 ml-15 mb-20"
                            />
                        </div>

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

                            {/* Add/Remove to Cart Button */}
                            <button
                                className="mt-4 bg-orange-800 ml-30 text-white px-4 py-2 flex rounded-lg gap-2"
                                onClick={handleCart}
                            >
                                {showRemoveCart ? <MdRemoveShoppingCart /> : <FaShoppingCart />}
                                {showRemoveCart ? "Remove From Cart" : "Add to Cart"}
                            </button>

                            {bookDetails.reviews && bookDetails.reviews.length > 0 ? (
                                <div className="text-lg mb-4 mt-10 ml-30">
                                    <p>Reviews:</p>
                                    <ul className="list-disc pl-5">
                                        {bookDetails.reviews.map((review, index) => (
                                            <li key={index} className="mb-2">{review.comment}</li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="text-lg mb-4 mt-10 ml-30">
                                    <p>No reviews yet. Be the first to add one!</p>
                                </div>
                            )}

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

                            {showReviewForm && (
                                <div className="mt-6">
                                    <textarea
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        className="w-1/3 p-2 bg-zinc-800 text-white rounded-lg ml-30"
                                        rows="4"
                                        placeholder="Write your review here..."
                                    ></textarea>
                                    <br />
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
    );
}

export default BookDetails;