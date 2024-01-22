import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetListingsIdPathParams,
  GetListingsIdQueryParams,
  GetListingsIdQueryResponse,
} from "../types/GetListingsId";

type GetListingsIdClient = typeof client<
  GetListingsIdQueryResponse,
  never,
  never
>;
type GetListingsId = {
  data: GetListingsIdQueryResponse;
  error: never;
  request: never;
  pathParams: GetListingsIdPathParams;
  queryParams: GetListingsIdQueryParams;
  headerParams: never;
  response: GetListingsIdQueryResponse;
  client: {
    parameters: Partial<Parameters<GetListingsIdClient>[0]>;
    return: Awaited<ReturnType<GetListingsIdClient>>;
  };
};
export function getListingsIdQueryOptions<
  TData extends GetListingsId["response"] = GetListingsId["response"],
  TError = GetListingsId["error"],
>(
  id: GetListingsIdPathParams["id"],
  params?: GetListingsId["queryParams"],
  options: GetListingsId["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/listings/${id}`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Get a listing by its identifier
 * @summary Listing
 * @link /listings/:id */
export function useGetListingsId<
  TData extends GetListingsId["response"] = GetListingsId["response"],
  TError = GetListingsId["error"],
>(
  id: GetListingsIdPathParams["id"],
  params?: GetListingsId["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetListingsId["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/listings/${id}` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getListingsIdQueryOptions<TData, TError>(id, params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
