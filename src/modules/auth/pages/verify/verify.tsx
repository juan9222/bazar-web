import React from "react";
import OtpInput from "react-otp-input";
import Button from "../../../common/components/button";
import { EBtnVisibleType } from "../../../common/components/button/interfaces";
import { ELarge } from "../../../common/interfaces";
import AuthlayoutContent from "../../layouts/authLayoutContent";
import { AiOutlineLoading3Quarters, AiFillCheckCircle } from 'react-icons/ai';
import useVerify from './hooks/useVerify';
import { EVerifyStatus } from "./interfaces";
import { useNavigate } from 'react-router-dom';

const Verify: React.FC = () => {

  const { otp, setOtp, verifyState, onSubmit, onResend } = useVerify();

  const navigate = useNavigate();

  return (
    <AuthlayoutContent title={ "Phone number verification" } subtitle={ "We take your security very seriously. Therefore, we need to validate your cell phone number, please enter the verification code that we send to your cell phone in the following field." }>
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
              Please enter a valid code
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
        value={ otp }
        onChange={ setOtp }
        numInputs={ 6 }
        separator={ <span className="otpInputSeparator"></span> }
      />
      <p className="defaultText textNeutral200 textAlignCenter">
        Don't receive code? <button onClick={ onResend } className="textPrimary200 defaultText textLink">Resend</button>
      </p>
      <div className="verticalSpaceXL" />
      <Button large={ ELarge.full } type="submit" onClick={ onSubmit } disabled={ otp.length < 6 }>Verify phone</Button>
      <div className="verticalSpaceL" />
      <Button visibleType={ EBtnVisibleType.clear } large={ ELarge.full } onClick={() => {navigate('/auth/login')}}>Cancel</Button>

    </AuthlayoutContent>
  );
};

export default Verify;
