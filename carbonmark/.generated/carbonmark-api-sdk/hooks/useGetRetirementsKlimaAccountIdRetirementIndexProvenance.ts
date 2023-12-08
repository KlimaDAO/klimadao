import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams,
  GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryParams,
  GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryResponse,
} from "../types/GetRetirementsKlimaAccountIdRetirementIndexProvenance";

export function getRetirementsKlimaAccountIdRetirementIndexProvenanceQueryOptions<
  TData = GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryResponse,
  TError = unknown,
>(
  accountId: GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams["account_id"],
  retirementIndex: GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams["retirement_index"],
  params?: GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/retirements/klima/${accountId}/${retirementIndex}/provenance`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve a retirement provenance records
 * @summary Retirement provenance records
 * @link /retirements/klima/:account_id/:retirement_index/provenance
 */

export function useGetRetirementsKlimaAccountIdRetirementIndexProvenance<
  TData = GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryResponse,
  TError = unknown,
>(
  accountId: GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams["account_id"],
  retirementIndex: GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams["retirement_index"],
  params?: GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryParams,
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
    ? `/retirements/klima/${accountId}/${retirementIndex}/provenance`
    : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getRetirementsKlimaAccountIdRetirementIndexProvenanceQueryOptions<
      TData,
      TError
    >(accountId, retirementIndex, params, clientOptions),
    ...queryOptions,
  });

  return query;
}
