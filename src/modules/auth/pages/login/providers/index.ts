import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { ILoginProvider, ILoginResponse } from "../interfaces";

const useLoginProviders = () => {

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
  return {
    loginProvider
  };
};

export default useLoginProviders;