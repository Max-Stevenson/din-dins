import React from "react";
import { useParams } from "react-router-dom";

const Recipe = () => {
  const recipeId = useParams().recipeId;
  return (
    <div>
      <h2>Recipe Page</h2>
      <p>{recipeId}</p>
    </div>
  );
};

export default Recipe;
