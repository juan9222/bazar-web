import { UseFormRegister } from 'react-hook-form';
import { ActionMeta } from 'react-select';

export interface ISelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  selection: any;
  options: Array<{
    label: string;
    value: string;
    icon?: any;
  }>;
  placeholder: string;
  name: string;
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  valueIsLabel?: boolean;
  onChangeSelection: (option: unknown | null, actionMeta: ActionMeta<unknown>) => void;
}