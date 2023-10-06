import type { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import axios from "axios";
import { urls } from "lib/constants";

/**
 * This client is necessary only so that we can set the base url for our api and it's generated sdk
 * I'm sure there is a better way..
 * See: https://www.kubb.dev/plugins/swagger-client/client#default-client
 */

export type RequestConfig<TVariables = unknown> = {
  method: "get" | "put" | "patch" | "post" | "delete";
  url: string;
  params?: unknown;
  data?: TVariables;
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";
  signal?: AbortSignal;
  headers?: AxiosRequestConfig["headers"];
};

export const axiosInstance = axios.create({
  baseURL: urls.api.base,
  headers:
    typeof "{}" !== "undefined"
      ? (JSON.parse("{}") as AxiosHeaders)
      : undefined,
});

export const axiosClient = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  config: RequestConfig<TVariables>
): Promise<TData> => {
  const promise = axiosInstance
    .request<TData>({ ...config })
    .then(({ data }) => data)
    .catch((e: AxiosError<TError>) => {
      throw e;
    });

  return promise;
};

export default axiosClient;
