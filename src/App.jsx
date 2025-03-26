
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AddBook from './pages/AddBook'
import { Routes,Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import BookDetails from './pages/BookDetails'
import GlobalExplorer from './pages/GlobalExplorer'
import Cart from "./pages/Cart"
import { CartProvider } from './context/CartContext'


function App() {
  return (
    <div>
      <CartProvider>
      <Navbar/>
      {/* <Home/> */}
       <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/home" element={<Home/>}/>
        <Route path="/addBook" element={<AddBook/>}/>
        <Route path="/addBook/:id" element={<AddBook/>}/>
        <Route path="/allBooks" element={<AllBooks/>}/>
        <Route path="/bookdetails/:id" element={<BookDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/globalBooks" element={<GlobalExplorer/>}/>
       </Routes>
      <Footer/>
      </CartProvider>
    </div>
  )
}

export default App
