import { useState } from "react";
import { EVerifyStatus } from '../interfaces/index';

const useVerify = () => {
  const [otp, setOtp] = useState("");
  const [verifyState, setVerifyState] = useState<EVerifyStatus>(EVerifyStatus.none);

  const onSubmit = () => {
    setVerifyState(EVerifyStatus.loading);
    const handleClearTimeout = () => clearTimeout(timeout);
    const timeout = setTimeout(() => {
      setVerifyState(EVerifyStatus.verified);
      handleClearTimeout();
    }, 2000);
  };

  return {
    otp,
    setOtp,
    verifyState,
    onSubmit,
  };
};

export default useVerify;