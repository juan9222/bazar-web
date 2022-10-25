import { TDemoCreateOrderFormValidatorShapeKeys } from './../interfaces';
import * as Yup from "yup";

export const demoCreateOrderFormValidator = Yup.object().shape<TDemoCreateOrderFormValidatorShapeKeys>({
  productId: Yup.string().trim().required("This field is required"),
  productName: Yup.string().trim().required("This field is required"),
  description: Yup.string().trim().required("This field is required"),
  productionCapacity: Yup.number().positive().required("This field is required"),
  minToSell: Yup.number().positive().required("This field is required"),
  expectedPricePerKg: Yup.number().positive().required("This field is required"),
});