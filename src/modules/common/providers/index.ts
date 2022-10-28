import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useCommonProviders = () => {
  const getUserInfoByUuid = () => {
    const uuid = localStorage.getItem("uuid");
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: `/user/person/uuid/${ uuid }`
    });
    return trackPromise(request);
  };

  const getCountries = () => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: "/country"
    });
    return trackPromise(request);
  };

  const getCitiesByCountryId = (countryId: string | number) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_AUTH_URL,
      url: `/city/${ countryId }`
    });
    return trackPromise(request);
  };

  const getAvatars = () => {
    const request = axios({
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/avatars",
    });
    return trackPromise(request);
  };

  return {
    getUserInfoByUuid,
    getCountries,
    getCitiesByCountryId,
    getAvatars,
  };
};

export default useCommonProviders;