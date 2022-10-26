import { UseFormRegister } from 'react-hook-form';

export interface IInputFilesProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  register?: UseFormRegister<any>;
  placeholder: string;
  name: string;
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  multiple?: boolean;
  onChangeFile: (fileObj: any) => void;
}