import Cookies from "js-cookie";

export const cookieNames = {
  access_token: "access_token",
};

export const getCookie = (name: string) => {
  const value = Cookies.get(name);
  return value;
};

export const getCookieAsync = async (
  name: string,
): Promise<string | undefined> => {
  return new Promise((resolve) => {
    const cookieValue = Cookies.get(name);
    resolve(cookieValue);
  });
};

export const setCookie = (name: string, value: string, expires = 2) => {
  Cookies.set(name, value, { expires });
  return;
};

export const setCookieAsync = async (
  name: string,
  value: string,
  expires = 2,
) => {
  return new Promise((resolve) => {
    Cookies.set(name, value, { expires });
    resolve(name);
  });
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
  return;
};

export const removeCookieAsync = async (name: string) => {
  return new Promise((resolve) => {
    Cookies.remove(name);
    resolve(name);
  });
};
