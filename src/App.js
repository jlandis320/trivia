import logo from './logo.svg';
import './App.css';

import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home/Home";
import General from './pages/General/General';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home /> }/>
        <Route path="/general" element={<General /> }/>
      </Routes>
    </div>
  );
}

export default App;
