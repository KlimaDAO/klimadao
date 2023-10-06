import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetPurchasesIdPathParams,
  GetPurchasesIdQueryResponse,
} from "../models/GetPurchasesId";

export function getPurchasesIdQueryOptions<
  TData = GetPurchasesIdQueryResponse,
  TError = unknown,
>(
  id: GetPurchasesIdPathParams["id"],
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/purchases/${id}`,

        ...options,
      });
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
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  }
): SWRResponse<TData, TError> {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};

  const query = useSWR<TData, TError, string>(`/purchases/${id}`, {
    ...getPurchasesIdQueryOptions<TData, TError>(id, clientOptions),
    ...queryOptions,
  });

  return query;
}
