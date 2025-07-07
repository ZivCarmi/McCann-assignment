interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  return (
    <div className="checkbox-minimal">
      <input onClick={() => console.log("tesrt")} type="checkbox" {...props} />
      <span className="checkmark" />
    </div>
  );
};

export default Checkbox;
