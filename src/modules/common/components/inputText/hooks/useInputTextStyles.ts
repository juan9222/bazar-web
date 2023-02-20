
const useInputTextStyles = (props: { hasError: boolean; }) => {
  const { hasError } = props;
  const getClassNameInputTextByError = (): string => {
    return hasError ? "inputTextContainer__input--errorField" : "inputTextContainer__input--field";
  };
  return {
    getClassNameInputTextByError,
  };
};

export default useInputTextStyles;