import React from "react";
import RecipesList from "../components/RecipesList";

const testItem = {
  mealSize: 2,
  image: "https://images-gmi-pmc.edge-generalmills.com/7d6f3a8e-2eca-4c61-8988-489b40546395.jpg",
  ingredients: ["Chicken", "Vegetables"],
  method: ["Season chicken.", "Cook at 220c for 1.5 hours."],
  id: "5eaecf2a95ab162c225464c5",
  title: "Chicken Dinner",
  isVegetarian: false,
  __v: 0
};

const Recipes = () => {
  return (
    <React.Fragment>
      <h2>Recipes Page</h2>
      <RecipesList items={[testItem]} />
    </React.Fragment>
  );
};

export default Recipes;
