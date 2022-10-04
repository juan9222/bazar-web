import { AnySchema } from "yup";

export interface ILoginFormProps {
  email: string;
  password: string;
}

export type TLoginFormKeys = keyof ILoginFormProps;

export type TLoginFormValidatorShapeKeys = {
  [type in TLoginFormKeys]: AnySchema
};