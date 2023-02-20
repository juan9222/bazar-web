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
import { EProfile } from '../../interfaces';
import { FaUserTag, FaUserTie } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


const Verify: React.FC<any> = () => {
  const {
    control,
    register,
    handleSubmit,
    registerErrors,
    onSubmitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    showPassword1,
    handleToggleShowPassword1,
    showPassword2,
    handleToggleShowPassword2,
    loading,
    errorMsg,
    watchWhatsAppCommunication,
    isDirty,
    isValid
  } = useRegister();

  const navigate = useNavigate();

  return (
    <div className="form-register-users">
      <AuthlayoutContent title={ "Register" } subtitle={ "In order to open an account with us, we would like to know some details about you and your company." }>
        { errorMsg && <>
          <p className="textError100 textAlignCenter">{ errorMsg }</p>
          <div className="verticalSpaceM"></div>
        </>
        }
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
            labelCountry={ "Country code" }
            labelPhone={ "Phone number" }
            hasError={ hasErrorsInput("phoneNumber") }
            errorMessage={ getMessageErrorInput("phoneNumber") }
            required
          />
          <Checkbox
            control={ control }
            label="Use this number for WhatsApp communication"
            name={ assignInputName("whatsAppCommunication") }
          />
          { !watchWhatsAppCommunication && <InputPhoneNumber
            control={ control }
            name={ assignInputName("phoneNumberWhatsapp") }
            labelCountry={ "Country code" }
            labelPhone={ "Phone number WhatsApp" }
            hasError={ hasErrorsInput("phoneNumberWhatsapp") }
            errorMessage={ getMessageErrorInput("phoneNumberWhatsapp") }
            required
          /> }
          <div className="dFlex jcSpaceBetween">
            <label className="defaultText textNeutral400"><span className="textError100">*</span> Select your profile</label>
            <div className="dFlex">
              <InputRadio icon={ <FaUserTag /> } register={ register } value={ EProfile.seller } name={ assignInputName("profileType") } label={ "Seller" } />
              <div className="horizontalSpaceL" />
              <InputRadio icon={ <FaUserTie /> } register={ register } value={ EProfile.buyer } name={ assignInputName("profileType") } label={ "Buyer" } />
            </div>
          </div>
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
          <Checkbox
            required
            control={ control }
            label="I have read and agree to Terms of Use and Privacy Policy. "
            name={ assignInputName("iReadTermsAndPolicy") }
          >
            <label className="inputTextContainer__label" htmlFor={ assignInputName("iReadTermsAndPolicy") }>
              <span className="textError100">*</span> I have read and agree to the
              <a href="/" className="textPrimary200 textLink"> Terms of Use</a> and
              <a href="/" className="textPrimary200 textLink"> Privacy Policy</a>.
            </label>
          </Checkbox>
          <Button large={ ELarge.full } type="submit" onClick={ () => console.log(registerErrors) } disabled={ !isDirty || !isValid }>{ loading ? (
            <AiOutlineLoading3Quarters className="loaderIcon" />

          ) : "Create account" }</Button>
        </form>
        <div className="verticalSpaceL" />
        <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } onClick={ () => { navigate('/auth/login'); } }>Cancel</Button>
        <div className="verticalSpaceM" />
        <p className="defaultText textNeutral200 textAlignCenter">
          Already have an account? <Link to="/auth/login" className="textPrimary200 textLink">Log in</Link>
        </p>
        <div className="verticalSpaceXL" />
      </AuthlayoutContent>
    </div>
  );
};

export default Verify;