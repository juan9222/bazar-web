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

  const getSellerProducts = (userId: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/products-user/${ userId }`,
    });
    return trackPromise(request);
  };

  const getProductsList = (userId: string, basicProduct: string, offset: number) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/products-user-category/${ userId }/${ basicProduct }?offset=${ offset }`,
    });
    return trackPromise(request);
  };

  return {
    getBasicProducts,
    getSellerProducts,
    getProductsList,
  };
};

export default useProductListProviders;
