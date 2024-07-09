import React from "react";
import icon from "../assets/reactjs-icon.png";

function Header() {
  return (
    <div className="header__container">
      <div className="header__container__inner">
        <h1>Fun facts about React</h1>
        <div className="header__flex-container">
          <ul>
            <li className="list-item">Was first released in 2013</li>
            <li className="list-item">
              Was originally created by Jordan Walke
            </li>
            <li className="list-item">Has well over 100K stars on GitHub</li>
            <li className="list-item">Is maintained by Facebook</li>
            <li className="list-item">
              Powers thousands of enterprise apps, including mobile apps
            </li>
          </ul>
          <div className="react-image">
            <img src={icon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
