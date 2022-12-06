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

export interface IAuthResetPasswordRequest {
  email: string,
}

export interface IFPStep3FormProps {
  password: string;
  confirmPassword: string;
}

export enum EForgotPasswordSteps {
  step1 = "step1",
  step2 = "step2",
  step3 = "step3",

}

export type TFPStep3FormKeys = keyof IFPStep3FormProps;

export type TFPStep3FormValidatorShapeKeys = {
  [type in TFPStep3FormKeys]: AnySchema
};
export interface IFPStep1FormProps {
  email: string;
}

export type TFPStep1FormKeys = keyof IFPStep1FormProps;

export type TFPStep1FormValidatorShapeKeys = {
  [type in TFPStep1FormKeys]: AnySchema
};