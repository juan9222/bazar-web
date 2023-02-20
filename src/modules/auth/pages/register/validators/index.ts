import { EProfile, TRegisterFormValidatorShapeKeys } from './../../../interfaces';
import * as Yup from "yup";

export const registerFormValidator = Yup.object().shape<TRegisterFormValidatorShapeKeys>({
  fullName: Yup.string().trim().required("This field is required"),
  email: Yup.string()
    .trim()
    .required("This field is required")
    .matches(/^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/, "Invalid format"),
  password: Yup.string().trim().required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  profileType: Yup.string().required().oneOf([EProfile.seller, EProfile.buyer,], "This field is required"),
  phoneNumber: Yup.string().nullable().trim().required("This field is required"),
  phoneNumberWhatsapp: Yup.string().nullable().notRequired(),
  iReadTermsAndPolicy: Yup.bool().oneOf([true], "This field is required"),
  whatsAppCommunication: Yup.bool().oneOf([true, false], "This field is required")
});