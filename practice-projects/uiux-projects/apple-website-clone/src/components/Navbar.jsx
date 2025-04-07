import React from "react";
import { appleImg, bagImg, searchImg } from "../utils/assets";
import { navLists } from "../utils/constants";

function Navbar() {
  return (
    <header className="py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex flex-1 set-max-width mx-auto relative">
        <img src={appleImg} alt="Apple's logo" width={14} height={18} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item, i) => (
            <div
              key={i}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img src={searchImg} alt="Search icon" width={18} height={18} />
          <img src={bagImg} alt="Shopping bag icon" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
