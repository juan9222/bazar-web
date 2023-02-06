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

  const createPaymentProvider = (data: any) => {
    const request = axios({
      method: "POST",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: `/user/payment`,
      data: data
    });
    return trackPromise(request);
  };

  const getPaymentProviderByProductId = (uuid: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: `/user/payment/product/${ uuid }`
    });
    return trackPromise(request);
  };

  return {
    getWalletByUser,
    createPaymentProvider,
    getPaymentProviderByProductId
  };
};

export default useBazarWalletProviders;
