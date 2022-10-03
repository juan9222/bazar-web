import React from "react";
import Button from "../../../common/components/button";
import { EBtnVisibleType } from "../../../common/components/button/interfaces";

const Login: React.FC<any> = (props) => {
  const { } = props;

  const handleButtonClick = (event: React.MouseEvent) => {
    console.log("Button click event!", event);
  };

  return (
    <div>
      <p>Login</p>
      <Button onClick={ handleButtonClick }>Button</Button>
      <br />
      <br />
      <Button isDisabled>Button Disabled</Button>
      <br />
      <br />
      <Button visibleType={ EBtnVisibleType.outline }>Button Outline</Button>
      <br />
      <br />
      <Button disabled visibleType={ EBtnVisibleType.outline }>Button Outline Disabled</Button>
      <br />
      <br />
      <Button visibleType={ EBtnVisibleType.clear }>Button Outline</Button>
      <br />
      <br />
      <Button disabled visibleType={ EBtnVisibleType.clear }>Button Outline Disabled</Button>
    </div>
  );
};

export default Login;
