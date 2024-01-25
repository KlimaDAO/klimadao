import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetPurchasesQueryParams,
  GetPurchasesQueryResponse,
} from "../types/GetPurchases";

type GetPurchasesClient = typeof client<
  GetPurchasesQueryResponse,
  never,
  never
>;
type GetPurchases = {
  data: GetPurchasesQueryResponse;
  error: never;
  request: never;
  pathParams: never;
  queryParams: GetPurchasesQueryParams;
  headerParams: never;
  response: GetPurchasesQueryResponse;
  client: {
    parameters: Partial<Parameters<GetPurchasesClient>[0]>;
    return: Awaited<ReturnType<GetPurchasesClient>>;
  };
};
export function getPurchasesQueryOptions<
  TData extends GetPurchases["response"] = GetPurchases["response"],
  TError = GetPurchases["error"],
>(
  params?: GetPurchases["queryParams"],
  options: GetPurchases["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/purchases`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve a list of recent purchases
 * @summary Recent purchases
 * @link /purchases */
export function useGetPurchases<
  TData extends GetPurchases["response"] = GetPurchases["response"],
  TError = GetPurchases["error"],
>(
  params?: GetPurchases["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetPurchases["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/purchases` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getPurchasesQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
