// run this component on the client side, since we use useState
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Portfolio", path: "#portfolio" },
  { title: "Stack", path: "#stack" },
  { title: "Contact", path: "#contact" },
];

function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  function toggleMobileNav() {
    setMobileNavOpen(!mobileNavOpen);
  }

  function closeMobileNav() {
    setMobileNavOpen(false);
  }

  return (
    <div className="fixed flex justify-center z-50 w-full text-white font-bold ">
      <div className="hidden md:flex items-center justify-center max-w-[400px] mt-8 mx-auto border border-white/20 rounded-3xl p-2 backdrop-blur-3xl">
        <ul className="flex gap-8 p-2">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="hover:text-white/50 transition-colors duration-300 ease-in-out"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        onClick={toggleMobileNav}
        className="md:hidden absolute top-5 right-14 z-1 text-white/70 p-2"
      >
        {mobileNavOpen ? (
          <AiOutlineClose size={30} />
        ) : (
          <AiOutlineMenu size={30} />
        )}
      </div>

      <div
        className={`fixed left-0 top-0 w-full h-full bg-black/90 duration-300 ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-8 h-full">
          {navLinks.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                onClick={closeMobileNav}
                className="text-5xl"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
