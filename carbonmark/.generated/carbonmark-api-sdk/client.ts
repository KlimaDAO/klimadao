import { urls } from "lib/constants";
import { notNil } from "lib/utils/functional.utils";
import { pickBy } from "lodash";

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

/** Removes all undefined or null values from the object  */
const definedParams = (obj: Record<string, unknown>) => {
  const filteredObj = pickBy(obj, notNil);
  return Object.keys(filteredObj).length > 0 ? filteredObj : null;
};

export const fetchClient = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  request: RequestConfig<TVariables>
): Promise<ResponseConfig<TData>> => {
  const paramsObject = definedParams(request.params as ParamsObject) as Record<
    string,
    string
  >;

  const params = paramsObject
    ? "?" + new URLSearchParams(paramsObject).toString()
    : "";

  const response = await fetch(`${urls.api.base}${request.url}${params}`, {
    method: request.method,
    body: JSON.stringify(request.data),
    headers: {
      "Content-Type": "application/json",
      ...request.headers,
    },
  });

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
