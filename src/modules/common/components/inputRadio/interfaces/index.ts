import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { UseFormRegister } from 'react-hook-form';

export interface IInputRadioProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  value: string;
}