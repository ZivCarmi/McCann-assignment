import { useState } from "react";
import Button from "./Button";
import Checkbox from "./Checkbox";
import ErrorMessage from "./ErrorMessage";
import Input, { InputContainer } from "./Input";
import Label from "./Label";
import Select from "./Select";
import "./form.css";

type FieldError = keyof typeof errorsState;
type PartialError = Partial<Record<FieldError, string>>;

const initialState = {
  fullname: "",
  mobile: "",
  city: "",
  email: "",
  newsletter: false,
};

const errorsState = {
  fullname: "",
  mobile: "",
  city: "",
  email: "",
};

const Form = ({
  setIsSuccess,
}: {
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState<PartialError>({});

  const handleSelectChange = (option: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, city: undefined }));
    setFields((prevFields) => ({
      ...prevFields,
      city: option,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { target } = e;

    if (target.type === "checkbox") {
      setFields((prevFields) => ({
        ...prevFields,
        newsletter: !prevFields.newsletter,
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [target.name]: target.value,
      }));
    }
  };

  const validation = () => {
    const foundErrors: PartialError = {};

    if (!fields.fullname.trim()) {
      foundErrors.fullname = "יש להזין שם מלא";
    }

    if (!fields.mobile.match(/^05[0-9]{8}$/) || fields.mobile.length > 10) {
      foundErrors.mobile = "מספר טלפון לא תקין";
    }

    if (!fields.city) {
      foundErrors.city = "בחרו עיר מהרשימה";
    }

    if (!fields.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      foundErrors.email = "אימייל לא תקין";
    }

    return foundErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validation();

    console.log();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    console.table(fields);

    setIsSuccess(true);
  };

  return (
    <div className="form-container">
      <form className="form" action="" onSubmit={handleSubmit} noValidate>
        <span className="instructions">כל השדות המסומנים ב-* הינם חובה</span>
        <div className="form-inputs">
          <InputContainer>
            <Label htmlFor="fullname">שם מלא*</Label>
            <Input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="שם מלא*"
              value={fields.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <ErrorMessage message={errors.fullname} />}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="mobile">נייד*</Label>
            <Input
              type="tel"
              name="mobile"
              id="mobile"
              placeholder="נייד*"
              value={fields.mobile}
              onChange={handleChange}
              maxLength={10}
            />
            {errors.mobile && <ErrorMessage message={errors.mobile} />}
          </InputContainer>
          <InputContainer>
            <Label className="select">
              <span>אולם תצוגה*</span>
              <Select
                name="city"
                onChange={(option) => handleSelectChange(option)}
              />
              {errors.city && <ErrorMessage message={errors.city} />}
            </Label>
          </InputContainer>
          <InputContainer>
            <Label htmlFor="email">מייל*</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="מייל*"
              value={fields.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage message={errors.email} />}
          </InputContainer>
          <InputContainer>
            <Label className="checkbox" htmlFor="newsletter">
              מאשר קבלת דיוור ותוכן שיווקי ופרסומי מהחברות השונות בקבוצת באמצעות
              סמס, וואטסאפ, דואר אלקטרוני, וחיוג אוטומטי. רשימת *החברות המפורטות
              במדיניות פרטיות של האתר
              <Checkbox
                id="newsletter"
                name="newsletter"
                onChange={handleChange}
              />
            </Label>
          </InputContainer>
        </div>
        <div className="form-buttons">
          <Button type="submit">חזרו אלי טלפונית</Button>
          <Button variant="outline" asChild>
            <a href="#">למינוי חודשי אונליין</a>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Form;
