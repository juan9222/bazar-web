import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { UseFormRegister } from 'react-hook-form';
import React from 'react';

export interface IInputRadioProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  register: UseFormRegister<any>;
  icon?: React.ReactNode;
  name: string;
  label: string;
  value: string;
}