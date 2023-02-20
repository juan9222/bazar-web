import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { ELarge } from "../../../interfaces";

export enum EBtnVisibleType {
  solid = "solid",
  outline = "outline",
  outlineWhite = "outline-white",
  clear = "clear"
}

export interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  large?: ELarge;
  isDisabled?: boolean;
  visibleType?: EBtnVisibleType;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}