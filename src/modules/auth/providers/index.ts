import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import {
  ILoginProvider,
  ILoginResponse,
  IRegisterFormProps,
  IRegisterResponse,
  IAuthConfirmationRequest
} from "../interfaces";

const useAuthenticationProviders = () => {

  const loginProvider = ({
    email, password
  }: ILoginProvider) => {
    const request = axios<ILoginResponse>({
      method: "POST",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: "/auth/login-mfa",
      data: {
        emailDTO: {
          email,
        },
        password
      }
    });
    return trackPromise(request);
  };
  
  const getUserByUuid = (uuid: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: `/user/person/uuid/${uuid}`
    });
    return trackPromise(request);
  };

  const registerProvider = ({
    fullName,
    email,
    phoneNumber,
    whatsAppCommunication,
    profileType,
    password,
    iReadTermsAndPolicy,
    phoneNumberWhatsapp,
  }: IRegisterFormProps) => {
    axios.defaults.baseURL = process.env.REACT_APP_BAZAR_AUTH_URL;
    const dataWithoutPhones = {
      personDTO: {
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ")[1],
        terms_accepted: iReadTermsAndPolicy,
      },
      emailDTO: {
        email,
      },
      password,
      rolName: profileType
    };

    const request = axios<IRegisterResponse>({
      method: "POST",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: "/auth/signup",
      data:{
        ...dataWithoutPhones,
        phones: [
          {
            phoneNumber: phoneNumber,
          },
          {
            phoneNumber: whatsAppCommunication ? phoneNumber : phoneNumberWhatsapp,
            whatsappValidate: whatsAppCommunication
          }
        ],
      }
    });
    return trackPromise(request);
  };

  const enrollSmsProvider = ({ email, password }: ILoginProvider) => {
    const request = axios({
      method: "POST",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: "/auth/enrollAuthenticator",
      data: {
        emailDTO: {
          email,
        },
        password,
      }
    });
    return trackPromise(request);
  };

  const confirmEnrollProvider = ({ mfaToken, oobCode, bindingCode }: IAuthConfirmationRequest) => {
    const request = axios({
      method: "POST",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: "/auth/confirmEnrollment",
      data: {
        mfaToken,
        oobCode,
        bindingCode,
      }
    });
    return trackPromise(request);
  };

  const confirmLoginChallengeProvider = ({ mfaToken, oobCode, bindingCode, uuid }: IAuthConfirmationRequest) => {
    const request = axios({
      method: "POST",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: "/auth/confirmLoginChallenge",
      data: {
        mfaToken,
        oobCode,
        bindingCode,
        uuid,
      }
    });
    return trackPromise(request);
  };

  return {
    loginProvider,
    getUserByUuid,
    registerProvider,
    enrollSmsProvider,
    confirmEnrollProvider,
    confirmLoginChallengeProvider,
  }
};

export default useAuthenticationProviders;