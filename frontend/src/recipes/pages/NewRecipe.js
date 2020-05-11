import React, { useState, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./NewRecipe.css";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ingredients: [...state.ingredients, { ingredient: action.ingredient }]
      };
    case "REMOVE":
      return {
        ingredients: state.ingredients.filter(si => {
          return si.ingredient.item !== action.i.ingredient.item;
        })
      };
    default:
      return state;
  }
};

const NewRecipe = () => {
  const [{ ingredients }, dispatch] = useReducer(reducer, { ingredients: [] });
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [item, setItem] = useState("");
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      mealSize: {
        value: "",
        isValid: false
      },
      mealType: {
        value: "",
        isValid: false
      }
    },
    false
  );

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

  const recipeSubmitHandler = event => {
    event.preventDefault();
    console.log({...formState.inputs, ingredients});
  };

  return (
    <React.Fragment>
      <h2>New Recipe Page</h2>
      <form className="recipe-form" onSubmit={recipeSubmitHandler}>
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
            id="mealType"
            name="mealType"
            type="radio"
            label="Vegetarian"
            validators={[]}
            errorText="Please select meal type."
            onInput={inputHandler}
            value={true}
          />
          <Input
            element="input"
            id="mealType"
            name="mealType"
            type="radio"
            label="Non-vegetarian"
            validators={[]}
            onInput={inputHandler}
            value={false}
          />
        </div>
        <div className="recipe-form__ingredients-list">
          <h2>Ingredients</h2>
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
          <Button onClick={handleAdd}>Add Ingredient</Button>
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          Add Recipe
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
