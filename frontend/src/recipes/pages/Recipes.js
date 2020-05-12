import React from "react";
import RecipesList from "../components/RecipesList";

const testItems = [
  {
    mealSize: 2,
    image:
      "https://images-gmi-pmc.edge-generalmills.com/7d6f3a8e-2eca-4c61-8988-489b40546395.jpg",
    ingredients: [
      { ingredient: { quantity: 1, measure: "cup", item: "flour" } },
      { ingredient: { quantity: 2, measure: "", item: "carrots" } }
    ],
    method: [{ step: "prehead oven" }, { step: "cook" }],
    id: "5eaecf2a95ab162c225464c5",
    title: "Chicken Dinner",
    isVegetarian: false,
    __v: 0
  },
  {
    mealSize: 3,
    image:
      "https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg",
    ingredients: [
      { ingredient: { quantity: 1, measure: "cup", item: "flour" } },
      { ingredient: { quantity: 2, measure: "", item: "carrots" } }
    ],
    method: [{ step: "prehead oven" }, { step: "cook" }],
    id: "7eaecf2a95ab162c225464a6",
    title: "Burgers",
    isVegetarian: false,
    __v: 0
  }
];

const Recipes = () => {
  return (
    <React.Fragment>
      <h2>Recipes Page</h2>
      <RecipesList items={testItems} />
    </React.Fragment>
  );
};

export default Recipes;
