import { Control } from 'react-hook-form';

export interface IInputPhoneNumberProps {
  control: Control<any>;
  name: string;
  labelCountry?: string;
  labelPhone?: string;
}