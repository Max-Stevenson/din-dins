import React from "react";
import { useParams } from "react-router-dom";
import Tabs from "../../shared/components/UIElements/Tabs";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import "./Recipe.css";

const testItems = [
  {
    mealSize: 2,
    image:
      "https://images-gmi-pmc.edge-generalmills.com/7d6f3a8e-2eca-4c61-8988-489b40546395.jpg",
    ingredients: ["Chicken", "Vegetables"],
    method: ["Season chicken.", "Cook at 220c for 1.5 hours."],
    id: "5eaecf2a95ab162c225464c5",
    title: "Chicken Dinner",
    isVegetarian: false,
    __v: 0
  },
  {
    mealSize: 3,
    image:
      "https://realfood.tesco.com/media/images/Burger-31LGH-a296a356-020c-4969-86e8-d8c26139f83f-0-1400x919.jpg",
    ingredients: ["beef", "buns"],
    method: ["Make Burger.", "Cook at 220c for 20 mins."],
    id: "7eaecf2a95ab162c225464a6",
    title: "Burgers",
    isVegetarian: false,
    __v: 0
  }
];

const Recipe = () => {
  const recipeId = useParams().recipeId;

  const identifiedRecipe = testItems.find(p => p.id === recipeId);

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
          onInput={() => {}}
          value={identifiedRecipe.title}
          valid={true}
        />
        <Tabs>
          <div label="Ingredients">
            <ul>
              {identifiedRecipe.ingredients.map(ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div label="Method">
            <ul>
              {identifiedRecipe.method.map(step => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </Tabs>
        <Button type="submit" disabled={true}>Update Recipe</Button>
      </form>
    </div>
  );
};

export default Recipe;
