import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./NewRecipe.css";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../shared/util/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (let inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid }
        },
        isValid: formIsValid
      };

    default:
      return state;
  }
};

const NewRecipe = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false
      },
      mealSize: {
        value: "",
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id
      });
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <h2>New Recipe Page</h2>
      <form className="recipe-form">
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
            id="veg"
            name="mealType"
            type="radio"
            label="Vegetarian"
            validators={[]}
            errorText="Please select meal type."
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="nonVeg"
            name="mealType"
            type="radio"
            label="Non-vegetarian"
            validators={[]}
            onInput={inputHandler}
          />
        </div>
        <Button type="submit" disabled={!formState.isValid}>
          Add Recipe
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
