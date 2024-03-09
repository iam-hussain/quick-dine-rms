import axios, { AxiosError } from "axios";
import { cookieNames, deleteCookie, getCookie } from "./cookies";
import messages from "@/validations/messages";

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
    return (response?.data as any) || (response as any);
  },
  function (error) {
    if (error instanceof AxiosError) {
      const massage = error.response?.data?.code || "";
      if (massage) {
        if (massage === "INVALID_TOKEN" || massage === "TOKEN_NOT_FOUND") {
          deleteCookie(cookieNames.access_token);
          window.location.href = "/";
        }

        if (massage === "TOKEN_FOUND") {
          window.location.href = "/store";
        }

        if (massage === "INVALID_STORE_TOKEN") {
          window.location.href = "/stores";
        }

        return Promise.reject(massage);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
