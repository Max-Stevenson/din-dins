import React, { useState, useEffect } from "react";
import { FaLeaf, FaDrumstickBite, FaUtensils } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Tabs from "../../shared/components/UIElements/Tabs";

import "./ViewRecipe.css";

const ViewRecipe = () => {
  const recipeId = useParams().recipeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [identifiedRecipe, setIdentifiedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/recipes/${recipeId}`
        );
        setIdentifiedRecipe(responseData.recipe);
      } catch (err) {}
    };
    fetchRecipe();
  }, [sendRequest, recipeId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && identifiedRecipe && (
        <div className="identified-recipe__container">
          <h2 className="identified-recipe__header">
            {identifiedRecipe.title}
          </h2>
          <div className="identified-recipe__image-container">
            <img
              className="identified-recipe__image"
              src={identifiedRecipe.image}
              alt={identifiedRecipe.title}
            />
          </div>
          <div className="identified-recipe__info-container">
            <div className="identified-recipe__meal-type">
            {identifiedRecipe.isVegetarian === true ? (
              <span className="identified-recipe__logo-container">
                <FaLeaf className="identified-recipe__logo" />
                Vegetarian
              </span>
            ) : (
              <span className="identified-recipe__logo-container">
                <FaDrumstickBite className="identified-recipe__logo" />
                Non-Vegetarian
              </span>
            )}
            </div>
            <div className="identified-recipe__info-container">
              <span className="identified-recipe__logo-container">
                <FaUtensils className="identified-recipe__logo" />
                {identifiedRecipe.mealSize} {identifiedRecipe.mealSize > 1 ? "nights" : "night"}
              </span>
            </div>
          </div>
          <Tabs>
            <div label="Ingredients">
              <ul className="identified-recipe__ingredients-list">
                {identifiedRecipe.ingredients.map((i, idx) => (
                  <li className="identified-recipe__ingredient" key={idx}>
                    {i.ingredient.quantity} {i.ingredient.measure}{" "}
                    {i.ingredient.item}
                  </li>
                ))}
              </ul>
            </div>
            <div label="Method">
              <ol className="identified-recipe__method-list">
                {identifiedRecipe.method.map((step, idx) => (
                  <li className="identified-recipe__method" key={idx}>
                    {step.step}
                  </li>
                ))}
              </ol>
            </div>
          </Tabs>
        </div>
      )}
    </React.Fragment>
  );
};

export default ViewRecipe;
