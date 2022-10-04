import { ELarge } from "../../../interfaces";
import { EBtnVisibleType, IButtonProps } from "../interfaces";

export const useButtonStyles = (props: IButtonProps) => {
  const { visibleType, large } = props;

  const getClassNameByVisibleType = () => {
    switch (visibleType) {
      case EBtnVisibleType.solid:
        return large === ELarge.full ? "btnSolidFull" : "btnSolid";
      case EBtnVisibleType.outline:
        return large === ELarge.full ? "btnOutlineFull" : "btnOutline";
      case EBtnVisibleType.clear:
        return large === ELarge.full ? "btnClearFull" : "btnClear";

      default:
        return large === ELarge.full ? "btnSolidFull" : "btnSolid";
    }
  };
  return {
    getClassNameByVisibleType,
  };
};
