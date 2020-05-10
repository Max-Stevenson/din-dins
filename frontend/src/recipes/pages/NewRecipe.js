import React from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./NewRecipe.css";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const NewRecipe = () => {
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

  const recipeSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
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
        <Input
          element="textarea"
          id="ingredients"
          name="ingredientsList"
          label="Ingredients"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter ingreidents, separated by commas."
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          id="method"
          name="methodList"
          label="Cooking Method"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter cooking steps, separated by commas."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Recipe
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
