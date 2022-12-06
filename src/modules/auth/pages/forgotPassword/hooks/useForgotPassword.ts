import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  EForgotPasswordSteps,
  IFPStep1FormProps,
  IFPStep3FormProps,
  TFPStep1FormKeys,
  TFPStep3FormKeys
} from '../../../interfaces';
import { FPStep1FormValidator, FPStep3FormValidator } from '../validators';
import useAuthenticationProviders from '../../../providers/index';

const useForgotPassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loadingStep1, setLoadingStep1] = useState(false);
  const [screen, setScreen] = useState<EForgotPasswordSteps>(EForgotPasswordSteps.step1);
  const [hasError, setHasError] = useState(false);

  // Hooks
  const { resetPasswordProvider } = useAuthenticationProviders();
  // Methods
  const handleToggleShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleToggleShowPassword2 = () => setShowPassword2(!showPassword2);

  // Form Step1
  const { handleSubmit: handleSubmitStep1, control: controlStep1, formState: { errors: errorsStep1, isValid: isValidStep1 }, setValue: setValueStep1 } = useForm<IFPStep1FormProps>({
    resolver: yupResolver(FPStep1FormValidator),
    mode: "all",
  });

  // Form Step3
  const { handleSubmit: handleSubmitStep3, control: controlStep3, formState: { errors: errorsStep3, isValid: isValidStep3 } } = useForm<IFPStep3FormProps>({
    resolver: yupResolver(FPStep3FormValidator),
    mode: "all",
  });

  const assignInputNameStep3 =
    (inputName:
      TFPStep3FormKeys):
      string => {
      return inputName.toString();
    };

  const hasErrorsInputStep3 =
    (inputName:
      TFPStep3FormKeys):
      boolean => {
      return errorsStep3[inputName] !== undefined;
    };

  const getMessageErrorInputStep3 =
    (inputName:
      TFPStep3FormKeys):
      string => {
      return errorsStep3[inputName]?.message || "This field is required";
    };

  const assignInputNameStep1 =
    (inputName:
      TFPStep1FormKeys):
      string => {
      return inputName.toString();
    };

  const hasErrorsInputStep1 =
    (inputName:
      TFPStep1FormKeys):
      boolean => {
      return errorsStep1[inputName] !== undefined;
    };

  const getMessageErrorInputStep1 =
    (inputName:
      TFPStep1FormKeys):
      string => {
      return errorsStep1[inputName]?.message || "This field is required";
    };

  const onSubmitFormStep3 = (formData: IFPStep3FormProps) => {
    handleForgotPassword(formData);
  };

  const onSubmitFormStep1 = async (formData: IFPStep1FormProps) => {
    setLoadingStep1(true);
    try {
      await resetPasswordProvider({ email: formData.email });
      setLoadingStep1(false);
      setScreen(EForgotPasswordSteps.step2);
      setHasError(false);
    } catch (error) {
      setLoadingStep1(false);
      setScreen(EForgotPasswordSteps.step2);
      setHasError(true);
    }
  };

  const handleForgotPassword = async (formData: IFPStep3FormProps) => {
    console.log("IForgorPasswordFormData: ", formData);
  };

  const handleTryOtherEmail = () => {
    setScreen(EForgotPasswordSteps.step1);
    setValueStep1("email", "");
  };

  return {
    showPassword1,
    handleToggleShowPassword1,
    showPassword2,
    handleToggleShowPassword2,
    controlStep1,
    controlStep3,
    assignInputNameStep1,
    hasErrorsInputStep1,
    getMessageErrorInputStep1,
    assignInputNameStep3,
    hasErrorsInputStep3,
    getMessageErrorInputStep3,
    onSubmitFormStep1,
    onSubmitFormStep3,
    handleSubmitStep1,
    handleSubmitStep3,
    isValidStep1,
    isValidStep3,
    loadingStep1,
    screen,
    hasError,
    handleTryOtherEmail,
  };
};

export default useForgotPassword;