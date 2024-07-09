import React from "react";
import { ThemeContext } from "./ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <header>
      <h1
        style={{
          background: theme === "light" ? "#333" : "#fff",
          color: theme === "light" ? "red" : "#444",
        }}
      >
        Theme Switcher
      </h1>
      <button onClick={toggleTheme}>Toggle theme</button>
    </header>
  );
};

export default Header;
