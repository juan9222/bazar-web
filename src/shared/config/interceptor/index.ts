import { useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const useInterceptor = () => {
  const handleRequestSuccess = (request: AxiosRequestConfig): AxiosRequestConfig => {
    request.timeout = 10000;
    const { headers } = request;
    const token = localStorage.getItem("accessToken");
    if (headers) {
      if (token !== null) {
        headers['Authorization'] = `Bearer ${ token }`;
      }
      headers["Content-Type"] = "application/json";
      headers.accept = "application/json";
    }
    return request;
  };

  const handleRequestError = (error: unknown) => {
    return error;
  };

  const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  const handleResponseError = (error: unknown) => {
    throw error;
  };

  useEffect(() => {
    axios.defaults.params = {};
    axios.interceptors.request.use(handleRequestSuccess, handleRequestError);
    axios.interceptors.response.use(handleResponseSuccess, handleResponseError);
  }, []);
};

export default useInterceptor;