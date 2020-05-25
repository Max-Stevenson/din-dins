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
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ingredients: state.inputs.ingredients.filter(si => {
            return si.item !== action.ingredient.item;
          })
        }
      };
    }
    case "ADD_METHOD": {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          method: [...state.inputs.method, action.methodStep]
        }
      };
    }
    case "REMOVE_METHOD": {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          method: state.inputs.method.filter(sm => {
            return sm.step !== action.methodStep.step;
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

  const methodInputHandler = useCallback(
    
    
    methodStep => {
      console.log("here");
      dispatch({ type: "ADD_METHOD", methodStep });
    },
    [dispatch]
  );

  const methodRemoveHandler = useCallback(
    methodStep => {
      dispatch({ type: "REMOVE_METHOD", step: methodStep });
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
    ingredientRemoveHandler,
    methodInputHandler,
    methodRemoveHandler
  ];
};
