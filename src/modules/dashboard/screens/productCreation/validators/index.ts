import { TProductCreationFormValidatorShapeKeys } from "../interfaces";
import * as Yup from "yup";

export const productCreationFormValidator = Yup.object().shape<TProductCreationFormValidatorShapeKeys>({
  product: Yup.string().trim().required("This input is mandatory"),
  productType: Yup.string().trim().required("This input is mandatory"),
  varieties: Yup.string().trim().required("This input is mandatory"),
  productionCapacity: Yup.number().min(1, "Must be more than 0").required("This input is mandatory"),
  dateInPort: Yup.date().required("This input is mandatory"),
  // sustainabilityCertifications: Yup.array().ensure().compact().of(Yup.string().trim().optional()).required("This input is mandatory"),
  companyAssociation: Yup.string().trim().optional(),
  saleCapacity: Yup.number().min(1, "Must be more than 0").required("This input is mandatory"),
  minimumOrder: Yup.string().trim().required("This input is mandatory"),
  pricePerKg: Yup.number().positive("Must be more than 0").required("This input is mandatory"),
  // incoterms: Yup.array().ensure().compact().of(Yup.string().trim().optional()).required("This input is mandatory"),
  assistanceNeeded: Yup.boolean().optional(),
  additionalDescription: Yup.string().trim().optional(),
});