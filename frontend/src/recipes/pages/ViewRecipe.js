import React, { useState, useEffect } from "react";
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
      )}
    </React.Fragment>
  );
};

export default ViewRecipe;
