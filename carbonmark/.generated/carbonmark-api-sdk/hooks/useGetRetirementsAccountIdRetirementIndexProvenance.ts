import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetRetirementsAccountIdRetirementIndexProvenancePathParams,
  GetRetirementsAccountIdRetirementIndexProvenanceQueryParams,
  GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse,
} from "../types/GetRetirementsAccountIdRetirementIndexProvenance";

export function getRetirementsAccountIdRetirementIndexProvenanceQueryOptions<
  TData = GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse,
  TError = unknown,
>(
  accountId: GetRetirementsAccountIdRetirementIndexProvenancePathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexProvenancePathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndexProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/retirements/${accountId}/${retirementIndex}/provenance`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve a retirement provenance records
 * @summary Retirement provenance records
 * @link /retirements/:account_id/:retirement_index/provenance
 */

export function useGetRetirementsAccountIdRetirementIndexProvenance<
  TData = GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse,
  TError = unknown,
>(
  accountId: GetRetirementsAccountIdRetirementIndexProvenancePathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexProvenancePathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndexProvenanceQueryParams,
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
    ? `/retirements/${accountId}/${retirementIndex}/provenance`
    : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getRetirementsAccountIdRetirementIndexProvenanceQueryOptions<
      TData,
      TError
    >(accountId, retirementIndex, params, clientOptions),
    ...queryOptions,
  });

  return query;
}
