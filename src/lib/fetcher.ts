import { cookieNames, getCookieAsync } from "./cookies";

export interface FetcherPropsOptions {
  method?: string;
  header?: any;
  body?: any;
}

const fetcher = async (
  path: string,
  options?: FetcherPropsOptions
): Promise<any> => {
  try {
    let token: string | null = null;
    const tokenData = await getCookieAsync(cookieNames.access_token);

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
    return responseData;
  } catch (err) {
    console.error(err);
    return {};
  }
};

// Function to fetch data using the GET method
fetcher.get = (path: string, header?: any) => {
  return fetcher(path, { method: "GET", header });
};

// Function to fetch data using the POST method
fetcher.post = (path: string, body?: any, header?: any) => {
  return fetcher(path, { method: "POST", header, body });
};

// Function to fetch data using the PATCH method
fetcher.patch = (path: string, body?: any, header?: any) => {
  return fetcher(path, { method: "PATCH", header, body });
};

// Function to fetch data using the DELETE method
fetcher.delete = (path: string, body?: any, header?: any) => {
  return fetcher(path, { method: "DELETE", header, body });
};

export default fetcher;
