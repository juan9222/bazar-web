import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IDemoCreateOrderFormProps, TDemoCreateOrderFormKeys } from "../interfaces";
import { demoCreateOrderFormValidator } from "../validators";

const useDemoCreateOrder = () => {

  // Form
  const { handleSubmit, control, register, formState: { errors: registerErrors } } = useForm<IDemoCreateOrderFormProps>({
    resolver: yupResolver(demoCreateOrderFormValidator),
    mode: "all",
  });

  const assignInputName = (inputName: TDemoCreateOrderFormKeys): string => {
    return inputName.toString();
  };

  const hasErrorsInput = (inputName: TDemoCreateOrderFormKeys): boolean => {
    return registerErrors[inputName] !== undefined;
  };

  const getMessageErrorInput = (inputName: TDemoCreateOrderFormKeys): string => {
    return registerErrors[inputName]?.message || "This field is required";
  };

  const onSubmitForm = (formData: IDemoCreateOrderFormProps) => {
    console.log(JSON.stringify(formData, null, 3));
  };

  return {
    control,
    register,
    handleSubmit,
    onSubmitForm,
    assignInputName,
    hasErrorsInput,
    getMessageErrorInput,
  };
};

export default useDemoCreateOrder;