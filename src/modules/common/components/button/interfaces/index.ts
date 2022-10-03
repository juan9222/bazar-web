import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export enum EBtnVisibleType {
  solid = "solid",
  outline = "outline",
  clear = "clear"
}

export interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isDisabled?: boolean;
  visibleType?: EBtnVisibleType;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}