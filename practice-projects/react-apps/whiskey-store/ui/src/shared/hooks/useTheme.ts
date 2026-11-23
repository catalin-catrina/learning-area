import { useState } from "react";

export function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );
  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains("dark");
    const newTheme = currentTheme ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setThemeState(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return { theme, toggleTheme };
}
