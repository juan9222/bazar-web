import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "../../../common/components/button";
import InputText from "../../../common/components/inputText";
import { ELarge } from "../../../common/interfaces";
import AuthlayoutContent from "../../layouts/authLayoutContent";
import useForgotPassword from "./hooks/useForgotPassword";
import { useNavigate } from 'react-router-dom';
import { EBtnVisibleType } from "../../../common/components/button/interfaces";

const ForgotPassword: React.FC = () => {
  const {
    showPassword1,
    handleToggleShowPassword1,
    showPassword2,
    handleToggleShowPassword2,
    handleSubmit,
    control,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    onSubmitForm,
  } = useForgotPassword();

  const navigate = useNavigate();
  return (
    <AuthlayoutContent title={ "Reset password" } subtitle={ "Please enter your new password." }>
      <form onSubmit={ handleSubmit(onSubmitForm) }>
        <InputText
          control={ control }
          name={ assignInputName("password") }
          label={ "Password" }
          type={ showPassword1 ? "text" : "password" }
          hasError={ hasErrorsInput("password") }
          errorMessage={ getMessageErrorInput("password") }
          autoCapitalize={ "off" }
          placeholder={ "Enter password" }
          autoComplete={ "off" }
          required
          icon={
            <p className="inputTextIconText">{ showPassword1 ? "Hide" : "Show" }</p>
          }
          onClickIcon={ handleToggleShowPassword1 } />
        <InputText
          control={ control }
          name={ assignInputName("confirmPassword") }
          label={ "Confirm password" }
          type={ showPassword2 ? "text" : "password" }
          hasError={ hasErrorsInput("confirmPassword") }
          errorMessage={ getMessageErrorInput("confirmPassword") }
          autoCapitalize={ "off" }
          placeholder={ "Enter confirm password" }
          autoComplete={ "off" }
          required
          icon={
            <p className="inputTextIconText">{ showPassword2 ? "Hide" : "Show" }</p>
          }
          onClickIcon={ handleToggleShowPassword2 } />
        <div className="verticalSpaceXL" />
        <Button disabled={ true } large={ ELarge.full } type="submit">{ false ? (
          <AiOutlineLoading3Quarters className="loaderIcon" />

        ) : "Change password" }</Button>
        <div className="verticalSpaceL" />
        <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } onClick={ () => { navigate('/auth/login'); } }>Cancel</Button>
      </form>
    </AuthlayoutContent>
  );
};

export default ForgotPassword;