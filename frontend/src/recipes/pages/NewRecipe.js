import React, { useCallback } from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewRecipe.css";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

const NewRecipe = () => {
  const titleInputHandler = useCallback((id, value, isValid) => {}, []);

  return (
    <React.Fragment>
      <h2>New Recipe Page</h2>
      <form className="recipe-form">
        <Input
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid recipe title."
          onInput={titleInputHandler}
        />
        <label htmlFor="quantity">Number of meals:</label>
        <input type="number" id="quantity" name="quantity" min="1" />

        <label for="vegetarian">Vegetarian</label>
        <input type="radio" id="vegetarian" name="meatType" value="vegetarian" />
        <label for="non-vegetarian">Non-vegetarian</label>
        <input type="radio" id="non-vegetarian" name="meatType" value="non-vegetarian" />
        
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
