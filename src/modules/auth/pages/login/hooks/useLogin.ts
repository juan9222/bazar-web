import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginFormProps, TLoginFormKeys } from "../../../interfaces";
import { loginFormValidator } from "../validators";
import { useState } from 'react';
import useAuthenticator from '../../../hooks/useAuthenticator'
import { useNavigate, useLocation } from "react-router-dom";

const useLogin = () => {
  const { innerWidth: viewPortWidth } = window;
  const defaultEmail = new URLSearchParams(useLocation().search).get('email');
  const defaultErrorMessage = new URLSearchParams(useLocation().search).get('errorMessage');

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [haveError, setHaveError] = useState(defaultErrorMessage ? true : false);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);


  // Form
  const { register, handleSubmit, watch, formState: { errors: loginErrors } } = useForm<ILoginFormProps>({
    resolver: yupResolver(loginFormValidator),
    mode: "all",
  });

  const emailInputValue = watch("email");
  const passwordInputValue = watch("password");

  // Hooks
  const navigate = useNavigate();
  const {requestAuthentication} = useAuthenticator();

  // Methods
  const isTabletWidthOrLess = () => viewPortWidth <= 768;

  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  const assignInputName = (inputName: TLoginFormKeys): string => {
    return inputName.toString();
  };

  const hasErrorsInput = (inputName: TLoginFormKeys): boolean => {
    return loginErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TLoginFormKeys): string => {
    return loginErrors[inputName]?.message || "This field is required";
  };

  const handleLogin = async (formData: ILoginFormProps) => {
    try {
      const { oobCode, mfaToken, userDTO, phoneNumber } = await requestAuthentication(formData);

      navigate(`/auth/verify?${new URLSearchParams({
        origin: 'login',
        email: formData.email,
      })}`, {
        state: {
          oobCode,
          mfaToken,
          phoneNumber,
          uuid: userDTO?.uuid,
          email: formData.email,
          password: formData.password,
        }
      });

      setLoading(false);
    } catch (error: any) {
      // User must complete the MFA enrollemnt if erroCode === "E1142"
      if (error?.response?.data?.erroCode === "E1142") {
        navigate(`/auth/verify?${new URLSearchParams({
          email: formData.email,
        })}`, {
          state: {
            email: formData.email,
            password: formData.password,
          }
        });
        return;
      }
      
      setHaveError(true);
      setErrorMessage(error?.response?.data?.errorMessage);
      setLoading(false);
    }
  };

  const onSubmitForm = (formData: ILoginFormProps) => {
    if (loading) return;
    setLoading(true);
    setHaveError(false);
    setErrorMessage('');
    handleLogin(formData);
  };

  return {
    isTabletWidthOrLess,
    register,
    handleSubmit,
    onSubmitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    showPassword,
    handleToggleShowPassword,
    loading,
    haveError,
    defaultEmail,
    errorMessage,
    emailInputValue,
    passwordInputValue
  };
};

export default useLogin;