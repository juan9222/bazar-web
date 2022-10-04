import React from 'react';
import InputText from '../../../common/components/inputText';
import AuthlayoutContent from '../../layouts/authLayoutContent';
import useRegister from './hooks/useRegister';

const Register: React.FC<any> = props => {
  const { } = props;
  const {
    register,
    handleSubmit,
    onSubmitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    showPassword,
    handleToggleShowPassword,
  } = useRegister();
  return (
    <AuthlayoutContent title={ "Register" } subtitle={ "In order to open an account with us, we would like to know some details about you and your company." }>
      <form onSubmit={ handleSubmit(onSubmitForm) }>
        <InputText
          register={ register }
          name={ assignInputName("fullName") }
          label={ "Full name" }
          type={ "text" }
          hasError={ hasErrorsInput("fullName") }
          errorMessage={ getMessageErrorInput("fullName") }
          autoCapitalize={ "off" }
          placeholder={ "Enter your full name" }
          autoComplete={ "off" }
          required />
        <InputText
          register={ register }
          name={ assignInputName("email") }
          label={ "Email" }
          type={ "email" }
          hasError={ hasErrorsInput("email") }
          errorMessage={ getMessageErrorInput("email") }
          autoCapitalize={ "off" }
          placeholder={ "Enter email" }
          autoComplete={ "off" }
          required />
        <InputText
          register={ register }
          name={ assignInputName("password") }
          label={ "Password" }
          type={ "password" }
          hasError={ hasErrorsInput("password") }
          errorMessage={ getMessageErrorInput("password") }
          autoCapitalize={ "off" }
          placeholder={ "Enter password" }
          autoComplete={ "off" }
          required />
        <InputText
          register={ register }
          name={ assignInputName("confirmPassword") }
          label={ "Confirm password" }
          type={ "password" }
          hasError={ hasErrorsInput("confirmPassword") }
          errorMessage={ getMessageErrorInput("confirmPassword") }
          autoCapitalize={ "off" }
          placeholder={ "Enter confirm password" }
          autoComplete={ "off" }
          required />
      </form>
    </AuthlayoutContent>
  );
};

export default Register;
