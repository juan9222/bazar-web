import { TFPStep3FormValidatorShapeKeys, TFPStep1FormValidatorShapeKeys } from './../../../interfaces';
import * as Yup from "yup";

export const FPStep3FormValidator = Yup.object().shape<TFPStep3FormValidatorShapeKeys>({
  password: Yup.string().trim().required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const FPStep1FormValidator = Yup.object().shape<TFPStep1FormValidatorShapeKeys>({
  email: Yup.string()
    .trim()
    .required("This field is required")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid format"),
});