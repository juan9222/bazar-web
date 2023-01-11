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

  const approveUser = (data: any) => {
    const request = axios({
      method: "PUT",
      baseURL: process.env.REACT_APP_BAZAR_URL,
      url: 'users/user-approval',
      data: data
    });
    return trackPromise(request);
  };

  return {
    getUsersList,
    approveUser,
  };
};

export default useUserListProviders;
