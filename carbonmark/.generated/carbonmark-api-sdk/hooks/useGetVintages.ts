import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetVintagesQueryParams,
  GetVintagesQueryResponse,
} from "../types/GetVintages";

type GetVintagesClient = typeof client<GetVintagesQueryResponse, never, never>;
type GetVintages = {
  data: GetVintagesQueryResponse;
  error: never;
  request: never;
  pathParams: never;
  queryParams: GetVintagesQueryParams;
  headerParams: never;
  response: GetVintagesQueryResponse;
  client: {
    parameters: Partial<Parameters<GetVintagesClient>[0]>;
    return: Awaited<ReturnType<GetVintagesClient>>;
  };
};
export function getVintagesQueryOptions<
  TData extends GetVintages["response"] = GetVintages["response"],
  TError = GetVintages["error"],
>(
  params?: GetVintages["queryParams"],
  options: GetVintages["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/vintages`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve an array of the vintages of available carbon projects
 * @summary Vintages
 * @link /vintages */
export function useGetVintages<
  TData extends GetVintages["response"] = GetVintages["response"],
  TError = GetVintages["error"],
>(
  params?: GetVintages["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetVintages["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/vintages` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getVintagesQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
