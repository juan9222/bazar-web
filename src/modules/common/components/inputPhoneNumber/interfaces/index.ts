import { Control } from 'react-hook-form';

export interface IInputPhoneNumberProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  control: Control<any>;
  name: string;
  labelCountry?: string;
  labelPhone?: string;
  hasError?: boolean;
  errorMessage?: string;
}