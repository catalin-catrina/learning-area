import React from "react";

import logo from "../assets/logowhite.png";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";

function Navbar() {
  return (
    <div className="w-full bg-slate-900 text-white p-4">
      <div className="m-auto w-4/5 flex justify-between">
        <img src={logo} className="w-40" alt="logo" />
        <FaRegCircleUser fontSize={35} />
      </div>
    </div>
  );
}

export default Navbar;
