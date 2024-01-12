import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetRetirementsAccountIdRetirementIndexPathParams,
  GetRetirementsAccountIdRetirementIndexQueryParams,
  GetRetirementsAccountIdRetirementIndexQueryResponse,
} from "../types/GetRetirementsAccountIdRetirementIndex";

type GetRetirementsAccountIdRetirementIndexClient = typeof client<
  GetRetirementsAccountIdRetirementIndexQueryResponse,
  never,
  never
>;
type GetRetirementsAccountIdRetirementIndex = {
  data: GetRetirementsAccountIdRetirementIndexQueryResponse;
  error: never;
  request: never;
  pathParams: GetRetirementsAccountIdRetirementIndexPathParams;
  queryParams: GetRetirementsAccountIdRetirementIndexQueryParams;
  headerParams: never;
  response: GetRetirementsAccountIdRetirementIndexQueryResponse;
  client: {
    parameters: Partial<
      Parameters<GetRetirementsAccountIdRetirementIndexClient>[0]
    >;
    return: Awaited<ReturnType<GetRetirementsAccountIdRetirementIndexClient>>;
  };
};
export function getRetirementsAccountIdRetirementIndexQueryOptions<
  TData extends
    GetRetirementsAccountIdRetirementIndex["response"] = GetRetirementsAccountIdRetirementIndex["response"],
  TError = GetRetirementsAccountIdRetirementIndex["error"],
>(
  accountId: GetRetirementsAccountIdRetirementIndexPathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexPathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndex["queryParams"],
  options: GetRetirementsAccountIdRetirementIndex["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/retirements/${accountId}/${retirementIndex}`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve a klima retirement by account and retirement index
 * @summary Retirement
 * @link /retirements/:account_id/:retirement_index */
export function useGetRetirementsAccountIdRetirementIndex<
  TData extends
    GetRetirementsAccountIdRetirementIndex["response"] = GetRetirementsAccountIdRetirementIndex["response"],
  TError = GetRetirementsAccountIdRetirementIndex["error"],
>(
  accountId: GetRetirementsAccountIdRetirementIndexPathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexPathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndex["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetRetirementsAccountIdRetirementIndex["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/retirements/${accountId}/${retirementIndex}` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getRetirementsAccountIdRetirementIndexQueryOptions<TData, TError>(
        accountId,
        retirementIndex,
        params,
        clientOptions
      ),
      ...queryOptions,
    }
  );
  return query;
}
