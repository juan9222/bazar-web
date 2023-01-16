import React from "react";
import OtpInput from "react18-input-otp";
import Button from "../../../common/components/button";
import { EBtnVisibleType } from "../../../common/components/button/interfaces";
import { ELarge } from "../../../common/interfaces";
import AuthlayoutContent from "../../layouts/authLayoutContent";
import { AiOutlineLoading3Quarters, AiFillCheckCircle } from 'react-icons/ai';
import useVerify from './hooks/useVerify';
import { EVerifyStatus } from "./interfaces";
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from "../../../common/components/modal";


const Verify: React.FC = () => {

  const {
    otpCode,
    setOtpCode,
    verifyState,
    onSubmit,
    onResend,
    origin,
    isSuccessModalClosed,
    errorMessage,
    phoneNumber,
  } = useVerify();

  const navigate = useNavigate();
  const defaultEmail = new URLSearchParams(useLocation().search).get('email');

  const onSuccessModalContinue = () => {
    navigate(`/auth/login?${ new URLSearchParams({
      email: defaultEmail || '',
    }) }`);
  };

  const getLayoutSubTitle = () => {
    if (origin === 'login') return `Check out your phone!  We've sent a temporary  
    verification code to your phone *******${ phoneNumber?.substring(phoneNumber.length - 3) }`;

    return `We take your security very seriously. Therefore, we need to 
    validate your cell phone number, please enter the verification code that we
    send to your cell phone in the following field.`;
  };

  const getLayoutTitle = () => {
    if (origin === 'login') return `Verification code`;

    return `Phone number verification`;
  };

  const getVerifyButtonTitle = () => {
    if (origin === 'login') return `Verify code`;

    return `Verify phone number`;
  };

  return (
    <AuthlayoutContent
      title={ getLayoutTitle() }
      subtitle={ getLayoutSubTitle() }>
      <div className="otpStatus">
        {
          verifyState === EVerifyStatus.loading && (
            <AiOutlineLoading3Quarters className="loaderIcon" />
          )
        }
        {
          verifyState === EVerifyStatus.verified && (
            <div className="otpStatus__verified">
              <p className="otpStatus__verified--label">Verified code</p>
              <AiFillCheckCircle className="otpStatus__verified--icon" />
            </div>
          )
        }
        {
          verifyState === EVerifyStatus.wrongVerified && (
            <p className="otpStatus__wrongVerified">
              { errorMessage }
            </p>
          )
        }
        {
          verifyState === EVerifyStatus.countdown && (
            <p className="otpStatus__countdown">
              This code expires in 9:51 minutes.
            </p>
          )
        }
      </div>
      <OtpInput
        containerStyle={ { justifyContent: "center", marginTop: 50, marginBottom: 50 } }
        className="otpInput"
        value={ otpCode }
        onChange={ setOtpCode }
        numInputs={ 6 }
        separator={ <span className="otpInputSeparator"></span> }
        isInputNum={ true }
        shouldAutoFocus={ true }
        isDisabled={ verifyState === EVerifyStatus.loading }
      />
      <p className="defaultText textNeutral200 textAlignCenter">
        Don't receive code? <button onClick={ onResend } className="textPrimary200 defaultText textLink">Resend</button>
      </p>
      <div className="verticalSpaceXL" />
      <Button large={ ELarge.full } type="submit" onClick={ onSubmit } disabled={ otpCode.length < 6 }>
        { getVerifyButtonTitle() }
      </Button>
      <div className="verticalSpaceL" />
      <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } onClick={ () => { navigate('/auth/login'); } }>Cancel</Button>

      <div className="loginContainer__tAndC">
        <p className="smallText textNeutral200 textAlignCenter">
          Are you having problems with this method?
          <br />
          Please contact <a href="mailto:support@bazar.com" className="textPrimary200 textLink">support@email.com</a>
        </p>
      </div>

      <Modal
        title="Verified phone number"
        closed={ isSuccessModalClosed }
        onContinue={ onSuccessModalContinue }
        onClose={ onSuccessModalContinue }
        width="580px"
        cancelHidden={ true }
      >
        Thank you for verifying your phone number, you are now closer to enjoying Bazar.
        Please help us to verify your email so we can log you in and be closer to you.
      </Modal>

    </AuthlayoutContent>
  );
};

export default Verify;
