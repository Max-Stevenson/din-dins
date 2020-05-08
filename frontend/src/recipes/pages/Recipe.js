import React from "react";
import { useParams } from "react-router-dom";
import Tabs from "../../shared/components/UIElements/Tabs";

const Recipe = () => {
  const recipeId = useParams().recipeId;
  return (
    <div>
      <h2>Recipe Page</h2>
      <p>{recipeId}</p>
      <Tabs>
        <div label="Ingredients">
          <ul>
            <li>Chicken</li>
            <li>Chips</li>
            <li>Salad</li>
          </ul>
        </div>
        <div label="Method">
          <ul>
            <li>Heat oven.</li>
            <li>Cut chicken.</li>
            <li>Cook food.</li>
          </ul>
        </div>
      </Tabs>
    </div>
  );
};

export default Recipe;
