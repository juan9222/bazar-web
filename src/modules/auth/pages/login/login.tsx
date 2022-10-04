import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../common/components/button";
import InputText from "../../../common/components/inputText";
import { ELarge } from "../../../common/interfaces";
import AuthlayoutContent from "../../layouts/authLayoutContent";
import useLogin from './hooks/useLogin';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    onSubmitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    showPassword,
    handleToggleShowPassword, } = useLogin();

  return (
    <AuthlayoutContent title={ "Login" } subtitle={ "Welcome, please enter your credentials." }>
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
          <Link to="/auth/forgot-password" className="textPrimary200 textLink">Forgot password</Link>
        </p>
        <div className="loginContainer__buttonSubmit">
          <Button large={ ELarge.full } type="submit">Login</Button>
        </div>
        <div className="loginContainer__dontHaveAccount">
          <p className="defaultText textNeutral200 textAlignCenter">
            Don't have an account? <Link to="/auth/register" className="textPrimary200 textLink">Register</Link>
          </p>
        </div>
        <div className="loginContainer__tAndC">
          <p className="smallText textNeutral200 textAlignCenter">
            By continuing, I confirm that I agree to the <a href="/" className="textPrimary200 textLink">Terms of Use</a> and <a href="/" className="textPrimary200 textLink">Privacy Policy</a> .
          </p>
        </div>
      </form>
    </AuthlayoutContent>
  );
};

export default Login;
