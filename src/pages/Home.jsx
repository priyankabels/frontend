import NewlyAddedBook from "../components/NewlyAddedBook"
import homeImg from "../assets/homeImg.jpg"
function Home(){
    return(
        <div>
        <div className="bg-blanchedAlmond">
        <img src={homeImg} className="w-250 h-150" alt="Home Page Image" />
        </div>
        <NewlyAddedBook/>
        
        </div>
    )
}
export default Home;