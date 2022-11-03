import axios from 'axios';
export const setDefaultAuthorizationToken = (token?: string) => {
  axios.defaults.headers.common.Authorization =  `Bearer ${token}`;
};

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

export const getRolesToStorage = (roles: any) => {
  return JSON.stringify(
    roles.map((role:any) => role.name)
  );
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};