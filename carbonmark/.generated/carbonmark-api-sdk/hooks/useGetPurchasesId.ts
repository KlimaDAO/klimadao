import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetPurchasesIdPathParams,
  GetPurchasesIdQueryParams,
  GetPurchasesIdQueryResponse,
} from "../types/GetPurchasesId";

type GetPurchasesIdClient = typeof client<
  GetPurchasesIdQueryResponse,
  never,
  never
>;
type GetPurchasesId = {
  data: GetPurchasesIdQueryResponse;
  error: never;
  request: never;
  pathParams: GetPurchasesIdPathParams;
  queryParams: GetPurchasesIdQueryParams;
  headerParams: never;
  response: GetPurchasesIdQueryResponse;
  client: {
    parameters: Partial<Parameters<GetPurchasesIdClient>[0]>;
    return: Awaited<ReturnType<GetPurchasesIdClient>>;
  };
};
export function getPurchasesIdQueryOptions<
  TData extends GetPurchasesId["response"] = GetPurchasesId["response"],
  TError = GetPurchasesId["error"],
>(
  id: GetPurchasesIdPathParams["id"],
  params?: GetPurchasesId["queryParams"],
  options: GetPurchasesId["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/purchases/${id}`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve the details of a purchase by its ID (transaction hash)
 * @summary Purchase details
 * @link /purchases/:id */
export function useGetPurchasesId<
  TData extends GetPurchasesId["response"] = GetPurchasesId["response"],
  TError = GetPurchasesId["error"],
>(
  id: GetPurchasesIdPathParams["id"],
  params?: GetPurchasesId["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetPurchasesId["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/purchases/${id}` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getPurchasesIdQueryOptions<TData, TError>(id, params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
