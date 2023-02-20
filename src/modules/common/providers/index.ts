import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useCommonProviders = () => {
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
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: "/avatars",
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
    getCountries,
    getCitiesByCountryId,
    getAvatars,
    getUser,
  };
};

export default useCommonProviders;