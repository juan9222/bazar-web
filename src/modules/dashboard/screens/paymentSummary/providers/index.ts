import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const usePaymentSummaryProvider = () => {

  const getSellerWhatsappLink = (sellerId: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/users/whatsapp-link/${ sellerId }`
    });
    return trackPromise(request);
  };

  return {
    getSellerWhatsappLink,
  };
};

export default usePaymentSummaryProvider;