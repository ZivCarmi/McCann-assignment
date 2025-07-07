import Button from "./Button";
import Checkbox from "./Checkbox";
import ErrorMessage from "./ErrorMessage";
import Input, { InputContainer } from "./Input";
import Label from "./Label";
import Select from "./Select";
import "./form.css";

const Form = () => {
  return (
    <div className="form-container">
      <form className="form" action="">
        <span className="instructions">כל השדות המסומנים ב-* הינם חובה</span>
        <div className="form-inputs">
          <InputContainer>
            <Label htmlFor="fullname">שם מלא*</Label>
            <Input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="שם מלא*"
            />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="mobile">נייד*</Label>
            <Input type="tel" name="mobile" id="mobile" placeholder="נייד*" />
            <ErrorMessage message="ניסיון" />
          </InputContainer>
          <Select />
          <InputContainer>
            <Label htmlFor="email">מייל*</Label>
            <Input type="email" name="email" id="email" placeholder="מייל*" />
          </InputContainer>
          <InputContainer>
            <Label className="checkbox" htmlFor="newsletter">
              מאשר קבלת דיוור ותוכן שיווקי ופרסומי מהחברות השונות בקבוצת באמצעות
              סמס, וואטסאפ, דואר אלקטרוני, וחיוג אוטומטי. רשימת *החברות המפורטות
              במדיניות פרטיות של האתר
              <Checkbox id="newsletter" name="newsletter" />
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
