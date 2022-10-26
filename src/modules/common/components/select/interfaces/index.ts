import { UseFormRegister } from 'react-hook-form';

export interface ISelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  register?: UseFormRegister<any>;
  options: Array<{
    label: string;
    value: string;
  }>;
  placeholder: string;
  name: string;
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
}