import { AnySchema } from "yup";

export interface ILoginFormProps {
  email: string;
  password: string;
}

export type TLoginFormKeys = keyof ILoginFormProps;

export type TLoginFormValidatorShapeKeys = {
  [type in TLoginFormKeys]: AnySchema
};

export interface ILoginProvider {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  userDTO: any;
}

export interface ILoginResponseError {
  data: any;
  message: string;
}

export enum EProfile {
  seller = "seller",
  buyer = "buyer",
}

export interface IRegisterFormProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  phoneNumberWhatsapp: string;
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

export interface IRegisterResponse {
  created: boolean;
  verified: boolean;
  uuid: string;
}

export interface IAuthConfirmationRequest {
  mfaToken: string,
  oobCode: string,
  bindingCode: string,
  uuid?: string,
}

export interface IForgotPasswordFormProps {
  password: string;
  confirmPassword: string;
}

export type TForgotPasswordFormKeys = keyof IForgotPasswordFormProps;

export type TForgotPasswordFormValidatorShapeKeys = {
  [type in TForgotPasswordFormKeys]: AnySchema
};