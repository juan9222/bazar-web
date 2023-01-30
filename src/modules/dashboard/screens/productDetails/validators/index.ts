import { TProductDetailFormValidatorShapeKeys } from "../interfaces";
import * as Yup from "yup";

export const productDetailFormValidator = (maxQuantity?: number) => Yup.object().shape<TProductDetailFormValidatorShapeKeys>({
  availability: Yup.number().min(1, "Must be more than 0").typeError("This field is required"),
  quantity: Yup.number().min(1, "Must be more than 0").max(maxQuantity ?? 1000000000, "Available quantity exceeded.").typeError("This field is required"),
});