import { Routes, Route, useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";

import Login from "./components/Login";
import Home from "./container/Home";
import "./App.css";
import { fetchUser } from "./utils/fetchUser";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = fetchUser();
    if (!user) navigate("/login");
  });

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
