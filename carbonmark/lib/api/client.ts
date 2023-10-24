import { urls } from "lib/constants";

export type RequestConfig<TVariables = unknown> = {
  method: "get" | "put" | "patch" | "post" | "delete";
  url: string;
  params?: unknown;
  data?: TVariables;
  headers?: HeadersInit;
};

export const fetchClient = async <TData, TVariables = unknown>(
  request: RequestConfig<TVariables>
): Promise<TData> => {
  const response = await fetch(
    `${urls.api.base}${request.url}${request.params}`,
    {
      method: request.method,
      body: JSON.stringify(request.data),
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
