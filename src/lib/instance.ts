import axios, { AxiosError } from "axios";
import { cookieNames, getCookie } from "./cookies";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api/`,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  function (config) {
    const token = getCookie(cookieNames.access_token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data?.data || response?.data || response;
  },
  function (error) {
    if (error instanceof AxiosError) {
      const massage = error.response?.data?.massage || "";
      if (massage) {
        return Promise.reject(massage);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
