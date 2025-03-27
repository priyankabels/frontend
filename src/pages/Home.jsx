import NewlyAddedBook from "../components/NewlyAddedBook"
import homeImg from "../assets/homeImg.jpg"
import { Link } from "react-router-dom";
function Home(){
    return(
        <div>
            <div style={{backgroundColor:"blanchedalmond"}} className="flex items-center justify-between p-8 mt-5">
                {/* Image Section */}
                <img src={homeImg} className="w-1/2 h-150 mt-8 rounded-lg" alt="Home Page Image" />

                {/* Quote Section */}
                <div className="w-1/2 pl-8">
                    <blockquote className="text-lg font-serif italic text-gray-800">
                        "A room without books is like a body without a soul." – Marcus Tullius Cicero
                    </blockquote>
                    <p className="mt-4 font-bold text-2xl text-md text-gray-600">
                        Embrace the joy of reading. A book opens a world of imagination and knowledge.
                    </p>
                    <div className="mt-6">
                        <Link to="/allbooks" className="font-bold text-3xl text-yellow-500 hover:text-blue-700 font-semibold">
                            Explore All Books
                        </Link>
                    </div>
                </div>
            </div>
        <NewlyAddedBook/>
        
        </div>
    )
}
export default Home;