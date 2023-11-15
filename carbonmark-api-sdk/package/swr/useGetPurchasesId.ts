import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../client";
import type {
  GetPurchasesIdPathParams,
  GetPurchasesIdQueryParams,
  GetPurchasesIdQueryResponse,
} from "../types/GetPurchasesId";

export function getPurchasesIdQueryOptions<
  TData = GetPurchasesIdQueryResponse,
  TError = unknown,
>(
  id: GetPurchasesIdPathParams["id"],
  params?: GetPurchasesIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/purchases/${id}`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve the details of a purchase by its ID (transaction hash)
 * @summary Purchase details
 * @link /purchases/:id
 */

export function useGetPurchasesId<
  TData = GetPurchasesIdQueryResponse,
  TError = unknown,
>(
  id: GetPurchasesIdPathParams["id"],
  params?: GetPurchasesIdQueryParams,
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

  const url = shouldFetch ? `/purchases/${id}` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getPurchasesIdQueryOptions<TData, TError>(id, params, clientOptions),
    ...queryOptions,
  });

  return query;
}
