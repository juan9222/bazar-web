import { useEffect, useState } from "react";
import { EVerifyStatus } from '../interfaces/index';
import useRegisterProviders from '../../register/providers/index';
import { useLocation, useNavigate } from 'react-router-dom';
import { setDefaultAuthorizationToken } from "../../../../common/helpers";

const useVerify = () => {
  const [otp, setOtp] = useState("");
  const [verifyState, setVerifyState] = useState<EVerifyStatus>(EVerifyStatus.none);
  const [tokens, setTokens] = useState({
    mfaToken: "", oobCode: ""
  });
  const [errorMessage, setErrorMessage] = useState('');

  const searchParams = new URLSearchParams(useLocation().search);
  const origin = searchParams.get('origin');
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  const [isSuccessModalClosed, setIsSuccessModalClosed] = useState(true);


  const { enrollSmsProvider, confirmEnrollProvider, confirmLoginChallengeProvider } = useRegisterProviders();

  const { state } = useLocation();
  // Hooks
  const navigate = useNavigate();

  const getRolesToStorage = (roles: any) => {
    return JSON.stringify(
      roles.map((role:any) => role.name)
    );
  };

  const onInit = async () => {
    const { mfaToken: existToken } = tokens;

    if (!existToken && origin !== 'login') {
      try {
        const response = await enrollSmsProvider({
          email: email || '',
          password: password || ''
        });
        const { mfaToken, oobCode } = response.data.data;
        setTokens({
          mfaToken, oobCode
        });
      } catch (error: any) {
        setErrorMessage(error?.response?.data?.errorMessage);
        setVerifyState(EVerifyStatus.wrongVerified);
      }
    }
    setVerifyState(EVerifyStatus.none);
  };

  const onVerify = async () => {
    const { mfaToken, oobCode } = tokens;
    setVerifyState(EVerifyStatus.loading);
    if (mfaToken && origin !== 'login') {
      // Register OTP
      try {
        await confirmEnrollProvider({ oobCode, mfaToken, bindingCode: otp });
        setVerifyState(EVerifyStatus.verified);
        setIsSuccessModalClosed(false);
      } catch (error: any) {
        setErrorMessage(error?.response?.data?.errorMessage);
        setVerifyState(EVerifyStatus.wrongVerified);
      }
    } else {
      // Login OTP
      if (origin !== 'login') navigate("/auth/login");
      const uuid = state?.uuid;
      try {
        const response: any = await confirmLoginChallengeProvider({
          oobCode: tokens.oobCode,
          mfaToken: tokens.mfaToken,
          bindingCode: otp,
          uuid
        });
        const { accessToken, userDTO: {roles}, userDTO: {uuid: newUuid} } = response.data.data;
        localStorage.setItem("uuid", newUuid);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("roles", getRolesToStorage(roles));
        setDefaultAuthorizationToken(accessToken);
        setVerifyState(EVerifyStatus.verified);
        setTimeout(() => {
          navigate("/dashboard/complete-registration");
        }, 2000);
      } catch (error: any) {
        setErrorMessage(error?.response?.data?.errorMessage);
        setVerifyState(EVerifyStatus.wrongVerified);
      }
    }
  };

  const start = () => {
    setVerifyState(EVerifyStatus.loading);
    if (origin === 'login') setTokens({
      mfaToken: state?.mfaToken, 
      oobCode: state?.oobCode
    });
    onInit();
  }

  const onResend = () => {
    start();
  };

  const onSubmit = () => {
    if (verifyState === EVerifyStatus.loading) return;
    setVerifyState(EVerifyStatus.none);
    onVerify();
  };
  

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    otp,
    setOtp,
    verifyState,
    onSubmit,
    onResend,
    onVerify,
    origin,
    isSuccessModalClosed,
    setIsSuccessModalClosed,
    errorMessage,
  };
};

export default useVerify;