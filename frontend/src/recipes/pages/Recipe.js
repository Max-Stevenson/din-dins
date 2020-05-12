import React from "react";
import { useParams } from "react-router-dom";
import Tabs from "../../shared/components/UIElements/Tabs";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../shared/util/validators";
import "./Recipe.css";
import { useForm } from "../../shared/hooks/form-hook";

const testItems = [
  {
    mealSize: 2,
    image:
      "https://images-gmi-pmc.edge-generalmills.com/7d6f3a8e-2eca-4c61-8988-489b40546395.jpg",
    ingredients: [
      { ingredient: { quantity: 1, measure: "cup", item: "flour" } },
      { ingredient: { quantity: 2, measure: "", item: "carrots" } }
    ],
    method: [{ step: "prehead oven" }, { step: "cook" }],
    id: "5eaecf2a95ab162c225464c5",
    title: "Chicken Dinner",
    isVegetarian: false,
    __v: 0
  },
  {
    mealSize: 3,
    image:
      "https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg",
    ingredients: [
      { ingredient: { quantity: 1, measure: "cup", item: "flour" } },
      { ingredient: { quantity: 2, measure: "", item: "carrots" } }
    ],
    method: [{ step: "prehead oven" }, { step: "cook" }],
    id: "7eaecf2a95ab162c225464a6",
    title: "Burgers",
    isVegetarian: false,
    __v: 0
  }
];

const Recipe = () => {
  const recipeId = useParams().recipeId;

  const identifiedRecipe = testItems.find(p => p.id === recipeId);

  const [formState, inputHandler] = useForm(
    { title: { value: identifiedRecipe.title, isValid: true } },
    true
  );

  if (!identifiedRecipe) {
    return (
      <div className="center">
        <h2>Could not find recipe!</h2>
      </div>
    );
  }
  return (
    <div>
      <h2>Recipe Page</h2>
      <form className="recipe-form">
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter valid recipe title."
          onInput={inputHandler}
          value={identifiedRecipe.title}
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
          value={identifiedRecipe.mealSize}
          valid={true}
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
        <Tabs>
          <div label="Ingredients">
            <ul>
              {identifiedRecipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>
                  {ingredient.ingredient.quantity}{" "}
                  {ingredient.ingredient.measure} {ingredient.ingredient.item}
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
        <Button type="submit" disabled={true}>
          Update Recipe
        </Button>
      </form>
    </div>
  );
};

export default Recipe;
