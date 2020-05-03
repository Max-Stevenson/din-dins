import React from "react";
import "./RecipesList.css";
import RecipesItem from "./RecipesItem";

const RecipesList = props => {
  return (
    <ul className="recipes-list">
      {props.items.map(recipe => (
        <RecipesItem
          key={recipe.id}
          title={recipe.title}
          isVegeterian={recipe.isVegeterian}
          mealSize={recipe.mealSize}
          image={recipe.image}
        />
      ))}
    </ul>
  );
};

export default RecipesList;
