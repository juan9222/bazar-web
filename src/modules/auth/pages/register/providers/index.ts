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
      url: "/auth/signup",
      data: whatsAppCommunication ?
        {
          ...dataWithoutPhones, phones: [
            {
              phoneNumber: phoneNumber,
            },
            {
              phoneNumber: phoneNumber,
              whatsappValidate: whatsAppCommunication
            }
          ],
        } : {
          ...dataWithoutPhones, phones: [
            {
              phoneNumber: phoneNumber,
            },
            {
              phoneNumber: phoneNumberWhatsapp,
              whatsappValidate: whatsAppCommunication
            }
          ],
        }
    });
    return trackPromise(request);
  };

  const enrollSmsProvider = ({ email, password }: {
    email: string; password: string;
  }) => {
    const request = axios({
      method: "POST",
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

  const confirmEnrollProvider = ({ mfaToken, oobCode, bindingCode }: {
    mfaToken: string; oobCode: string; bindingCode: string;
  }) => {
    const request = axios({
      method: "POST",
      url: "/auth/confirmEnrollment",
      data: {
        mfaToken,
        oobCode,
        bindingCode,
      }
    });
    return trackPromise(request);
  };

  const confirmLoginChallengeProvider = ({ mfaToken, oobCode, bindingCode, uuid }: {
    mfaToken: string; oobCode: string; bindingCode: string; uuid: string;
  }) => {
    const request = axios({
      method: "POST",
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
    registerProvider,
    enrollSmsProvider,
    confirmEnrollProvider,
    confirmLoginChallengeProvider,
  };
};

export default useRegisterProviders;