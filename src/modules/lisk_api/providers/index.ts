import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useBazarWalletProviders = () => {

  const getWalletByUser = (data: any) => {
    const request = axios({
      method: "PUT",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: `/user/wallet/getAddressPassphrases`,
      data: data
    });
    return trackPromise(request);
  };

  return {
    getWalletByUser,
  };
};

export default useBazarWalletProviders;
