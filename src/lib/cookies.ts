import Cookies from "js-cookie";

export const cookieNames = {
  access_token: "access_token",
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const setCookie = (name: string, value: string, expires = 2) => {
  Cookies.set(name, value, { expires });
  return;
};

export const deleteCookie = (name: string) => {
  Cookies.remove(name);
  return;
};
