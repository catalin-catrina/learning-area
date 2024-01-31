import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Homepage from "./Homepage";
import AboutUs from "./AboutUs";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Homepage</Link>
        <Link to="/about-us">About us</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
