import { urls } from "lib/constants";

export type RequestConfig = {
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
  url: string;
  params?: unknown;
  body?: unknown;
  headers?: HeadersInit;
};

export const fetchClient = async ({
  method,
  url,
  body,
  headers,
}: RequestConfig): Promise<Response> => {
  const response = await fetch(`${urls.api.base}/${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default fetchClient;
