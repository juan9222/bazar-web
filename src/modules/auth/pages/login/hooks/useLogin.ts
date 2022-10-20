import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginFormProps, TLoginFormKeys } from "../interfaces";
import { loginFormValidator } from "../validators";
import { useState } from "react";
import useLoginProviders from "../providers";

const useLogin = () => {
  const { innerWidth: viewPortWidth } = window;

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  // Form
  const { register, handleSubmit, formState: { errors: loginErrors } } = useForm<ILoginFormProps>({
    resolver: yupResolver(loginFormValidator),
    mode: "all",
  });

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
      const resp = await loginProvider(formData);
      const { accessToken } = resp.data;
      console.log("Success, Token: ", accessToken);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onSubmitForm = (formData: ILoginFormProps) => {
    setLoading(true);
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
  };
};

export default useLogin;