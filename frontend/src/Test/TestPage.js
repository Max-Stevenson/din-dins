import React, { useState, useReducer, useEffect } from "react";
import { format, formatDistance, formatRelative, addDays } from "date-fns";
import Button from "../shared/components/FormElements/Button";
import "./TestPage.css";
import Modal from "../shared/components/UIElements/Modal";
import RecipesList from "../recipes/components/RecipesList";

const TEST_DATA = [
  {
    mealSize: 2,
    _id: "5ec13c8319a4052774dd30b7",
    title: "Chicken Winner",
    isVegetarian: "false",
    image:
      "https://images-gmi-pmc.edge-generalmills.com/7d6f3a8e-2eca-4c61-8988-489b40546395.jpg",
    ingredients: [
      {
        ingredient: {
          quantity: 1,
          measure: "",
          item: "whole chicken"
        },
        _id: "5ec13c8319a4052774dd30b8"
      }
    ],
    method: [
      {
        _id: "5ec13c8319a4052774dd30b9",
        step: "preheat oven"
      }
    ],
    __v: 0
  },
  {
    mealSize: 2,
    _id: "5ec13c8319a4052774dd30b7",
    title: "Chicken Winner",
    isVegetarian: "false",
    image:
      "https://images-gmi-pmc.edge-generalmills.com/7d6f3a8e-2eca-4c61-8988-489b40546395.jpg",
    ingredients: [
      {
        ingredient: {
          quantity: 1,
          measure: "",
          item: "whole chicken"
        },
        _id: "5ec13c8319a4052774dd30b8"
      }
    ],
    method: [
      {
        _id: "5ec13c8319a4052774dd30b9",
        step: "preheat oven"
      }
    ],
    __v: 0
  }
];

const Day = props => {
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [plannedRecipe, setPlannedRecipe] = useState("TEST RECIPE");

  const showRecipeModalHandler = () => {
    setShowRecipeModal(true);
    document.body.style.overflow = "hidden";
  };

  const cancelRecipeModalHandler = () => {
    setShowRecipeModal(false);
    document.body.style.overflow = 'unset';

  };

  return (
    <React.Fragment>
      <Modal
        show={showRecipeModal}
        onCanel={cancelRecipeModalHandler}
        header="Recipes"
        contentClass="recipe-list__modal-content"
        footerClass="recipe-list__modal-actions"
        footer={
          <React.Fragment>
            <Button onClick={cancelRecipeModalHandler}>Close</Button>
          </React.Fragment>
        }
      >
        <RecipesList recipes={TEST_DATA} />
      </Modal>
      <div className="day-container" onClick={showRecipeModalHandler}>
        {props.date}
        <div className="day-container__recipe">
          {plannedRecipe && plannedRecipe}
        </div>
      </div>
    </React.Fragment>
  );
};

const TestPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const nextDay = addDays(currentDate, 1);

  useEffect(() => {
    console.log(nextDay);
  }, []);
  return (
    <div>
      <h2>TestPage</h2>
      <div className="root-element">
        <Day date={format(currentDate, "dd-MMM")} />
        <Day date={format(nextDay, "dd-MMM")} />
      </div>
    </div>
  );
};

export default TestPage;
