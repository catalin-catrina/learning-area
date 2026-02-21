import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";

function Navbar({ user }) {
  return (
    <div className="w-full  p-4">
      <div className="m-auto w-4/5 flex justify-between items-center">
        <Link to={"/"} className="w-3/12 cursor-pointer">
          <img src={logo} className="w-full" alt="logo" />
        </Link>

        <div>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.picture} className="w-full" alt="user" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
