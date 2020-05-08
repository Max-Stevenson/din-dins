import React from "react";
import Input from "../../shared/components/FormElements/Input";
import "./NewRecipe.css";

const NewRecipe = () => {
  return (
    <React.Fragment>
      <h2>New Recipe Page</h2>
      <form className="recipe-form">
        <Input
          element="input"
          type="text"
          label="Title"
          validators={[]}
          errorText="Please enter valid recipe title."
        />
      </form>
    </React.Fragment>
  );
};

export default NewRecipe;
