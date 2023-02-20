import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useWishlistProviders = () => {
  const getWishlistProducts = (userId: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/wishlist/${ userId }`,
    });
    return trackPromise(request);
  };

  const getWishlistByBasicProduct = (userId: string, basicProduct: string, offset: number = 0) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/wishlist/basic-product?limit=10&offset=${ offset }&basic_product=${ basicProduct }&user_uuid=${ userId }`,
    });
    return trackPromise(request);
  };

  return {
    getWishlistProducts,
    getWishlistByBasicProduct,
  };
};

export default useWishlistProviders;