import React from "react";
import { FaLeaf, FaDrumstickBite, FaUtensils } from "react-icons/fa";
import "./RecipesItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

const RecipesItem = props => {
  return (
    <li className="recipe-item">
      <Card className="recipe-item__content">
        <div className="recipe-item__header">
          <h2>{props.title}</h2>
        </div>
        <div className="recipe-item__image">
          <img src={props.image} alt={props.title} />
        </div>
        <div className="recipe-item__meal-info">
          <div className="recipe-item__info-container">
            {props.isVegetarian === true ? (
              <span className="recipe-item__logo-container">
                <FaLeaf className="recipe-item__logo" />
                Vegetarian
              </span>
            ) : (
              <span className="recipe-item__logo-container">
                <FaDrumstickBite className="recipe-item__logo" />
                Meat
              </span>
            )}
          </div>
          <div className="recipe-item__info-container">
            <span className="recipe-item__logo-container">
              <FaUtensils className="recipe-item__logo" />
              {props.mealSize}
            </span>
          </div>
        </div>
        <div className="recipe-item__actions">
          <Button to={`/recipes/${props.id}`}>Edit Recipe</Button>
          <Button>Delete Recipe</Button>
        </div>
      </Card>
    </li>
  );
};

export default RecipesItem;
