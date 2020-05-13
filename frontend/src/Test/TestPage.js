import React, { useState, useReducer } from "react";
import Button from "../shared/components/FormElements/Button";
import "./TestPage.css";

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

const initialState = {
  title: "",
  mealSize: 1,
  isVegetarian: "false",
  ingredients: [],
  method: []
};

const TestPage = () => {
  const [{ ingredients }, dispatch] = useReducer(reducer, { ingredients: [] });
  const [quantity, setQuantity] = useState(0);
  const [measure, setMeasure] = useState("");
  const [item, setItem] = useState("");

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

  const handleInput = e => {};

  return (
    <React.Fragment>
      <h2>Test Page</h2>
      <label htmlFor="title">Recipe Title</label>
      <input type="text" id="title" onChange={handleInput} />
      <h2>Current Ingredients</h2>
      <ul>
        {ingredients.map((i, idx) => (
          <li key={idx}>
            {i.ingredient.quantity} {i.ingredient.measure} {i.ingredient.item}
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
    </React.Fragment>
  );
};

export default TestPage;
