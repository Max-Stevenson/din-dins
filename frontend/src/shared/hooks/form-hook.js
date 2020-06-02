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
      console.log(action.inputs);
      
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
          ingredients: {value: [...state.inputs.ingredients.value, action.ingredient], isValid: true}
        },
        isValid: {...state.isValid}
      }
    }
    case "REMOVE_INGREDIENT": {      
      return {
        ...state,
        inputs: {
          ...state.inputs,
          ingredients: state.inputs.ingredients.value.filter(si => {
            return si.item !== action.ingredient.item;
          })
        },
        isValid: {...state.isValid}
      };
    }
    case "ADD_METHOD": {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          method: [...state.inputs.method.value, action.methodStep]
        },
        isValid: {...state.isValid}
      };
    }
    case "REMOVE_METHOD": {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          method: state.inputs.method.value.filter(sm => {
            return sm.step !== action.methodStep.step;
          })
        },
        isValid: {...state.isValid}
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
      dispatch({ type: "ADD_METHOD", methodStep });
    },
    [dispatch]
  );

  const methodRemoveHandler = useCallback(
    methodStep => {
      dispatch({ type: "REMOVE_METHOD", methodStep });
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
