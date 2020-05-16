import React from "react";
import "./RecipesList.css";
import RecipesItem from "./RecipesItem";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const RecipesList = props => {
  if (props.recipes.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No recipes found</h2>
          <Button to="/recipes/new">Create Recipe</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="recipes-list">
      {props.recipes.map(recipe => (
        <RecipesItem
          key={recipe.id}
          id={recipe.id}
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
