import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetProjectsIdActivityPathParams,
  GetProjectsIdActivityQueryParams,
  GetProjectsIdActivityQueryResponse,
} from "../types/GetProjectsIdActivity";

type GetProjectsIdActivityClient = typeof client<
  GetProjectsIdActivityQueryResponse,
  never,
  never
>;
type GetProjectsIdActivity = {
  data: GetProjectsIdActivityQueryResponse;
  error: never;
  request: never;
  pathParams: GetProjectsIdActivityPathParams;
  queryParams: GetProjectsIdActivityQueryParams;
  headerParams: never;
  response: GetProjectsIdActivityQueryResponse;
  client: {
    parameters: Partial<Parameters<GetProjectsIdActivityClient>[0]>;
    return: Awaited<ReturnType<GetProjectsIdActivityClient>>;
  };
};
export function getProjectsIdActivityQueryOptions<
  TData extends
    GetProjectsIdActivity["response"] = GetProjectsIdActivity["response"],
  TError = GetProjectsIdActivity["error"],
>(
  id: GetProjectsIdActivityPathParams["id"],
  params?: GetProjectsIdActivity["queryParams"],
  options: GetProjectsIdActivity["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/projects/${id}/activity`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve an array of activities related to a carbon project
 * @summary List project activities
 * @link /projects/:id/activity */
export function useGetProjectsIdActivity<
  TData extends
    GetProjectsIdActivity["response"] = GetProjectsIdActivity["response"],
  TError = GetProjectsIdActivity["error"],
>(
  id: GetProjectsIdActivityPathParams["id"],
  params?: GetProjectsIdActivity["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetProjectsIdActivity["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/projects/${id}/activity` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getProjectsIdActivityQueryOptions<TData, TError>(
        id,
        params,
        clientOptions
      ),
      ...queryOptions,
    }
  );
  return query;
}
