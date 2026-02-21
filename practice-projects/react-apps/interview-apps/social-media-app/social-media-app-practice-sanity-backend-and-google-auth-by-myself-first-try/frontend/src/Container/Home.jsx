import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserProfile from "../components/UserProfile";
import { client } from "../sanityClient";
import { getUserQuery } from "../queries";
import { GiHamburgerMenu } from "react-icons/gi";
import Feed from "./Feed";
import logo from "../assets/logo.png";

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
        <Navbar user={user && user} />
      </div>
      <div className="md:hidden">
        <div className="p-5">
          <div className="flex justify-between items-center">
            <div>
              <GiHamburgerMenu
                fontSize={35}
                onClick={() => setToggle(true)}
                style={!toggle ? {} : { visibility: "hidden" }}
              />
            </div>
            <div className="">
              <img src={logo} className="w-40" alt="logo" />
            </div>
            <div>
              <Link to={`user-profile/${user?._id}`}>
                <img src={user?.picture} className="w-max" alt="user" />
              </Link>
            </div>
          </div>
          <Sidebar toggle={toggle} setToggle={setToggle} />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Feed />}></Route>
        <Route path="/user-profile/:userId" element={<UserProfile />}></Route>
      </Routes>
    </div>
  );
};

export default Home;
