import { AiFillCheckCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "../../../common/components/button";
import InputText from "../../../common/components/inputText";
import { ELarge } from "../../../common/interfaces";
import AuthlayoutContent from "../../layouts/authLayoutContent";
import useForgotPassword from "./hooks/useForgotPassword";
import { useNavigate } from 'react-router-dom';
import { EBtnVisibleType } from "../../../common/components/button/interfaces";
import { EForgotPasswordSteps } from '../../interfaces';
import { BiMailSend } from "react-icons/bi";
import { RiMailCloseLine } from "react-icons/ri";

const ForgotPassword: React.FC = () => {
  const {
    showPassword1,
    handleToggleShowPassword1,
    showPassword2,
    handleToggleShowPassword2,
    handleSubmitStep3,
    controlStep1,
    controlStep3,
    assignInputNameStep1,
    assignInputNameStep3,
    hasErrorsInputStep1,
    hasErrorsInputStep3,
    getMessageErrorInputStep1,
    getMessageErrorInputStep3,
    onSubmitFormStep3,
    handleSubmitStep1,
    onSubmitFormStep1,
    isValidStep1,
    isValidStep3,
    loadingStep1,
    screen,
    hasError,
    handleTryOtherEmail,
  } = useForgotPassword();

  const navigate = useNavigate();

  const Step1 = () => {
    return (
      <AuthlayoutContent title={ "Reset password" } subtitle={ "Enter the email associated with your account and we’ll send an email with instructions to reset your password" }>
        <form onSubmit={ handleSubmitStep1(onSubmitFormStep1) }>
          <InputText
            control={ controlStep1 }
            name={ assignInputNameStep1("email") }
            label={ "Email" }
            hasError={ hasErrorsInputStep1("email") }
            errorMessage={ getMessageErrorInputStep1("email") }
            autoCapitalize={ "off" }
            placeholder={ "Enter email" }
            autoComplete={ "off" }
            required />
          <div className="verticalSpaceL" />
          <Button disabled={ !isValidStep1 } large={ ELarge.full } type="submit">{ loadingStep1 ? (
            <AiOutlineLoading3Quarters className="loaderIcon" />

          ) : "Send link" }</Button>
          <div className="verticalSpaceL" />
          <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } onClick={ () => { navigate('/auth/login'); } }>Cancel</Button>
        </form>
      </AuthlayoutContent >
    );
  };

  const Step2 = () => {
    const iconStyle = { width: 75, height: 75, color: "#64748b" };
    const labelStyle = {
      fontSize: 20, fontWeight: "600", color: hasError ? "#ef4444" : "#52b69a"
    };
    return (
      <AuthlayoutContent title={ "Reset password" } subtitle={ hasError ? "Sorry something went wrong, please try again, or contact suport@bazar.network." : "Enter the email associated with your account and we’ll send an email with instructions to reset your password" }>
        <div className="verticalSpaceS" />
        <div className="textAlignCenter">
          { hasError ? <RiMailCloseLine style={ iconStyle } /> : <BiMailSend style={ iconStyle } /> }
          <p style={ labelStyle }>{ hasError ? "Link could not be sent" : <span>Link sent <AiFillCheckCircle className="otpStatus__verified--icon" /></span> }</p>
        </div>
        <Button onClick={ () => { navigate('/auth/login'); } } large={ ELarge.full }>Return login</Button>
        <div className="loginContainer__tAndC">
          <p className="defaultText textNeutral200 textAlignCenter">
            { hasError ? "Try again, or " : "Did not receive the email? Check your spam filter, or" }
            <p onClick={ handleTryOtherEmail } className="textPrimary200 textLink"> try another email address</p>
          </p>
        </div>
      </AuthlayoutContent >
    );
  };

  const Step3 = () => {
    return (
      <AuthlayoutContent title={ "Reset password" } subtitle={ "Please enter your new password." }>
        <form onSubmit={ handleSubmitStep3(onSubmitFormStep3) }>
          <InputText
            control={ controlStep3 }
            name={ assignInputNameStep3("password") }
            label={ "Password" }
            type={ showPassword1 ? "text" : "password" }
            hasError={ hasErrorsInputStep3("password") }
            errorMessage={ getMessageErrorInputStep3("password") }
            autoCapitalize={ "off" }
            placeholder={ "Enter password" }
            autoComplete={ "off" }
            required
            icon={
              <p className="inputTextIconText">{ showPassword1 ? "Hide" : "Show" }</p>
            }
            onClickIcon={ handleToggleShowPassword1 } />
          <InputText
            control={ controlStep3 }
            name={ assignInputNameStep3("confirmPassword") }
            label={ "Confirm password" }
            type={ showPassword2 ? "text" : "password" }
            hasError={ hasErrorsInputStep3("confirmPassword") }
            errorMessage={ getMessageErrorInputStep3("confirmPassword") }
            autoCapitalize={ "off" }
            placeholder={ "Enter confirm password" }
            autoComplete={ "off" }
            required
            icon={
              <p className="inputTextIconText">{ showPassword2 ? "Hide" : "Show" }</p>
            }
            onClickIcon={ handleToggleShowPassword2 } />
          <div className="verticalSpaceXL" />
          <Button disabled={ !isValidStep3 } large={ ELarge.full } type="submit">{ false ? (
            <AiOutlineLoading3Quarters className="loaderIcon" />

          ) : "Change password" }</Button>
          <div className="verticalSpaceL" />
          <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } onClick={ () => { navigate('/auth/login'); } }>Cancel</Button>
        </form>
      </AuthlayoutContent>
    );
  };
  return (
    <>
      {
        screen === EForgotPasswordSteps.step1 && <Step1 />
      }
      {
        screen === EForgotPasswordSteps.step2 && <Step2 />
      }
      {
        screen === EForgotPasswordSteps.step3 && <Step3 />
      }
    </>
  );
};

export default ForgotPassword;;;