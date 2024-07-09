import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Header></Header>
      <Content></Content>
    </ThemeProvider>
  );
}

export default App;
