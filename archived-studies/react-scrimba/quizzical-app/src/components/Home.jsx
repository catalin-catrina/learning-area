import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/quiz">Get to quiz</Link>
    </div>
  );
}

export default Home;
