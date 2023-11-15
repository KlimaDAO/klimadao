import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../client";
import type { GetVintagesQueryResponse } from "../models/GetVintages";

export function getVintagesQueryOptions<
  TData = GetVintagesQueryResponse,
  TError = unknown,
>(
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/vintages`,

        ...options,
      });
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
>(options?: {
  query?: SWRConfiguration<TData, TError>;
  client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
}): SWRResponse<TData, TError> {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};

  const query = useSWR<TData, TError, string>(`/vintages`, {
    ...getVintagesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  });

  return query;
}
