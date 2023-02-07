import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useProductDetailsProviders = () => {
  const getProductDetails = (productId: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/detail/${ productId }`,
    });
    return trackPromise(request);
  };

  const patchProductAvailability = (productId: string, availability: number) => {
    const request = axios({
      method: "PATCH",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: '/products/availability',
      params: {
        uuid_product: productId,
        available_for_sale: availability,
      }
    });
    return trackPromise(request);
  };

  const deleteProduct = (productId: string) => {
    const request = axios({
      method: "PATCH",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/update-delete/${ productId }`
    });
    return trackPromise(request);
  };

  return {
    getProductDetails,
    patchProductAvailability,
    deleteProduct,
  };
};

export default useProductDetailsProviders;