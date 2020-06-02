import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./NewRecipe.css";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Tabs from "../../shared/components/UIElements/Tabs";

const NewRecipe = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [methodStep, setMethodStep] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [item, setItem] = useState("");
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
    false
  );

  const history = useHistory();

  const addIngredient = event => {
    event.preventDefault();

    let ing = { ingredient: { quantity, measure, item } };
    ingredientInputHandler(ing);
    setQuantity(0);
    setMeasure("");
    setItem("");
  };

  const removeIngredient = ingredient => {
    ingredientRemoveHandler(ingredient);
  };

  const addMethodStep = event => {
    event.preventDefault();

    let step = { step: methodStep };

    methodInputHandler(step);
    setMethodStep("");
  };

  const removeMethodStep = methodStep => {
    methodRemoveHandler(methodStep);
  };

  const recipeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        "http://localhost:3000/api/v1/recipes",
        "POST",
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

  return (
    <React.Fragment>
      <h2>New Recipe Page</h2>
      <ErrorModal error={error} onClear={clearError} />
      <form className="recipe-form" onSubmit={recipeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay={true} />}
        <Input
          element="input"
          id="title"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid recipe title."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="mealSize"
          type="number"
          label="meal size"
          validators={[VALIDATOR_MIN(1)]}
          errorText="Please enter a valid meal size."
          onInput={inputHandler}
        />
        <div className="recipe-form__meal-type">
          <Input
            element="input"
            id="isVegetarian"
            name="mealType"
            type="radio"
            label="Vegetarian"
            validators={[]}
            onInput={inputHandler}
            value="true"
          />
          <Input
            element="input"
            id="isVegetarian"
            name="mealType"
            type="radio"
            label="Non-vegetarian"
            validators={[]}
            onInput={inputHandler}
            value="false"
          />
        </div>
        <Tabs>
          <div className="recipe-form__ingredients-list" label="Ingredients">
            <h2>Ingredients</h2>
            <ul>
              {formState.inputs.ingredients &&
                formState.inputs.ingredients.value.map((i, idx) => (
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
          <div label="Method" className="recipe-form__method-list">
            <h2>Method</h2>
            <ol>
              {formState.inputs.method &&
                formState.inputs.method.value.map((m, idx) => (
                  <li key={idx}>
                    {m.step}
                    <button
                      onClick={event => {
                        event.preventDefault();
                        removeMethodStep(m);
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
        <Button type="submit" disabled={!formState.isValid}>
          Add Recipe
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
