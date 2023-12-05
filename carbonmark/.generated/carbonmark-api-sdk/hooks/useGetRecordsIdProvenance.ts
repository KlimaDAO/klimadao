import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetRecordsIdProvenancePathParams,
  GetRecordsIdProvenanceQueryParams,
  GetRecordsIdProvenanceQueryResponse,
} from "../types/GetRecordsIdProvenance";

export function getRecordsIdProvenanceQueryOptions<
  TData = GetRecordsIdProvenanceQueryResponse,
  TError = unknown,
>(
  id: GetRecordsIdProvenancePathParams["id"],
  params?: GetRecordsIdProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/records/${id}/provenance`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve a record and its history by its transaction ID
 * @summary Record details
 * @link /records/:id/provenance
 */

export function useGetRecordsIdProvenance<
  TData = GetRecordsIdProvenanceQueryResponse,
  TError = unknown,
>(
  id: GetRecordsIdProvenancePathParams["id"],
  params?: GetRecordsIdProvenanceQueryParams,
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

  const url = shouldFetch ? `/records/${id}/provenance` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getRecordsIdProvenanceQueryOptions<TData, TError>(
      id,
      params,
      clientOptions
    ),
    ...queryOptions,
  });

  return query;
}
