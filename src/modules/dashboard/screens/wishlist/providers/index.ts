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

  return {
    getWishlistProducts
  };
};

export default useWishlistProviders;