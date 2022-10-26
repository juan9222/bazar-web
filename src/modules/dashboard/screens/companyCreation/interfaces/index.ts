import { AnySchema } from "yup";

export interface ICompanyCreationProps {
  companyName: string;
  companyAddress: string;
  chamberOfCommerce: string;
  legalRepresentative: string;
  country: string;
  city: string;
}

export type TCompanyCreationKeys = keyof ICompanyCreationProps;

export type TCompanyCreationValidatorShapeKeys = {
  [type in TCompanyCreationKeys]: AnySchema
};
