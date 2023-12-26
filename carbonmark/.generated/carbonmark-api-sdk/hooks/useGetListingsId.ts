import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetListingsIdPathParams,
  GetListingsIdQueryParams,
  GetListingsIdQueryResponse,
} from "../types/GetListingsId";

export function getListingsIdQueryOptions<
  TData = GetListingsIdQueryResponse,
  TError = unknown,
>(
  id: GetListingsIdPathParams["id"],
  params?: GetListingsIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/listings/${id}`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Get a listing by its identifier
 * @summary Listing
 * @link /listings/:id
 */

export function useGetListingsId<
  TData = GetListingsIdQueryResponse,
  TError = unknown,
>(
  id: GetListingsIdPathParams["id"],
  params?: GetListingsIdQueryParams,
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

  const url = shouldFetch ? `/listings/${id}` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getListingsIdQueryOptions<TData, TError>(id, params, clientOptions),
    ...queryOptions,
  });

  return query;
}
