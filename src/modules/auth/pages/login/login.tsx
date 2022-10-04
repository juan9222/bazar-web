import React from "react";
import IconLogo from '../../../../assets/svg/icons/iconLogo';
import Button from "../../../common/components/button";
import InputText from "../../../common/components/inputText";
import { ELarge } from "../../../common/interfaces";
import useLogin from './hooks/useLogin';

const Login: React.FC = () => {
  const { isTabletWidthOrLess, register,
    handleSubmit,
    onSubmitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    showPassword,
    handleToggleShowPassword, } = useLogin();

  return (
    <div className="loginContainer">
      <div className="loginContainer__logo">
        <IconLogo color={ isTabletWidthOrLess() ? "#FFF" : undefined } />
      </div>
      <div className="loginContainer__titleAndSubTitle">
        <h1 className="loginContainer__titleAndSubTitle-title">Login</h1>
        <h2 className="loginContainer__titleAndSubTitle-subtitle">Welcome, please enter your credentials</h2>
      </div>
      <form onSubmit={ handleSubmit(onSubmitForm) }>
        <InputText
          register={ register }
          name={ assignInputName("email") }
          label={ "Email" }
          type={ "email" }
          hasError={ hasErrorsInput("email") }
          errorMessage={ getMessageErrorInput("email") }
          autoCapitalize={ "off" }
          placeholder={ "Enter email" }
          autoComplete={ "off" } />
        <InputText
          register={ register }
          name={ assignInputName("password") }
          label={ "Password" }
          type={ showPassword ? "text" : "password" }
          hasError={ hasErrorsInput("password") }
          errorMessage={ getMessageErrorInput("password") }
          autoCapitalize={ "off" }
          placeholder={ "Enter password" }
          autoComplete={ "off" }
          icon={
            <p className="inputTextIconText">{ showPassword ? "Hide" : "Show" }</p>
          }
          onClickIcon={ handleToggleShowPassword } />
        <p className="textAlignEnd">
          <a href="/" className="textPrimary200 textLink">Forgot password</a>
        </p>
        <div className="loginContainer__buttonSubmit">
          <Button large={ ELarge.full } type="submit">Login</Button>
        </div>
        <div className="loginContainer__dontHaveAccount">
          <p className="defaultText textNeutral200 textAlignCenter">
            Don't have an account? <a href="/" className="textPrimary200 textLink">Register</a>
          </p>
        </div>
        <div className="loginContainer__tAndC">
          <p className="smallText textNeutral200 textAlignCenter">
            By continuing, I confirm that I agree to the <a href="/" className="textPrimary200 textLink">Terms of Use</a> and <a href="/" className="textPrimary200 textLink">Privacy Policy</a> .
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
