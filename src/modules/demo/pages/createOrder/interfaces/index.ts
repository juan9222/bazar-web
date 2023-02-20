import { AnySchema } from "yup";

export interface IDemoCreateOrderFormProps {
  productId: string;
  productName: string;
  description: string;
  productionCapacity: number;
  minToSell: number;
  expectedPricePerKg: number;
}

export type TDemoCreateOrderFormKeys = keyof IDemoCreateOrderFormProps;

export type TDemoCreateOrderFormValidatorShapeKeys = {
  [type in TDemoCreateOrderFormKeys]: AnySchema
};