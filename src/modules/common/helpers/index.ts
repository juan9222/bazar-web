import axios from 'axios';
export const setDefaultAuthorizationToken = (token?: string) => {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${ token ?? "" }` : "";
};