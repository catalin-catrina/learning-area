import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

import { categories } from "../categories";

function Sidebar({ toggle, setToggle }) {
  return (
    <div
      className={`fixed top-0 left-0 z-1 w-4/5 p-5 duration-500 bg-slate-900 text-white ${
        toggle ? "animate-slide-in" : "animate-slide-out"
      }`}
      style={toggle ? {} : { visibility: "hidden" }}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <Link to={"/"} className="pb-2">
            Home
          </Link>
          <h2 className="text-2xl pb-4 mb-4 border-b-2 inline-block w-max">
            Discover Categories
          </h2>
          {categories.slice(0, categories.length - 1).map((category) => (
            <Link to={`/`} className="py-2">
              {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
            </Link>
          ))}
        </div>
        <IoCloseSharp
          fontSize={35}
          onClick={() => {
            setToggle(false);
          }}
        />
      </div>
    </div>
  );
}

export default Sidebar;
