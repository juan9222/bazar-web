import { IInputTextProps } from "../interfaces";

const useInputTextStyles = (props: IInputTextProps) => {
  const { hasError } = props;
  const getClassNameInputTextByError = (): string => {
    return hasError ? "inputTextContainer__input--errorField" : "inputTextContainer__input--field";
  };
  return {
    getClassNameInputTextByError,
  };
};

export default useInputTextStyles;