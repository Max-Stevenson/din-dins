import React, { useEffect, useState } from "react";
import RecipesList from "../components/RecipesList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Recipes = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedRecipes, setLoadedRecipes] = useState();

  useEffect(() => {    
    const fetchRecipes = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:3000/api/v1/recipes"
        );
        setLoadedRecipes(responseData.recipes);
      } catch (err) {        
      }
    };
    fetchRecipes();    
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <h2>Recipes Page</h2>
      {!isLoading && loadedRecipes && <RecipesList recipes={loadedRecipes} />}
    </React.Fragment>
  );
};

export default Recipes;
