import axios from "axios";
import { trackPromise } from "react-promise-tracker";

const useUserListProviders = () => {
  const getUsersList = (page: number) => {
    const request = axios({
      method: "GET",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: `/users/?limit=10&offset=${ page }`,
    });
    return trackPromise(request);
  };


  return {
    getUsersList,
  };
};

export default useUserListProviders;
