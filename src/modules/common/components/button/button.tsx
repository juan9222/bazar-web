import React from "react";
import { useButtonStyles } from "./hooks/useButtonStyles";
import { IButtonProps } from "./interfaces";

const Button: React.FC<IButtonProps> = (props) => {
  const { children, isDisabled = false, onClick, iconLeft, iconRight, large, ...rest } = props;
  const { getClassNameByVisibleType } = useButtonStyles(props);
  return (
    <button
      className={ getClassNameByVisibleType() }
      data-testid="test-button"
      disabled={ isDisabled }
      onClick={ onClick }
    >
      { iconLeft && <div className="iconLeftContainer">
        { iconLeft }
      </div> }
      { children }
      { iconRight && <div className="iconRightContainer">
        { iconRight }
      </div> }
    </button>
  );
};

export default Button;
