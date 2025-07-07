import { useReducer } from "react";

export type FormState = {
  fullname: string;
  email: string;
  tel: string;
  city: string;
  newsletter: boolean;
  errors: FormErrors;
};

export type FormErrors = Partial<
  Record<keyof Omit<FormState, "errors">, string>
>;

type FormAction =
  | {
      type: "SET_FIELD";
      field: keyof Omit<FormState, "errors">;
      value: string | boolean;
    }
  | { type: "SET_ERRORS"; errors: FormErrors }
  | { type: "CLEAR_ERRORS" }
  | { type: "TOGGLE_NEWSLETTER" };

const initialFormState: FormState = {
  fullname: "",
  email: "",
  tel: "",
  city: "",
  newsletter: false,
  errors: {},
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "TOGGLE_NEWSLETTER":
      return {
        ...state,
        newsletter: !state.newsletter,
      };
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
        // errors: {
        //   ...state.errors,
        //   [action.field]: action.error,
        // },
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};

export function useFormReducer() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  // אפשר להוסיף פונקציות עזר כאן, לדוגמה:
  const setField = (
    field: keyof Omit<FormState, "errors">,
    value: string | boolean
  ) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const toggleNewsletter = () => {
    dispatch({ type: "TOGGLE_NEWSLETTER" });
  };

  const setErrors = (errors: FormErrors) => {
    dispatch({ type: "SET_ERRORS", errors });
  };

  const clearErrors = () => {
    dispatch({ type: "CLEAR_ERRORS" });
  };

  return { state, toggleNewsletter, setField, setErrors, clearErrors };
}
