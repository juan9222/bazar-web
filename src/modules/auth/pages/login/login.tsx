import React from "react";
import Button from "../../../common/components/button";
import "../../../common/components/button/styles/index.css";

const Login: React.FC<any> = (props) => {
  const {} = props;

  const handleButtonClick = (event: React.MouseEvent) => {
    console.log("Button click event!", event);
  };

  return (
    <div>
      <p>Login</p>
      <Button onClick={handleButtonClick}>Test Button</Button>
      <Button isDisabled={true}>Test Button 2</Button>
    </div>
  );
};

export default Login;
