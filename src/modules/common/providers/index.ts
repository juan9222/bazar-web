import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useCommonProviders = () => {
  const getUserInfoByUuid = () => {
    const uuid = localStorage.getItem("uuid");
    const request = axios({
      method: "GET",
      url: `/user/person/uuid/${ uuid }`
    });
    return trackPromise(request);
  };

  const getCountries = () => {
    const request = axios({
      method: "GET",
      url: "/country"
    });
    return trackPromise(request);
  };

  const getCitiesByCountryId = (countryId: string | number) => {
    const request = axios({
      method: "GET",
      url: `/city/${ countryId }`
    });
    return trackPromise(request);
  };

  return {
    getUserInfoByUuid,
    getCountries,
    getCitiesByCountryId,
  };
};

export default useCommonProviders;