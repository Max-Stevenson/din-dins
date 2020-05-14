import React from "react";
import { useParams } from "react-router-dom";
import Tabs from "../../shared/components/UIElements/Tabs";

import "./ViewRecipe.css";

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
    isVegetarian: "false",
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
    isVegetarian: "false",
    __v: 0
  }
];

const ViewRecipe = () => {
  const recipeId = useParams().recipeId;
  const identifiedRecipe = testItems.find(p => p.id === recipeId);

  return (
    <div>
      <h2>{identifiedRecipe.title}</h2>
      <h3>Meal size: {identifiedRecipe.mealSize}</h3>
      <Tabs>
        <div label="Ingredients">
          <ul>
            {identifiedRecipe.ingredients.map((i, idx) => (
              <li key={idx}>
                {i.ingredient.quantity} {i.ingredient.measure}{" "}
                {i.ingredient.item}
              </li>
            ))}
          </ul>
        </div>
        <div label="Method">
          <ul>
            {identifiedRecipe.method.map((step, idx) => (
              <li key={idx}>{step.step}</li>
            ))}
          </ul>
        </div>
      </Tabs>
    </div>
  );
};

export default ViewRecipe;
