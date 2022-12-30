import { TCompanyCreationValidatorShapeKeys } from './../interfaces/index';
import * as Yup from "yup";

export const companyCreationFormValidator = Yup.object().shape<TCompanyCreationValidatorShapeKeys>({
  companyName: Yup.string()
    .trim()
    .required("This field is required"),
  companyAddress: Yup.string()
    .trim()
    .required("This field is required"),
  chamberOfCommerce: Yup.string()
    .trim()
    .required("This field is required"),
  legalRepresentative: Yup.string()
    .trim()
    .required("This field is required"),
  country: Yup.string()
    .trim()
    .optional(),
  city: Yup.string()
    .trim()
    .optional(),
  yearsInOperations: Yup.string().required("This field is required"),
  profileImage: Yup.string().notRequired(),
  uuid: Yup.string().notRequired()
});