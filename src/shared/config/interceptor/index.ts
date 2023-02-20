import { useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const useInterceptor = () => {
  const handleRequestSuccess = (request: AxiosRequestConfig): AxiosRequestConfig => {
    request.timeout = 100000;
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