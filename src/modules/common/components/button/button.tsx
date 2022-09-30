import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "./styles/index.css";

export interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const Button: React.FC<IButtonProps> = (props) => {
  const { children, isDisabled = false, onClick, ...rest } = props;
  return (
    <button
      className={isDisabled ? "btnContainer__disable" : "btnContainer"}
      data-testid="test-button"
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
