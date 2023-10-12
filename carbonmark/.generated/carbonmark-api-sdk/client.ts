import { urls } from "lib/constants";

export type RequestConfig<Data> = {
  method: "get" | "put" | "patch" | "post" | "delete";
  url: string;
  params?: unknown;
  body?: Data;
  headers?: HeadersInit;
  disabled?: boolean;
};

export const fetchClient = async <TData>({
  method,
  url,
  params = "",
  body,
  headers,
  disabled = false,
}: RequestConfig<TData>): Promise<Response> => {
  if (disabled) {
    return new Response(undefined, { status: 200 });
  }
  const response = await fetch(`${urls.api.base}${url}${params}`, {
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
