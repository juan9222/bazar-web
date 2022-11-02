import axios from 'axios';
export const setDefaultAuthorizationToken = (token?: string) => {
  axios.defaults.headers.common.Authorization = token ? `Bearer ${ token ?? "" }` : "";
};
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};