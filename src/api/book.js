import axios from "axios"
const API_URL=import.meta.env.VITE_BACKEND_URL||"http://localhost:4000"

// Get Recent Books
export async function getRecentBooks() {
    const res = await axios.get(`${API_URL}/api/book/recentbooks/get4`);
    return res.data;
  }

  
// Get all books
export async function getBooks() {
    const res = await axios.get(`${API_URL}/api/book/`);
    return res.data;
  }

//Get book by Id
export async function getBookByID(bookId) {
    const res = await axios.get(`${API_URL}/api/book/${bookId}`);
    return res.data;
}
//Delete book by Id
export async function deleteBook(_id) {
    const res = await axios.delete(`${API_URL}/api/book/${_id}`);
    return res.data;
}
//ADD a BOOK POST
//TRhis will require full object require to create a book 
export async function addBook(book) {
    const res = await axios.post(`${API_URL}/api/book/`,book);
    return res.data;
}

//UPDATE A BOOK by Id and send updates in request //Assuming we can paas book object check back later on this
export async function updateBook(bookId,book) {
    const res = await axios.put(`${API_URL}/api/book/${bookId}`,book);
    return res.data;
}