import client from "@kubb/swagger-client/client";
import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import type {
  GetProjectsQueryParams,
  GetProjectsQueryResponse,
} from "../models/GetProjects";

export function getProjectsQueryOptions<
  TData = GetProjectsQueryResponse,
  TError = unknown,
>(
  params?: GetProjectsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/projects`,

        params,

        ...options,
      });
    },
  };
}

/**
 * @description Retrieve an array of carbon projects filtered by desired query parameters
 * @summary List projects
 * @link /projects
 */

export function useGetProjects<
  TData = GetProjectsQueryResponse,
  TError = unknown,
>(
  params?: GetProjectsQueryParams,
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  }
): SWRResponse<TData, TError> {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};

  const query = useSWR<TData, TError, string>(`/projects`, {
    ...getProjectsQueryOptions<TData, TError>(params, clientOptions),
    ...queryOptions,
  });

  return query;
}
