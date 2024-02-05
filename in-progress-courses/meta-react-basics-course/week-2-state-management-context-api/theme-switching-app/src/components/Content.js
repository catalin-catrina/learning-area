import React from "react";
import { ThemeContext } from "./ThemeContext";

const Content = () => {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme === "light" ? "#333" : "#fff",
        color: theme === "light" ? "red" : "#444",
      }}
    >
      Nostrud amet aliquip labore eiusmod consectetur qui fugiat aliqua
      reprehenderit amet ipsum aute aute est. Cillum non ut aliqua sit dolore
      elit irure id fugiat. Sunt et consectetur eu nisi. Cupidatat reprehenderit
      do dolore laborum officia. Culpa elit quis excepteur do ex ex eu.
    </div>
  );
};

export default Content;
