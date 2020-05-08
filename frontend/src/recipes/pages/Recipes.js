import React from "react";
import RecipesList from "../components/RecipesList";

const testItems = [{
  mealSize: 2,
  image: "https://images-gmi-pmc.edge-generalmills.com/7d6f3a8e-2eca-4c61-8988-489b40546395.jpg",
  ingredients: ["Chicken", "Vegetables"],
  method: ["Season chicken.", "Cook at 220c for 1.5 hours."],
  id: "5eaecf2a95ab162c225464c5",
  title: "Chicken Dinner",
  isVegetarian: false,
  __v: 0
}, {
  mealSize: 3,
  image: "https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg",
  ingredients: ["beef", "buns"],
  method: ["Make Burger.", "Cook at 220c for 20 mins."],
  id: "7eaecf2a95ab162c225464a6",
  title: "Burgers",
  isVegetarian: false,
  __v: 0
}];

const Recipes = () => {
  return (
    <React.Fragment>
      <h2>Recipes Page</h2>
      <RecipesList items={testItems} />
    </React.Fragment>
  );
};

export default Recipes;
