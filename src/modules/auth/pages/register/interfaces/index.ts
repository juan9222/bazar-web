import { AnySchema } from "yup";

export enum EProfile {
  seller = "seller",
  buyer = "buyer",
}

export interface IRegisterFormProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  whatsAppCommunication: boolean;
  profileType: EProfile;
  password: string;
  confirmPassword: string;
  iReadTermsAndPolicy: boolean;
}

export type TRegisterFormKeys = keyof IRegisterFormProps;

export type TRegisterFormValidatorShapeKeys = {
  [type in TRegisterFormKeys]: AnySchema
};