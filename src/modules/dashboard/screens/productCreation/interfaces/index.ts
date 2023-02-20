import { AnySchema } from "yup";

export interface IProductCreationProps {
  productPictures?: Array<any>;
  product: string;
  productType?: string;
  varieties?: string;
  productionCapacity?: number;
  dateInPort?: Date;
  sustainabilityCertifications?: Array<string>;
  companyAssociation?: string;
  saleCapacity?: number;
  minimumOrder?: string;
  pricePerKg?: number;
  incoterms?: Array<string>;
  assistanceNeeded?: boolean;
  additionalDescription?: string;
  uuid?: string;
}

export type TProductCreationFormKeys = keyof IProductCreationProps;

export type TProductCreationFormValidatorShapeKeys = {
  [type in TProductCreationFormKeys]?: AnySchema
};