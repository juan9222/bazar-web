import axios from "axios";
import { trackPromise } from "react-promise-tracker";

export const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkIta3R0NXByZElYNE9Qd25SaEI3RiJ9.eyJodHRwczovL2Rldi1tZWVya2F0L3JvbGVzIjpbInNlbGxlciJdLCJodHRwczovL21lZXJrYXQvZ3JvdXBzIjpbInNlbGxlciJdLCJpc3MiOiJodHRwczovL2Rldi1tZWVya2F0LnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzZjMDFjYmQ5MTNiZDI2ODdhOWIwYjYiLCJhdWQiOlsiaHR0cHM6Ly9kZXYtbWVlcmthdC51cy5hdXRoMC5jb20vYXBpL3YyLyIsImh0dHBzOi8vZGV2LW1lZXJrYXQudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY2ODA4OTkzNiwiZXhwIjoxNjY4MTc2MzM2LCJhenAiOiJacjhYUTNXM3Q2Z2xtRUlrR0haaHRsZWpqU0FWUmVFeiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcmVhZDpjdXJyZW50X3VzZXIgdXBkYXRlOmN1cnJlbnRfdXNlcl9tZXRhZGF0YSBkZWxldGU6Y3VycmVudF91c2VyX21ldGFkYXRhIGNyZWF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEgY3JlYXRlOmN1cnJlbnRfdXNlcl9kZXZpY2VfY3JlZGVudGlhbHMgZGVsZXRlOmN1cnJlbnRfdXNlcl9kZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmN1cnJlbnRfdXNlcl9pZGVudGl0aWVzIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.viL2AtYgG0Ca1f4EdvWM88Z9EQFu4GQL_JBpLQIAb9srnauGExgu4tr1YY88lsB9dPjWansWq4D1ic--S8oRfdCKZLNHDQvVx704CwDCWzlvK7D8YDBEpHZaLLLQ31Hls740P_Dk-CcOpbB5bAMTbNgiLoMJlbyXCXt_YGYMEzTEslheddPwUcx9j-PCeQtIsoLfqWEr2SQJvG5c_8jMeEVNaMpa9BFqjkqSi4wOXXLnzCdU6eMzHOZY9TqGqtJxgmWRVIZ6sADfNuq8rH4_dMR6CNYyajVB7HtOqRX8fln_Wfb5C7Q9SHOmSyOpDtdTs12kXO3VmPcM73HUEZE1jA";

const useProductCreationProviders = () => {
  const getProducts = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/products/basic-products",
      headers: {},
    });
    return trackPromise(request);
  };

  const getProductTypesByProduct = (productvalue: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/product-types/${ productvalue }`,
      headers: {},
    });
    return trackPromise(request);
  };

  const getVarietiesByProduct = (productvalue: string) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/products/varieties/${ productvalue }`,
      headers: {},
    });
    return trackPromise(request);
  };

  const getSustainabilityCertificationsItems = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/products/sustainability-certifications",
      headers: {},
    });
    return trackPromise(request);
  };

  const getIncoterms = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/products/incoterms",
      headers: {},
    });
    return trackPromise(request);
  };

  const getMinimumOrders = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/products/minimum-orders",
      headers: {},
    });
    return trackPromise(request);
  };

  return {
    getProducts,
    getProductTypesByProduct,
    getVarietiesByProduct,
    getSustainabilityCertificationsItems,
    getIncoterms,
    getMinimumOrders,
  };
};

export default useProductCreationProviders;