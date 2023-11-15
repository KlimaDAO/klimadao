import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../client";
import type {
  GetVintagesQueryParams,
  GetVintagesQueryResponse,
} from "../types/GetVintages";

export function getVintagesQueryOptions<
  TData = GetVintagesQueryResponse,
  TError = unknown,
>(
  params?: GetVintagesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/vintages`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve an array of the vintages of available carbon projects
 * @summary Vintages
 * @link /vintages
 */

export function useGetVintages<
  TData = GetVintagesQueryResponse,
  TError = unknown,
>(
  params?: GetVintagesQueryParams,
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};

  const url = shouldFetch ? `/vintages` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getVintagesQueryOptions<TData, TError>(params, clientOptions),
    ...queryOptions,
  });

  return query;
}
