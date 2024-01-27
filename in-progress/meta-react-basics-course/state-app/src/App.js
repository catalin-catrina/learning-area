import logo from "./logo.svg";
import "./App.css";
import MealsProvider from "./providers/MealsProvider";
import MealsList from "./components/MealsList";
import Counter from "./components/Counter";

function App() {
  return (
    <>
      <MealsProvider>
        <MealsList></MealsList>
        <Counter></Counter>
      </MealsProvider>
    </>
  );
}

export default App;
