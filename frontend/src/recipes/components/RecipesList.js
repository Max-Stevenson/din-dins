import React from "react";
import "./RecipesList.css";
import RecipesItem from "./RecipesItem";
import Card from "../../shared/components/UIElements/Card";

const RecipesList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No recipes found</h2>
        </Card>
      </div>
    );
  }

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
