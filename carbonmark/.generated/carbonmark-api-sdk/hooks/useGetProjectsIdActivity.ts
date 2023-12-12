import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetProjectsIdActivityPathParams,
  GetProjectsIdActivityQueryParams,
  GetProjectsIdActivityQueryResponse,
} from "../types/GetProjectsIdActivity";

export function getProjectsIdActivityQueryOptions<
  TData = GetProjectsIdActivityQueryResponse,
  TError = unknown,
>(
  id: GetProjectsIdActivityPathParams["id"],
  params?: GetProjectsIdActivityQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/projects/${id}/activity`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve an array of activities related to a carbon project
 * @summary List project activities
 * @link /projects/:id/activity
 */

export function useGetProjectsIdActivity<
  TData = GetProjectsIdActivityQueryResponse,
  TError = unknown,
>(
  id: GetProjectsIdActivityPathParams["id"],
  params?: GetProjectsIdActivityQueryParams,
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

  const url = shouldFetch ? `/projects/${id}/activity` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getProjectsIdActivityQueryOptions<TData, TError>(
      id,
      params,
      clientOptions
    ),
    ...queryOptions,
  });

  return query;
}
