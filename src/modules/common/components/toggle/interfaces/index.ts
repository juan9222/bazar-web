import { Control } from "react-hook-form";

export interface IToggleProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  control?: Control<any>;
  name: string;
  checked?: boolean;
  onChange?: (event: any) => void;
  label?: string;
  icon?: React.ReactNode;
  onClickIcon?: () => void;
  hasError?: boolean;
  errorMessage?: string;
}