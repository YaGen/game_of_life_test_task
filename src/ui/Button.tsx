import * as React from "react";

export interface ButtonProps {
  onClick: Function;
  label: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label }) => {
  return (
    <div className="button" onClick={(event) => onClick(event)}>
      {label}
    </div>
  );
};

export default Button;
