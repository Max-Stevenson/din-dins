import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Tabs from "../../shared/components/UIElements/Tabs";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import "./EditRecipe.css";
import { useForm } from "../../shared/hooks/form-hook";

const Recipe = () => {
  const recipeId = useParams().recipeId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [methodStep, setMethodStep] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [item, setItem] = useState("");
  const [updatedIngredients, setUpdatedIngredients] = useState([]);
  const [updatedMethod, setUpdatedMethod] = useState([]);
  const [loadedRecipe, setLoadedRecipe] = useState();
  const [
    formState,
    inputHandler,
    setFormData,
    ingredientInputHandler,
    ingredientRemoveHandler,
    methodInputHandler,
    methodRemoveHandler
  ] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      mealSize: {
        value: "",
        isValid: false
      },
      isVegetarian: {
        value: "false",
        isValid: false
      },
      ingredients: { value: [], isValid: false },
      method: { value: [], isValid: false }
    },
    true
  );

  const history = useHistory();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3000/api/v1/recipes/${recipeId}`
        );
        setLoadedRecipe(responseData.recipe);
        setUpdatedIngredients(responseData.recipe.ingredients);
        setUpdatedMethod(responseData.recipe.method)
        setFormData(
          {
            title: { value: responseData.recipe.title, isValid: true },
            mealSize: {
              value: responseData.recipe.mealSize,
              isValid: true
            },
            isVegetarian: {
              value: responseData.recipe.isVegetarian,
              isValid: true
            },
            ingredients: {
              value: responseData.recipe.ingredients,
              isValid: true
            },
            method: { value: responseData.recipe.method, isValid: true }
          },
          true
        );
      } catch (err) {}
    };
    fetchRecipe();
  }, [sendRequest, recipeId, setFormData]);

  const recipeUpdateSubmitHandler = async event => {
    event.preventDefault();
    console.log(formState);
    
    try {
      await sendRequest(
        `http://localhost:3000/api/v1/recipes/${recipeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          mealSize: formState.inputs.mealSize.value,
          isVegetarian: formState.inputs.isVegetarian.value,
          ingredients: formState.inputs.ingredients.value,
          method: formState.inputs.method.value
        }),
        {
          "Content-Type": "application/json"
        }
      );
      history.push("/recipes");
    } catch (err) {}
  };

  const addIngredient = event => {
    event.preventDefault();

    let ing = { ingredient: { quantity, measure, item } };
    ingredientInputHandler(ing);
    setQuantity(0);
    setMeasure("");
    setItem("");
    setUpdatedIngredients([
      ...updatedIngredients,
      { ingredient: { quantity, measure, item } }
    ]);
  };

  const removeIngredient = ingredient => {
    ingredientRemoveHandler(ingredient);

    let filteredIngredients = updatedIngredients.filter(i => {
      return i.ingredient.item !== ingredient.item;
    });

    setUpdatedIngredients(filteredIngredients);
  };

  const addMethodStep = event => {
    event.preventDefault();

    let step = { step: methodStep };

    methodInputHandler(step);
    setUpdatedMethod([
      ...updatedMethod,
      { step: methodStep }
    ]);
    setMethodStep("");
  };

  const removeMethodStep = methodStep => { 
    methodRemoveHandler(methodStep);

    let filteredMethod = updatedMethod.filter(m => {
      return m.step !== methodStep.step;
    });

    setUpdatedMethod(filteredMethod);
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedRecipe && !error) {
    return (
      <div className="center">
        <h2>Could not find recipe!</h2>
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
                  {updatedIngredients.map((i, idx) => (
                    <li key={idx}>
                      {i.ingredient.quantity} {i.ingredient.measure}{" "}
                      {i.ingredient.item}
                      <button
                        onClick={event => {
                          event.preventDefault();
                          removeIngredient(i.ingredient);
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
                <Button onClick={addIngredient}>Add Ingredient</Button>
              </div>
              <div label="Method">
                <ol>
                  {updatedMethod.map((step, idx) => (
                    <li key={idx}>
                      {step.step}
                      <button
                        onClick={event => {
                          event.preventDefault();
                          removeMethodStep(step);
                        }}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ol>
                <div className="recipe-form__method-input">
                  <input
                    type="text"
                    id="method"
                    onChange={e => setMethodStep(e.target.value)}
                    value={methodStep}
                  />
                  <Button onClick={addMethodStep}>Add Method Step</Button>
                </div>
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
