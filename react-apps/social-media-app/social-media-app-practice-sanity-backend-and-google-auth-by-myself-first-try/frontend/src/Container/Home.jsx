import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { client } from "../sanityClient";
import { getUserQuery } from "../queries";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegCircleUser } from "react-icons/fa6";
import Feed from "./Feed";

const Home = () => {
  const [user, setUser] = useState(null);
  const [toggle, setToggle] = useState(false);

  const localStorageUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : localStorage.clear();

  useEffect(() => {
    const query = getUserQuery(localStorageUser?.aud);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  return (
    <div>
      <div className="hidden md:flex">
        <Navbar />
      </div>
      <div className="md:hidden">
        <div className="p-5">
          <div className="flex gap-10">
            <div>
              <GiHamburgerMenu
                fontSize={35}
                onClick={() => setToggle(true)}
                style={!toggle ? {} : { visibility: "hidden" }}
              />
            </div>
            <div>
              <img src={logo} className="w-40" alt="logo" />
            </div>
            <div>
              <FaRegCircleUser fontSize={35} />
            </div>
          </div>
          <Sidebar toggle={toggle} setToggle={setToggle} />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Feed />}></Route>
      </Routes>
    </div>
  );
};

export default Home;
