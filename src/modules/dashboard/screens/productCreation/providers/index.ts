import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useProductCreationProviders = () => {
  const getProductTypesByProduct = (productvalue: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/product-types/${ productvalue }`,
    });
    return trackPromise(request);
  };

  const getVarietiesByProduct = (productvalue: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/varieties/${ productvalue }`,
    });
    return trackPromise(request);
  };

  const getSustainabilityCertificationsItems = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/products/sustainability-certifications",
    });
    return trackPromise(request);
  };

  const getIncoterms = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/products/incoterms",
    });
    return trackPromise(request);
  };

  const getMinimumOrders = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/products/minimum-orders",
    });
    return trackPromise(request);
  };

  return {
    getProductTypesByProduct,
    getVarietiesByProduct,
    getSustainabilityCertificationsItems,
    getIncoterms,
    getMinimumOrders,
  };
};

export default useProductCreationProviders;