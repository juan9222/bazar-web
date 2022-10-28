import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterFormProps, TRegisterFormKeys } from "../interfaces";
import { useState } from "react";
import { registerFormValidator } from "../validators";
import { useNavigate } from "react-router-dom";
import useRegisterProviders from "../providers";

const useRegister = () => {
  // States
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Hooks
  const navigate = useNavigate();

  // Providers
  const { registerProvider } = useRegisterProviders();

  // Form
  const { handleSubmit, control, register, watch, formState: { errors: registerErrors } } = useForm<IRegisterFormProps>({
    resolver: yupResolver(registerFormValidator),
    mode: "all",
  });

  const watchWhatsAppCommunication = watch("whatsAppCommunication");

  // Methods
  const handleToggleShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleToggleShowPassword2 = () => setShowPassword2(!showPassword2);

  const assignInputName = (inputName: TRegisterFormKeys): string => {
    return inputName.toString();
  };

  const hasErrorsInput = (inputName: TRegisterFormKeys): boolean => {
    return registerErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TRegisterFormKeys): string => {
    return registerErrors[inputName]?.message || "This field is required";
  };

  const handleRegister = async (formData: IRegisterFormProps) => {
    setErrorMsg("");
    try {
      await registerProvider(formData);
      setLoading(false);
      navigate(`/auth/verify?${new URLSearchParams({
        email: formData.email,
        password: formData.password
      })}`);
    } catch (error: any) {
      const errorMessage = error.response.data.errorMessage;
      setErrorMsg(errorMessage);
      setLoading(false);
    }
  };

  const onSubmitForm = (formData: IRegisterFormProps) => {
    if (loading) return;
    setLoading(true);
    handleRegister(formData);
  };

  return {
    control,
    register,
    registerErrors,
    handleSubmit,
    onSubmitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    showPassword1,
    handleToggleShowPassword1,
    showPassword2,
    handleToggleShowPassword2,
    loading,
    errorMsg,
    watchWhatsAppCommunication,
  };
};

export default useRegister;