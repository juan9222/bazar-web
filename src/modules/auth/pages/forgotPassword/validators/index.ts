import { TForgotPasswordFormValidatorShapeKeys } from './../../../interfaces';
import * as Yup from "yup";

export const forgotPasswordFormValidator = Yup.object().shape<TForgotPasswordFormValidatorShapeKeys>({
  password: Yup.string().trim().required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});