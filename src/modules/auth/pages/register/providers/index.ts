import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { IRegisterFormProps, IRegisterResponse } from "../interfaces";

const useRegisterProviders = () => {

  const registerProvider = ({
    fullName,
    email,
    phoneNumber,
    whatsAppCommunication,
    profileType,
    password,
    iReadTermsAndPolicy,
  }: IRegisterFormProps) => {
    axios.defaults.baseURL = `${ process.env.REACT_APP_BAZAR_AUTH_URL }/api/${ process.env.REACT_APP_BAZAR_AUTH_VERSION }`;
    const request = axios<IRegisterResponse>({
      method: "POST",
      url: "/auth/signup",
      data: {
        personDTO: {
          firstName: fullName,
          terms_accepted: iReadTermsAndPolicy,
        },
        emailDTO: {
          email,
          phoneNumber: phoneNumber
        },
        password: password,
        phones: [
          {
            phoneNumber: phoneNumber,
            whatsappValidate: whatsAppCommunication
          }
        ],
        rolName: profileType
      }
    });
    return trackPromise(request);
  };
  return {
    registerProvider
  };
};

export default useRegisterProviders;