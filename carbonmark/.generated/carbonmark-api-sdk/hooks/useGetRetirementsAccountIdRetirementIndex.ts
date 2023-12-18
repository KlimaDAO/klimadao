import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetRetirementsAccountIdRetirementIndexPathParams,
  GetRetirementsAccountIdRetirementIndexQueryParams,
  GetRetirementsAccountIdRetirementIndexQueryResponse,
} from "../types/GetRetirementsAccountIdRetirementIndex";

export function getRetirementsAccountIdRetirementIndexQueryOptions<
  TData = GetRetirementsAccountIdRetirementIndexQueryResponse,
  TError = unknown,
>(
  accountId: GetRetirementsAccountIdRetirementIndexPathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexPathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndexQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/retirements/${accountId}/${retirementIndex}`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve a klima retirement by account and retirement index
 * @summary Retirement
 * @link /retirements/:account_id/:retirement_index
 */

export function useGetRetirementsAccountIdRetirementIndex<
  TData = GetRetirementsAccountIdRetirementIndexQueryResponse,
  TError = unknown,
>(
  accountId: GetRetirementsAccountIdRetirementIndexPathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexPathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndexQueryParams,
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

  const url = shouldFetch
    ? `/retirements/${accountId}/${retirementIndex}`
    : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getRetirementsAccountIdRetirementIndexQueryOptions<TData, TError>(
      accountId,
      retirementIndex,
      params,
      clientOptions
    ),
    ...queryOptions,
  });

  return query;
}
