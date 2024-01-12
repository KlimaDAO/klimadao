import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetProjectsIdPathParams,
  GetProjectsIdQueryParams,
  GetProjectsIdQueryResponse,
} from "../types/GetProjectsId";

type GetProjectsIdClient = typeof client<
  GetProjectsIdQueryResponse,
  never,
  never
>;
type GetProjectsId = {
  data: GetProjectsIdQueryResponse;
  error: never;
  request: never;
  pathParams: GetProjectsIdPathParams;
  queryParams: GetProjectsIdQueryParams;
  headerParams: never;
  response: GetProjectsIdQueryResponse;
  client: {
    parameters: Partial<Parameters<GetProjectsIdClient>[0]>;
    return: Awaited<ReturnType<GetProjectsIdClient>>;
  };
};
export function getProjectsIdQueryOptions<
  TData extends GetProjectsId["response"] = GetProjectsId["response"],
  TError = GetProjectsId["error"],
>(
  id: GetProjectsIdPathParams["id"],
  params?: GetProjectsId["queryParams"],
  options: GetProjectsId["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/projects/${id}`,
        params,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve a carbon project by its project ID
 * @summary Project details
 * @link /projects/:id */
export function useGetProjectsId<
  TData extends GetProjectsId["response"] = GetProjectsId["response"],
  TError = GetProjectsId["error"],
>(
  id: GetProjectsIdPathParams["id"],
  params?: GetProjectsId["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetProjectsId["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/projects/${id}` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getProjectsIdQueryOptions<TData, TError>(id, params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
