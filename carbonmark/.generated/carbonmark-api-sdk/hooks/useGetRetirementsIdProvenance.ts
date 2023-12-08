import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetRetirementsIdProvenancePathParams,
  GetRetirementsIdProvenanceQueryParams,
  GetRetirementsIdProvenanceQueryResponse,
} from "../types/GetRetirementsIdProvenance";

export function getRetirementsIdProvenanceQueryOptions<
  TData = GetRetirementsIdProvenanceQueryResponse,
  TError = unknown,
>(
  id: GetRetirementsIdProvenancePathParams["id"],
  params?: GetRetirementsIdProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/retirements/${id}/provenance`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve a retirement provenance records
 * @summary Retirement provenance records
 * @link /retirements/:id/provenance
 */

export function useGetRetirementsIdProvenance<
  TData = GetRetirementsIdProvenanceQueryResponse,
  TError = unknown,
>(
  id: GetRetirementsIdProvenancePathParams["id"],
  params?: GetRetirementsIdProvenanceQueryParams,
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

  const url = shouldFetch ? `/retirements/${id}/provenance` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getRetirementsIdProvenanceQueryOptions<TData, TError>(
      id,
      params,
      clientOptions
    ),
    ...queryOptions,
  });

  return query;
}
