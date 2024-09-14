import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./container/Login";
import Home from "./container/Home";
import { useEffect } from "react";
import "./index.css";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
