import { Control } from 'react-hook-form';
import { PropsWithChildren } from 'react';

export interface ICheckboxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, PropsWithChildren {
  control?: Control<any>;
  name: string;
  label?: string;
}