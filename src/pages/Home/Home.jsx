import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate()
  return ( 
    <>
    <h1>Pick a Category!</h1>
    <button onClick={() => navigate("/general")}>General</button>
    <button>Books</button>
    <button>Film</button>
    <button>Music</button>
    <button>Television</button>
    </>
    );
}

export default Home;