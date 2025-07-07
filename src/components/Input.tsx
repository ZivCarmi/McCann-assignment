import React from "react";
import "./input.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  const inputClasses = `input ${className}`;

  return <input className={inputClasses} {...props} />;
};

export const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="input-container">{children}</div>;
};

export default Input;
