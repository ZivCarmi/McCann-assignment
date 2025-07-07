import React from "react";
import "./button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  className = "",
  asChild = false,
  ...props
}) => {
  const buttonClasses = `btn btn-${variant} ${className}`;

  if (asChild) {
    // Clone the child element and apply button styles to it
    const child = React.Children.only(children) as React.ReactElement<any>;
    return React.cloneElement(child, {
      className: `${buttonClasses} ${child.props.className || ""}`,
      ...props,
    });
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
