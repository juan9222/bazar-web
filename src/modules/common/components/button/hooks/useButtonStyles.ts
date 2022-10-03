import { EBtnVisibleType, IButtonProps } from "../interfaces";

export const useButtonStyles = (props: IButtonProps) => {
  const { visibleType } = props;

  const getClassNameByVisibleType = () => {
    switch (visibleType) {
      case EBtnVisibleType.solid:
        return "btnSolid";
      case EBtnVisibleType.outline:
        return "btnOutline";
      case EBtnVisibleType.clear:
        return "btnClear";

      default:
        return "btnSolid";
    }
  };
  return {
    getClassNameByVisibleType,
  };
};
