import React from "react";
import { UseFormRegister, Control } from 'react-hook-form';

export interface IInputTextProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  register?: UseFormRegister<any>;
  control?: Control<any>;
  value?: string;
  onChange?: (event: any) => void;
  label?: string;
  hasTooltip?: boolean;
  icon?: React.ReactNode;
  onClickIcon?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}