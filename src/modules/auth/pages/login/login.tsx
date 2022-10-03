import React from "react";
import IconLogo from '../../../../assets/svg/icons/iconLogo';
import useLogin from './hooks/useLogin';

const Login: React.FC<any> = (props) => {
  const { } = props;
  const { isTabletWidthOrLess } = useLogin();
  const handleButtonClick = (event: React.MouseEvent) => {
    console.log("Button click event!", event);
  };

  return (
    <div className="loginContainer">
      <div className="loginContainer__logo">
        <IconLogo color={ isTabletWidthOrLess() ? "#FFF" : undefined } />
      </div>
      <div className="loginContainer__titleAndSubTitle">
        <h1 className="loginContainer__titleAndSubTitle-title">Login</h1>
        <h2 className="loginContainer__titleAndSubTitle-subtitle">Welcome, please enter your credentials</h2>
      </div>
    </div>
  );
};

export default Login;
