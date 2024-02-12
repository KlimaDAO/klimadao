import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetRetirementsIdProvenancePathParams,
  GetRetirementsIdProvenanceQueryParams,
  GetRetirementsIdProvenanceQueryResponse,
} from "../types/GetRetirementsIdProvenance";

type GetRetirementsIdProvenanceClient = typeof client<
  GetRetirementsIdProvenanceQueryResponse,
  never,
  never
>;
type GetRetirementsIdProvenance = {
  data: GetRetirementsIdProvenanceQueryResponse;
  error: never;
  request: never;
  pathParams: GetRetirementsIdProvenancePathParams;
  queryParams: GetRetirementsIdProvenanceQueryParams;
  headerParams: never;
  response: GetRetirementsIdProvenanceQueryResponse;
  client: {
    parameters: Partial<Parameters<GetRetirementsIdProvenanceClient>[0]>;
    return: Awaited<ReturnType<GetRetirementsIdProvenanceClient>>;
  };
};
export function getRetirementsIdProvenanceQueryOptions<
  TData extends
    GetRetirementsIdProvenance["response"] = GetRetirementsIdProvenance["response"],
  TError = GetRetirementsIdProvenance["error"],
>(
  id: GetRetirementsIdProvenancePathParams["id"],
  params?: GetRetirementsIdProvenance["queryParams"],
  options: GetRetirementsIdProvenance["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/retirements/${id}/provenance`,
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
 * @link /retirements/:id/provenance */
export function useGetRetirementsIdProvenance<
  TData extends
    GetRetirementsIdProvenance["response"] = GetRetirementsIdProvenance["response"],
  TError = GetRetirementsIdProvenance["error"],
>(
  id: GetRetirementsIdProvenancePathParams["id"],
  params?: GetRetirementsIdProvenance["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetRetirementsIdProvenance["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/retirements/${id}/provenance` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getRetirementsIdProvenanceQueryOptions<TData, TError>(
        id,
        params,
        clientOptions
      ),
      ...queryOptions,
    }
  );
  return query;
}
