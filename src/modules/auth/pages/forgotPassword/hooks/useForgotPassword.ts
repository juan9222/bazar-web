import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IForgotPasswordFormProps, TForgotPasswordFormKeys } from '../../../interfaces';
import { forgotPasswordFormValidator } from '../validators';

const useForgotPassword = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Methods
  const handleToggleShowPassword1 = () => setShowPassword1(!showPassword1);
  const handleToggleShowPassword2 = () => setShowPassword2(!showPassword2);

  // Form
  const { handleSubmit, control, register, formState: { errors: forgotPasswordErrors } } = useForm<IForgotPasswordFormProps>({
    resolver: yupResolver(forgotPasswordFormValidator),
    mode: "all",
  });

  const assignInputName = (inputName: TForgotPasswordFormKeys): string => {
    return inputName.toString();
  };

  const hasErrorsInput = (inputName: TForgotPasswordFormKeys): boolean => {
    return forgotPasswordErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TForgotPasswordFormKeys): string => {
    return forgotPasswordErrors[inputName]?.message || "This field is required";
  };

  const onSubmitForm = (formData: IForgotPasswordFormProps) => {
    handleForgotPassword(formData);
  };

  const handleForgotPassword = async (formData: IForgotPasswordFormProps) => {
    console.log("IForgorPasswordFormData: ", formData);
  };

  return {
    showPassword1,
    handleToggleShowPassword1,
    showPassword2,
    handleToggleShowPassword2,
    forgotPasswordErrors,
    handleSubmit,
    control,
    register,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
    onSubmitForm,
  };
};

export default useForgotPassword;