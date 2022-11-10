import { Control, UseFormRegister } from "react-hook-form";


export interface IInputTextareaProps {
  name: string;
  register?: UseFormRegister<any>;
  control?: Control<any>;
  value?: string;
  onChange?: (event: any) => void;
  label?: string;
  icon?: React.ReactNode;
  onClickIcon?: () => void;
  hasError?: boolean;
  errorMessage?: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}