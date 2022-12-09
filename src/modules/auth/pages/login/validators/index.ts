import { TLoginFormValidatorShapeKeys } from '../../../interfaces';
import * as Yup from "yup";

export const loginFormValidator = Yup.object().shape<TLoginFormValidatorShapeKeys>({
  email: Yup.string()
    .trim()
    .required("This field is required")
    .matches(/^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/, "Invalid format"),
  password: Yup.string().trim().required("This field is required")
});