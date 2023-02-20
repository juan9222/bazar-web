import { AnySchema } from "yup";

export interface IProductDetailProps {
  availability?: number;
  quantity?: number;
}

export type TProductDetailFormKeys = keyof IProductDetailProps;

export type TProductDetailFormValidatorShapeKeys = {
  [type in TProductDetailFormKeys]?: AnySchema
};