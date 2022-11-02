import { TLoginFormValidatorShapeKeys } from '../../../interfaces';
import * as Yup from "yup";

export const loginFormValidator = Yup.object().shape<TLoginFormValidatorShapeKeys>({
  email: Yup.string()
    .trim()
    .required("This field is required")
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid format"),
  password: Yup.string().trim().required("This field is required")
});