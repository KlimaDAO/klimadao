import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetRetirementsAccountIdRetirementIndexProvenancePathParams,
  GetRetirementsAccountIdRetirementIndexProvenanceQueryParams,
  GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse,
} from "../types/GetRetirementsAccountIdRetirementIndexProvenance";

type GetRetirementsAccountIdRetirementIndexProvenanceClient = typeof client<
  GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse,
  never,
  never
>;
type GetRetirementsAccountIdRetirementIndexProvenance = {
  data: GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse;
  error: never;
  request: never;
  pathParams: GetRetirementsAccountIdRetirementIndexProvenancePathParams;
  queryParams: GetRetirementsAccountIdRetirementIndexProvenanceQueryParams;
  headerParams: never;
  response: GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse;
  client: {
    parameters: Partial<
      Parameters<GetRetirementsAccountIdRetirementIndexProvenanceClient>[0]
    >;
    return: Awaited<
      ReturnType<GetRetirementsAccountIdRetirementIndexProvenanceClient>
    >;
  };
};
export function getRetirementsAccountIdRetirementIndexProvenanceQueryOptions<
  TData extends
    GetRetirementsAccountIdRetirementIndexProvenance["response"] = GetRetirementsAccountIdRetirementIndexProvenance["response"],
  TError = GetRetirementsAccountIdRetirementIndexProvenance["error"],
>(
  accountId: GetRetirementsAccountIdRetirementIndexProvenancePathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexProvenancePathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndexProvenance["queryParams"],
  options: GetRetirementsAccountIdRetirementIndexProvenance["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/retirements/${accountId}/${retirementIndex}/provenance`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve a retirement provenance records
 * @summary Retirement provenance records
 * @link /retirements/:account_id/:retirement_index/provenance */
export function useGetRetirementsAccountIdRetirementIndexProvenance<
  TData extends
    GetRetirementsAccountIdRetirementIndexProvenance["response"] = GetRetirementsAccountIdRetirementIndexProvenance["response"],
  TError = GetRetirementsAccountIdRetirementIndexProvenance["error"],
>(
  accountId: GetRetirementsAccountIdRetirementIndexProvenancePathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexProvenancePathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndexProvenance["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetRetirementsAccountIdRetirementIndexProvenance["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url =
    `/retirements/${accountId}/${retirementIndex}/provenance` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getRetirementsAccountIdRetirementIndexProvenanceQueryOptions<
        TData,
        TError
      >(accountId, retirementIndex, params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
