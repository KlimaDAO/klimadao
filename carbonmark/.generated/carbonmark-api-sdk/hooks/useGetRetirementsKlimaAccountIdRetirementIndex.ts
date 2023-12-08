import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetRetirementsKlimaAccountIdRetirementIndexPathParams,
  GetRetirementsKlimaAccountIdRetirementIndexQueryParams,
  GetRetirementsKlimaAccountIdRetirementIndexQueryResponse,
} from "../types/GetRetirementsKlimaAccountIdRetirementIndex";

export function getRetirementsKlimaAccountIdRetirementIndexQueryOptions<
  TData = GetRetirementsKlimaAccountIdRetirementIndexQueryResponse,
  TError = unknown,
>(
  accountId: GetRetirementsKlimaAccountIdRetirementIndexPathParams["account_id"],
  retirementIndex: GetRetirementsKlimaAccountIdRetirementIndexPathParams["retirement_index"],
  params?: GetRetirementsKlimaAccountIdRetirementIndexQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/retirements/klima/${accountId}/${retirementIndex}`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve a klima retirement by account and retirement index
 * @summary Retirement
 * @link /retirements/klima/:account_id/:retirement_index
 */

export function useGetRetirementsKlimaAccountIdRetirementIndex<
  TData = GetRetirementsKlimaAccountIdRetirementIndexQueryResponse,
  TError = unknown,
>(
  accountId: GetRetirementsKlimaAccountIdRetirementIndexPathParams["account_id"],
  retirementIndex: GetRetirementsKlimaAccountIdRetirementIndexPathParams["retirement_index"],
  params?: GetRetirementsKlimaAccountIdRetirementIndexQueryParams,
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
    ? `/retirements/klima/${accountId}/${retirementIndex}`
    : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getRetirementsKlimaAccountIdRetirementIndexQueryOptions<TData, TError>(
      accountId,
      retirementIndex,
      params,
      clientOptions
    ),
    ...queryOptions,
  });

  return query;
}
