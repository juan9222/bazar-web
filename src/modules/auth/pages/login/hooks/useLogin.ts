import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginFormProps, TLoginFormKeys } from "../interfaces";
import { loginFormValidator } from "../validators";
import { useState } from "react";

const useLogin = () => {
  const { innerWidth: viewPortWidth } = window;

  // States
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const { register, handleSubmit, formState: { errors: loginErrors } } = useForm<ILoginFormProps>({
    resolver: yupResolver(loginFormValidator),
    mode: "all",
  });

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

  const onSubmitForm = (formData: ILoginFormProps) => {
    console.log(JSON.stringify(formData));
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
  };
};

export default useLogin;