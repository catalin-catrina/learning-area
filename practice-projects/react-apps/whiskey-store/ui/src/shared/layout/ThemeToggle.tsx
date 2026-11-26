import { Button, MoonIcon, SunIcon } from "../ui";
import { useTheme } from "../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <Button variant="ghost" className="w-10 px-0 [&_svg]:size-5" aria-label={`Switch to ${next} theme`} onClick={toggleTheme}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

export default ThemeToggle;
