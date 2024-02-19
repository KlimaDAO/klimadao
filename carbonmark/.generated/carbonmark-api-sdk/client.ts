import { urls } from "lib/constants";

export type RequestConfig<TVariables = unknown> = {
  method: "get" | "put" | "patch" | "post" | "delete";
  url: string;
  params?: unknown;
  data?: TVariables | unknown;
  headers?: HeadersInit;
};

export type ResponseConfig<TData> = { data: TData };

export type ApiError<TError> = {
  message: string;
  data?: TError;
};

type ParamsObject = Record<string, string | string[]>;

/**
 * Transforms a request params object into a query string
 * Handles Arrays
 */
export function serializeParams(params: ParamsObject): string {
  if (params && Object.keys(params).length > 0) {
    const query: Array<string> = [];
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (Array.isArray(value))
        value.forEach((v) => {
          query.push(`${key}=${encodeURIComponent(v)}`);
        });
      else if (value) return query.push(`${key}=${encodeURIComponent(value)}`);
    });
    if (query.length) return `?${query.join("&")}`;
  }
  return "";
}

export const fetchClient = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  request: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const params = request.params as ParamsObject;
  const url = `${urls.api.base}${request.url}${serializeParams(params)}`;
  let response;
  try {
    response = await fetch(url, {
      method: request.method,
      body: JSON.stringify(request.data),
      headers: {
        "Content-Type": "application/json",
        ...request.headers,
      },
    });
  } catch (e) {
    console.error(`Fetch error: ${url}`);
    throw e;
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      message: `HTTP error! status: ${response.status}`,
      data: errorData as TError,
    };
  }
  const data = await response.json();
  return { data };
};

export default fetchClient;
