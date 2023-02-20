import { TProductCreationFormValidatorShapeKeys } from "../interfaces";
import * as Yup from "yup";

export const productCreationFormValidator = Yup.object().shape<TProductCreationFormValidatorShapeKeys>({
  product: Yup.string().trim().optional(),
  productType: Yup.string().trim().optional(),
  varieties: Yup.string().trim().optional(),
  productionCapacity: Yup.number().min(1, "Must be more than 0").typeError("This field is required").required("This field is required"),
  dateInPort: Yup.date().typeError("This field is required").required("This field is required"),
  companyAssociation: Yup.string().trim().optional(),
  saleCapacity: Yup.number().min(1, "Must be more than 0").typeError("This field is required").required("This field is required"),
  minimumOrder: Yup.string().trim().optional(),
  pricePerKg: Yup.number().positive("Must be more than 0").typeError("This field is required").required("This field is required"),
  assistanceNeeded: Yup.boolean().optional(),
  additionalDescription: Yup.string().trim().optional(),
});