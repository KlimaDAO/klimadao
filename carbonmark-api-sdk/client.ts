import type { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import axios from "axios";

/**
 * This client is necessary only so that we can set the base url for our api and it's generated sdk
 * I'm sure there is a better way..
 * See: https://www.kubb.dev/plugins/swagger-client/client#default-client
 */
declare const AXIOS_BASE: string;
declare const AXIOS_HEADERS: string;

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
  baseURL: AXIOS_BASE ?? undefined,
  headers:
    typeof AXIOS_HEADERS !== "undefined"
      ? (JSON.parse(AXIOS_HEADERS) as AxiosHeaders)
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
