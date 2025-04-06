import React from "react";
import { appleImg, bagImg, searchImg } from "../utils/assets";

function Navbar() {
  return (
    <header className="w-full py-6 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="Apple's logo" width={14} height={18} />
        <div>
          {["Phones", "Mackbooks", "Tablets"].map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>

        <div>
          <img src={searchImg} alt="Search icon" width={18} height={18} />
          <img src={bagImg} alt="Shopping bag icon" width={18} height={18} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
