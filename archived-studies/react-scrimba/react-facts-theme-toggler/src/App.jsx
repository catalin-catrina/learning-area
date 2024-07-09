import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main.jsx";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setDarkMode((oldDarkMode) => !oldDarkMode);
  };

  return (
    <div className="container">
      <Navbar darkMode={darkMode} toggleDarkMode={handleToggleDarkMode} />
      <Main darkMode={darkMode} />
    </div>
  );
}

export default App;
