import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetProjectsQueryParams,
  GetProjectsQueryResponse,
} from "../types/GetProjects";

type GetProjectsClient = typeof client<GetProjectsQueryResponse, never, never>;
type GetProjects = {
  data: GetProjectsQueryResponse;
  error: never;
  request: never;
  pathParams: never;
  queryParams: GetProjectsQueryParams;
  headerParams: never;
  response: GetProjectsQueryResponse;
  client: {
    parameters: Partial<Parameters<GetProjectsClient>[0]>;
    return: Awaited<ReturnType<GetProjectsClient>>;
  };
};
export function getProjectsQueryOptions<
  TData extends GetProjects["response"] = GetProjects["response"],
  TError = GetProjects["error"],
>(
  params?: GetProjects["queryParams"],
  options: GetProjects["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/projects`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve an array of carbon projects filtered by desired query parameters
 * @summary List projects
 * @link /projects */
export function useGetProjects<
  TData extends GetProjects["response"] = GetProjects["response"],
  TError = GetProjects["error"],
>(
  params?: GetProjects["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetProjects["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/projects` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getProjectsQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
