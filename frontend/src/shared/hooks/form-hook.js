import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
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
    }
    case "SET_DATA": {
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    }
    case "ADD_INGREDIENT": {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ingredients: [...state.inputs.ingredients, action.ingredient]
        }
      };
    }

    case "REMOVE_INGREDIENT": {
      console.log("made it remove");
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ingredients: state.inputs.ingredients.filter(si => {
            console.log(action.ingredient);
            
            console.log(si.ingredient);

            return si.item !== action.ingredient.item;
          })
        }
      };
    }
    default: {
      return state;
    }
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
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

  const ingredientInputHandler = useCallback(
    ingredient => {
      dispatch({
        type: "ADD_INGREDIENT",
        ingredient: ingredient
      });
    },
    [dispatch]
  );

  const ingredientRemoveHandler = useCallback(
    ingredient => {
      dispatch({ type: "REMOVE_INGREDIENT", ingredient: ingredient });
    },
    [dispatch]
  );

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [
    formState,
    inputHandler,
    setFormData,
    ingredientInputHandler,
    ingredientRemoveHandler
  ];
};
