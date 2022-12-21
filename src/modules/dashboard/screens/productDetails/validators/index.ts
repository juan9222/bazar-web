import { TProductDetailFormValidatorShapeKeys } from "../interfaces";
import * as Yup from "yup";

export const productDetailFormValidator = Yup.object().shape<TProductDetailFormValidatorShapeKeys>({
  availability: Yup.number().min(1, "Must be more than 0").typeError("This field is required").required("This field is required"),
});