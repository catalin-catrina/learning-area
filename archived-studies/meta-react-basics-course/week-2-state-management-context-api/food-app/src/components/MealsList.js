import { useMealsContext } from "../providers/MealsProvider";

function MealsList() {
  const { meals } = useMealsContext();

  return (
    <>
      <h1>best food in town</h1>
      {meals.map((meal, index) => (
        <li key={index}>{meal}</li>
      ))}
    </>
  );
}

export default MealsList;
