import React from "react";

function Header() {
  return (
    <div className="header__container">
      <h1>Fun facts about React</h1>
      <ul>
        <li className="list-item">Was first released in 2013</li>
        <li className="list-item">Was originally created by Jordan Walke</li>
        <li className="list-item">Has well over 100K stars on GitHub</li>
        <li className="list-item">Is maintained by Facebook</li>
        <li className="list-item">
          Powers thousands of enterprise apps, including mobile apps
        </li>
      </ul>
    </div>
  );
}

export default Header;
