import { IInputTextareaProps } from "../interfaces";

const useInputTextStyles = (props: IInputTextareaProps) => {
  const { hasError } = props;
  const getClassNameInputTextByError = (): string => {
    return hasError ? "inputTextContainer__input--errorField" : "inputTextContainer__input--field";
  };
  return {
    getClassNameInputTextByError,
  };
};

export default useInputTextStyles;