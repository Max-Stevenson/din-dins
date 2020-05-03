import React from "react";
import "./RecipesItem.css";

const RecipesItem = props => {
  return (
    <li className="recipe-item">
      <div className="recipe-item__content">
      <div className="recipe-item__header">
        <h2>{props.name}</h2>
      </div>
        <div className="recipe-item__image">
          <img src={props.image} alt={props.name}/>
        </div>
        <div className="recipe-item__details">
          <div className="recipe-item__meal-info">
            <span>{props.isVegetarian}</span>
            <span>{props.mealSize}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default RecipesItem;
