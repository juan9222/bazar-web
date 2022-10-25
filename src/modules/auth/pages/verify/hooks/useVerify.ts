import { useEffect, useState } from "react";
import { EVerifyStatus } from '../interfaces/index';
import useRegisterProviders from '../../register/providers/index';
import { useLocation, useNavigate } from 'react-router-dom';

const useVerify = () => {
  const [otp, setOtp] = useState("");
  const [verifyState, setVerifyState] = useState<EVerifyStatus>(EVerifyStatus.none);
  const [tokens, setTokens] = useState({
    mfaToken: "", oobCode: ""
  });

  const { enrollSmsProvider, confirmEnrollProvider } = useRegisterProviders();

  const { state } = useLocation();
  // Hooks
  const navigate = useNavigate();


  const onInit = async () => {
    const { mfaToken } = state;
    if (!mfaToken) {
      try {
        const resp = await enrollSmsProvider({ email: state.email, password: state.password });
        setVerifyState(EVerifyStatus.none);
        const { mfaToken, oobCode } = resp.data.data;
        setTokens({
          mfaToken, oobCode
        });
      } catch (error) {
        setVerifyState(EVerifyStatus.none);

      }
    }
  };

  const onVerify = async () => {
    const { mfaToken, oobCode } = state;
    // Login OTP
    if (mfaToken) {
      try {
        const resp: any = await confirmEnrollProvider({ oobCode, mfaToken, bindingCode: otp });
        const { accessToken, tokenType } = resp.data.data;
        setVerifyState(EVerifyStatus.verified);
        setTimeout(() => {
          navigate("/dashboard/login");
        }, 3000);
      } catch (error) {
        setVerifyState(EVerifyStatus.wrongVerified);
      }

    } else {
      // Register OTP
      setVerifyState(EVerifyStatus.loading);
      try {
        await confirmEnrollProvider({ oobCode: tokens.oobCode, mfaToken: tokens.mfaToken, bindingCode: otp });
        setVerifyState(EVerifyStatus.verified);
        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } catch (error) {
        setVerifyState(EVerifyStatus.wrongVerified);

      }

    }
  };

  const onResend = () => {
    setVerifyState(EVerifyStatus.countdown);
    onInit();
  };

  const onSubmit = () => {
    onVerify();
  };

  useEffect(() => {
    setVerifyState(EVerifyStatus.loading);
    onInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    otp,
    setOtp,
    verifyState,
    onSubmit,
    onResend,
    onVerify,
  };
};

export default useVerify;