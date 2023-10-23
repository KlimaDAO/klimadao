import { urls } from "lib/constants";

export type RequestConfig<Data = unknown> = {
  method: "get" | "put" | "patch" | "post" | "delete";
  url: string;
  params?: unknown;
  body?: Data;
  headers?: HeadersInit;
};

export const fetchClient = async <TData>(
  request: RequestConfig
): Promise<TData> => {
  const response = await fetch(
    `${urls.api.base}${request.url}${request.params}`,
    {
      method: request.method,
      body: JSON.stringify(request.body),
      headers: {
        "Content-Type": "application/json",
        ...request.headers,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export default fetchClient;
