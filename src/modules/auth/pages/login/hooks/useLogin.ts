import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginFormProps, TLoginFormKeys } from "../interfaces";
import { loginFormValidator } from "../validators";
import { useState } from 'react';
import useLoginProviders from "../providers";
import { useNavigate, useLocation } from "react-router-dom";

const useLogin = () => {
  const { innerWidth: viewPortWidth } = window;

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [haveError, setHaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  // Form
  const { register, handleSubmit, formState: { errors: loginErrors } } = useForm<ILoginFormProps>({
    resolver: yupResolver(loginFormValidator),
    mode: "all",
  });

  // Hooks
  const navigate = useNavigate();
  const defaultEmail = new URLSearchParams(useLocation().search).get('email');

  // Providers
  const { loginProvider } = useLoginProviders();

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
      const resp: any = await loginProvider(formData);
      const { oobCode, mfaToken, userDTO } = resp.data.data;

      navigate(`/auth/verify?${new URLSearchParams({
        origin: 'login', 
        email: formData.email,
        password: formData.password
      })}`, {
        state: {
          oobCode,
          mfaToken,
          uuid: userDTO.uuid
        }
      });
      setLoading(false);

    } catch (error: any) {
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
  };
};

export default useLogin;