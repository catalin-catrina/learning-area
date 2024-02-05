import { MealsContext } from "../providers/MealsProvider";
import React from "react";

function Counter() {
  const { meals } = React.useContext(MealsContext);

  return <h3>Number of meals today {meals.length}</h3>;
}

export default Counter;
