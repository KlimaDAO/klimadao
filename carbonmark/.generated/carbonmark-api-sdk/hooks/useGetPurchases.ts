import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetPurchasesQueryParams,
  GetPurchasesQueryResponse,
} from "../types/GetPurchases";

export function getPurchasesQueryOptions<
  TData = GetPurchasesQueryResponse,
  TError = unknown,
>(
  params?: GetPurchasesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/purchases`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve a list of recent purchases
 * @summary Recent purchases
 * @link /purchases
 */

export function useGetPurchases<
  TData = GetPurchasesQueryResponse,
  TError = unknown,
>(
  params?: GetPurchasesQueryParams,
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

  const url = shouldFetch ? `/purchases` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getPurchasesQueryOptions<TData, TError>(params, clientOptions),
    ...queryOptions,
  });

  return query;
}
