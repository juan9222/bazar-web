import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useProductListProviders = () => {
  const getBasicProducts = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/products/basic-products",
    });
    return trackPromise(request);
  };

  const getSellerProducts = (sellerId: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/products-user/${ sellerId }`,
    });
    return trackPromise(request);
  };

  const getUser = (userUuid: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/users/${ userUuid }`,
    });
    return trackPromise(request);
  };

  return {
    getBasicProducts,
    getSellerProducts,
    getUser,
  };
};

export default useProductListProviders;
