import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../../shared/components/UIElements/Tabs";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./EditRecipe.css";
import { useForm } from "../../shared/hooks/form-hook";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        ingredients: [...state.ingredients, { ingredient: action.ingredient }]
      };
    case "REMOVE":
      return {
        ...state,
        ingredients: state.ingredients.filter(si => {
          return si.ingredient.item !== action.i.ingredient.item;
        })
      };
    case "ADD_METHOD":
      return {
        ...state,
        method: [...state.method, { step: action.methodStep }]
      };
    default:
      return state;
  }
};

const Recipe = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      mealSize: { value: "", isValid: false },
      isVegetarian: { value: "false", isValid: false }
    },
    false
  );
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedRecipe, setLoadedRecipe] = useState();
  const recipeId = useParams().recipeId;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/recipes/${recipeId}`
        );
        console.log(responseData);
        
        setLoadedRecipe(responseData.recipe);
        setFormData(
          {
            title: { value: responseData.recipe.title.value, isValid: true },
            mealSize: { value: responseData.recipe.mealSize.value, isValid: true },
            isVegetarian: {
              value: responseData.recipe.isVegetarian.value,
              isValid: true
            }
          },
          true
        );
      } catch (err) {}
    };
    fetchRecipe();
  }, [sendRequest, recipeId, setFormData]);

  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [item, setItem] = useState("");

  const [{ ingredients, method }, dispatch] = useReducer(reducer, {
    ingredients: loadedRecipe.ingredients,
    method: loadedRecipe.method
  });

  const recipeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log({ ...formState.inputs, ingredients });
  };

  const handleAdd = e => {
    e.preventDefault();
    dispatch({
      type: "ADD_ITEM",
      ingredient: { quantity, measure, item }
    });
    setQuantity(0);
    setMeasure("");
    setItem("");
  };

  if (!loadedRecipe && !error) {
    return (
      <div className="center">
        <h2>Could not find recipe!</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div>
        <h2>Recipe Page</h2>
        {!isLoading && loadedRecipe && (
          <form className="recipe-form">
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter valid recipe title."
              onInput={inputHandler}
              value={loadedRecipe.title}
              valid={true}
            />
            <Input
              element="input"
              id="mealSize"
              type="number"
              label="meal size"
              validators={[VALIDATOR_MIN(1)]}
              errorText="Please enter a valid meal size."
              onInput={inputHandler}
              value={loadedRecipe.mealSize}
              valid={true}
            />
            <Tabs>
              <div label="Ingredients">
                <ul>
                  {ingredients.map((i, idx) => (
                    <li key={idx}>
                      {i.ingredient.quantity} {i.ingredient.measure}{" "}
                      {i.ingredient.item}
                      <button
                        onClick={e => {
                          e.preventDefault();
                          dispatch({ type: "REMOVE", i });
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <label htmlFor="ingredientQuantity">Quantity</label>
                <input
                  type="number"
                  id="ingredientQuantity"
                  label="Quantity"
                  onChange={e => setQuantity(e.target.value)}
                  value={quantity}
                />
                <label htmlFor="ingredientMeasure">Measure</label>
                <input
                  type="text"
                  id="ingredientMeasure"
                  label="Measurement"
                  onChange={e => setMeasure(e.target.value)}
                  value={measure}
                />
                <label htmlFor="ingredient">ingredient</label>
                <input
                  type="text"
                  id="ingredient"
                  onChange={e => setItem(e.target.value)}
                  value={item}
                />
                <Button onClick={handleAdd}>Submit</Button>
              </div>
              <div label="Method">
                <ul>
                  {loadedRecipe.method.map((step, idx) => (
                    <li key={idx}>{step.step}</li>
                  ))}
                </ul>
              </div>
            </Tabs>
            <Button
              type="submit"
              disabled={!formState.isValid}
              onClick={recipeUpdateSubmitHandler}
            >
              Update Recipe
            </Button>
          </form>
        )}
      </div>
    </React.Fragment>
  );
};

export default Recipe;
