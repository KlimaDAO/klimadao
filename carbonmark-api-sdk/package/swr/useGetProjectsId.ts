import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../client";
import type {
  GetProjectsIdPathParams,
  GetProjectsIdQueryParams,
  GetProjectsIdQueryResponse,
} from "../types/GetProjectsId";

export function getProjectsIdQueryOptions<
  TData = GetProjectsIdQueryResponse,
  TError = unknown,
>(
  id: GetProjectsIdPathParams["id"],
  params?: GetProjectsIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/projects/${id}`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve a carbon project by its project ID
 * @summary Project details
 * @link /projects/:id
 */

export function useGetProjectsId<
  TData = GetProjectsIdQueryResponse,
  TError = unknown,
>(
  id: GetProjectsIdPathParams["id"],
  params?: GetProjectsIdQueryParams,
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

  const url = shouldFetch ? `/projects/${id}` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getProjectsIdQueryOptions<TData, TError>(id, params, clientOptions),
    ...queryOptions,
  });

  return query;
}
