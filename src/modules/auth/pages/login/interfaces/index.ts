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