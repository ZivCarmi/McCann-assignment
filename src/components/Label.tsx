import React from "react";
import "./label.css";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ className = "", ...props }) => {
  const labelClasses = `label ${className}`;

  return <label className={labelClasses} {...props} />;
};

export default Label;
