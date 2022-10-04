import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegisterFormProps, TRegisterFormKeys } from "../interfaces";
import { useState } from "react";
import { registerFormValidator } from "../validators";

const useRegister = () => {
  // States
  const [showPassword, setShowPassword] = useState(false);

  // Form
  const { register, handleSubmit, formState: { errors: registerErrors } } = useForm<IRegisterFormProps>({
    resolver: yupResolver(registerFormValidator),
    mode: "all",
  });

  // Methods
  const handleToggleShowPassword = () => setShowPassword(!showPassword);

  const assignInputName = (inputName: TRegisterFormKeys): string => {
    return inputName.toString();
  };

  const hasErrorsInput = (inputName: TRegisterFormKeys): boolean => {
    return registerErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TRegisterFormKeys): string => {
    return registerErrors[inputName]?.message || "This field is required";
  };

  const onSubmitForm = (formData: IRegisterFormProps) => {
    console.log(JSON.stringify(formData));
  };

  return {
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

export default useRegister;