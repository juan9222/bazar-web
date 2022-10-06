import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../common/components/button';
import { EBtnVisibleType } from '../../../common/components/button/interfaces';
import Checkbox from '../../../common/components/checkbox';
import InputPhoneNumber from '../../../common/components/inputPhoneNumber';
import InputRadio from '../../../common/components/inputRadio/inputRadio';
import InputText from '../../../common/components/inputText';
import { ELarge } from '../../../common/interfaces';
import AuthlayoutContent from '../../layouts/authLayoutContent';
import useRegister from './hooks/useRegister';
import { EProfile } from './interfaces';

const Register: React.FC<any> = props => {
  const { } = props;
  const {
    control,
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
          control={ control }
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
          control={ control }
          name={ assignInputName("email") }
          label={ "Email" }
          type={ "email" }
          hasError={ hasErrorsInput("email") }
          errorMessage={ getMessageErrorInput("email") }
          autoCapitalize={ "off" }
          placeholder={ "Enter email" }
          autoComplete={ "off" }
          required />
        <InputPhoneNumber
          control={ control }
          name={ assignInputName("phoneNumber") }
        />
        <Checkbox
          control={ control }
          label="Use this number for WhatsApp communication"
          name={ assignInputName("whatsAppCommunication") }
        />
        <div className="dFlex jcSpaceBetween">
          <label className="defaultText textNeutral400"><span className="textError100">*</span> Select your profile</label>
          <div className="dFlex">
            <InputRadio register={ register } value={ EProfile.seller } name={ assignInputName("profileType") } label={ "Seller" } />
            <div className="horizontalSpaceL" />
            <InputRadio register={ register } value={ EProfile.buyer } name={ assignInputName("profileType") } label={ "Buyer" } />
          </div>
        </div>
        <InputText
          control={ control }
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
          control={ control }
          name={ assignInputName("confirmPassword") }
          label={ "Confirm password" }
          type={ "password" }
          hasError={ hasErrorsInput("confirmPassword") }
          errorMessage={ getMessageErrorInput("confirmPassword") }
          autoCapitalize={ "off" }
          placeholder={ "Enter confirm password" }
          autoComplete={ "off" }
          required />
        <Checkbox
          control={ control }
          label="I have read and agree to Terms of Use and Privacy Policy. "
          name={ assignInputName("iReadTermsAndPolicy") }
        />
        <Button large={ ELarge.full } type="submit">Create account</Button>
        <div className="verticalSpaceL" />
        <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } type="reset">Cancel</Button>
        <div className="verticalSpaceM" />
        <p className="defaultText textNeutral200 textAlignCenter">
          Already have an account? <Link to="/auth/login" className="textPrimary200 textLink">Log in</Link>
        </p>
        <div className="verticalSpaceXL" />
      </form>
    </AuthlayoutContent>
  );
};

export default Register;
