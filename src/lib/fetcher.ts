import { getCookie, cookieNames, deleteCookie } from "./cookies";

export interface FetcherPropsOptions {
  method?: string;
  header?: Record<string, string>;
  body?: Record<string, any>;
}

const fetcher = async (
  path: string,
  options?: FetcherPropsOptions
): Promise<any> => {
  try {
    let token: string | null = null;
    const tokenData = getCookie(cookieNames.access_token);
    if (tokenData) {
      token = tokenData;
    }

    const { method = "GET", header = {}, body = {} } = options || {};

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/api${path}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...header,
        },
        ...(method !== "GET" ? { body: JSON.stringify(body) } : {}),
      }
    );
    const responseData = await response.json();
    console.log({ responseData });

    if (!response.ok) {
      const { message = "" } = responseData;
      switch (message) {
        case "INVALID_TOKEN":
        case "TOKEN_NOT_FOUND":
          deleteCookie(cookieNames.access_token);
          window.location.href = "/";
          break;
        case "TOKEN_FOUND":
          window.location.href = "/store";
          break;
        case "INVALID_STORE_TOKEN":
          window.location.href = "/stores";
          break;
        default:
          // Handle other error messages
          break;
      }
    }

    return responseData;
  } catch (err) {
    console.error(err);
    return {};
  }
};

export default fetcher;
