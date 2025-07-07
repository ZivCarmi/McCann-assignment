import type { FormErrors, FormState } from "./useFormReducer";

export const validateForm = (data: FormState): FormErrors => {
  const errors: FormErrors = {};

  if (!data.fullname.trim()) {
    errors.fullname = "יש להזין שם מלא";
  }

  if (!data.tel.match(/^05[0-9]{8}$/)) {
    errors.tel = "מספר טלפון לא תקין";
  }

  if (!data.city) {
    errors.city = "בחרו עיר מהרשימה";
  }

  if (!data.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errors.email = "אימייל לא תקין";
  }

  return errors;
};
