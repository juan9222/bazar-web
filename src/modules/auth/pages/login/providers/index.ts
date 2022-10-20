import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { ILoginProvider, ILoginResponse } from "../interfaces";

const useLoginProviders = () => {

  const loginProvider = ({
    email, password
  }: ILoginProvider) => {
    axios.defaults.baseURL = `${ process.env.REACT_APP_BAZAR_AUTH_URL }/api/${ process.env.REACT_APP_BAZAR_AUTH_VERSION }`;
    const request = axios<ILoginResponse>({
      method: "POST",
      url: "/auth/login",
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