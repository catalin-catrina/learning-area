import React from "react";

const MealsContext = React.createContext();

const todaysMeals = ["Baked Beans", "Baked Sweet Potatoes", "Baked Potatoes"];

const MealsProvider = ({ children }) => {
  const [meals, setMeals] = React.useState(todaysMeals);

  return (
    <MealsContext.Provider value={{ meals }}>{children}</MealsContext.Provider>
  );
};

const useMealsContext = () => React.useContext(MealsContext);

export { useMealsContext };
export { MealsContext };
export default MealsProvider;
