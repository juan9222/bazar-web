import { useState } from "react";
import useAuthenticator from '../../../hooks/useAuthenticator'
import { useLocation, useNavigate } from 'react-router-dom';
import { EVerifyStatus, IVerifyLoginState } from "../interfaces";

const useVerify = () => {
  const [otpCode, setOtpCode] = useState("");
  const [verifyState, setVerifyState] = useState<EVerifyStatus>(EVerifyStatus.none);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessModalClosed, setIsSuccessModalClosed] = useState(true);
  const [tokens, setTokens] = useState({mfaToken: "", oobCode: ""});
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const [uuid, setUuid] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const searchParams = new URLSearchParams(useLocation().search);
  const origin = searchParams.get('origin');
  const email = searchParams.get('email');
  
  // Hooks
  const {
    requestEnrollment,
    confirmEnrollment,
    confirmAuthentication,
    onLogin,
    requestAuthentication
  } = useAuthenticator();
  const { state } = useLocation();
  const navigate = useNavigate();

  const goToLogin = (params?: any) => {
    if (params) navigate(`/auth/login?${new URLSearchParams(params)}`)
    else navigate(`/auth/login`)
  }

  const setVerifyLoginState = ({mfaToken, oobCode, uuid, phoneNumber, email = "", password = ""}: IVerifyLoginState) => {
    setUuid(uuid);
    setPhoneNumber(phoneNumber);
    setCredentials({
      email, 
      password,
    });
    setTokens({
      mfaToken, 
      oobCode
    });
  };

  const isReady = () => {
    if (origin !== 'login' && state?.email && state?.password) {
      const {email, password} = state;
      setCredentials({email, password});
      return true;
    };

    if (origin === 'login' && state?.mfaToken) {
      const {mfaToken, oobCode, uuid, phoneNumber, email, password} = state;
      setVerifyLoginState({mfaToken, oobCode, uuid, phoneNumber, email, password});
      return true;
    };

    return false;
  }

  const resendAuthentication = async () => {
    try {
      setVerifyState(EVerifyStatus.loading);

      const { oobCode, mfaToken, userDTO: {uuid}, phoneNumber } = await requestAuthentication(credentials);
      setVerifyLoginState({mfaToken, oobCode, uuid, phoneNumber, ...credentials});

      setVerifyState(EVerifyStatus.none);
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.errorMessage);
      setVerifyState(EVerifyStatus.wrongVerified);
    }
  }

  const onInit = async () => {
    try {
      setVerifyState(EVerifyStatus.loading);

      if (!isReady()) goToLogin({
        email: email || '',
        errorMessage: 'Verification code expired. Please try login.'
      });


      if (origin !== 'login') {
        const { mfaToken, oobCode } = await requestEnrollment({
          email: state.email,
          password: state.password,
        });
        setTokens({
          mfaToken, oobCode
        });
      }

      setVerifyState(EVerifyStatus.none);
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.errorMessage);
      setVerifyState(EVerifyStatus.none);
    }
  };

  const onVerify = async () => {
    try {
      setVerifyState(EVerifyStatus.loading);

      if (origin !== 'login') {
        // Register
        await confirmEnrollment({ ...tokens, bindingCode: otpCode });
        setVerifyState(EVerifyStatus.verified);
        setIsSuccessModalClosed(false);
      } else {
        // Login
        const { accessToken, userDTO: {roles} } = await confirmAuthentication({
          oobCode: tokens.oobCode,
          mfaToken: tokens.mfaToken,
          bindingCode: otpCode,
          uuid
        });
        
        onLogin({uuid, accessToken, roles});
        setVerifyState(EVerifyStatus.verified);

        setTimeout(() => {
          navigate("/dashboard/complete-registration");
        }, 2000);
      }
    } catch (error: any) {
      // User is not email verified
      if (error?.response?.data?.erroCode === "E1134") {
        goToLogin({
          email: email || '',
          errorMessage: error?.response?.data?.errorMessage
        });
        return;
      }

      setErrorMessage(error?.response?.data?.errorMessage);
      setVerifyState(EVerifyStatus.wrongVerified);
      setTimeout(() => {
        onResend();
      }, 3500);
    }
  };

  const onResend = async () => {
    setOtpCode("");
    if (origin === 'login' && credentials?.email && credentials?.password) resendAuthentication();
    else onInit();
  };

  const onSubmit = () => {
    if (verifyState === EVerifyStatus.loading) return;
    onVerify();
  };

  return {
    onInit,
    otpCode,
    setOtpCode,
    verifyState,
    onSubmit,
    onResend,
    onVerify,
    origin,
    isSuccessModalClosed,
    setIsSuccessModalClosed,
    errorMessage,
    phoneNumber,
  };
};

export default useVerify;