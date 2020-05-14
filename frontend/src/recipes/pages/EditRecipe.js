import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import Tabs from "../../shared/components/UIElements/Tabs";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_REQUIRE, VALIDATOR_MIN } from "../../shared/util/validators";
import "./EditRecipe.css";
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
    isVegetarian: "false",
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
    isVegetarian: "false",
    __v: 0
  }
];

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
  const recipeId = useParams().recipeId;
  const identifiedRecipe = testItems.find(p => p.id === recipeId);

  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [item, setItem] = useState("");

  const [{ ingredients, method }, dispatch] = useReducer(reducer, {
    ingredients: identifiedRecipe.ingredients,
    method: identifiedRecipe.method
  });

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: { value: "", isValid: false },
      mealSize: { value: "", isValid: false },
      isVegetarian: { value: "false", isValid: false }
    },
    false
  );

  useEffect(() => {
    setFormData(
      {
        title: { value: identifiedRecipe.title, isValid: true },
        mealSize: { value: identifiedRecipe.mealSize, isValid: true },
        isVegetarian: { value: identifiedRecipe.isVegetarian, isValid: true }
      },
      true
    );
  }, [setFormData, identifiedRecipe]);

  const recipeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log({...formState.inputs, ingredients});
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

  if (!identifiedRecipe) {
    return (
      <div className="center">
        <h2>Could not find recipe!</h2>
      </div>
    );
  }

  if (!formState.inputs.title.value) {
    return (
      <div className="center">
        <h2>Loading...</h2>
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
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        <Input
          element="input"
          id="mealSize"
          type="number"
          label="meal size"
          validators={[VALIDATOR_MIN(1)]}
          errorText="Please enter a valid meal size."
          onInput={inputHandler}
          value={formState.inputs.mealSize.value}
          valid={formState.inputs.mealSize.isValid}
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
              {identifiedRecipe.method.map((step, idx) => (
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
    </div>
  );
};

export default Recipe;
