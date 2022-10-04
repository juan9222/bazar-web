import React from "react";
import { UseFormRegister } from "react-hook-form";

export interface IInputTextProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  register: UseFormRegister<any>;
  label?: string;
  icon?: React.ReactNode;
  onClickIcon?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}