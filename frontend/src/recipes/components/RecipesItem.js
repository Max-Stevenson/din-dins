import React, { useState } from "react";
import { FaLeaf, FaDrumstickBite, FaUtensils } from "react-icons/fa";
import "./RecipesItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";

const RecipesItem = props => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    console.log("derezzed");
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCanel={cancelDeleteHandler}
        header={props.title}
        contentClass="recipe-item__modal-content"
        footerClass="recipe-item__modal-actions"
        footer={
          <React.Fragment>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
            <Button onClick={cancelDeleteHandler}>Cancel</Button>
          </React.Fragment>
        }
      >
        <div className="recipe-item__delete-confirmation">
          <p>Are you sure you want to delete this recipe?</p>
        </div>
      </Modal>
      <li className="recipe-item">
        <Card className="recipe-item__content">
          <div className="recipe-item__header">
            <h2>{props.title}</h2>
          </div>
          <div className="recipe-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="recipe-item__meal-info">
            <div className="recipe-item__info-container">
              {props.isVegetarian === true ? (
                <span className="recipe-item__logo-container">
                  <FaLeaf className="recipe-item__logo" />
                  Vegetarian
                </span>
              ) : (
                <span className="recipe-item__logo-container">
                  <FaDrumstickBite className="recipe-item__logo" />
                  Meat
                </span>
              )}
            </div>
            <div className="recipe-item__info-container">
              <span className="recipe-item__logo-container">
                <FaUtensils className="recipe-item__logo" />
                {props.mealSize}
              </span>
            </div>
          </div>
          <div className="recipe-item__actions">
            <Button to={`/recipes/${props.id}`}>Edit Recipe</Button>
            <Button onClick={showDeleteWarningHandler}>Delete Recipe</Button>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default RecipesItem;
