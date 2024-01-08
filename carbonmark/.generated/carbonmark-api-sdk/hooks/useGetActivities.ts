import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type {
  GetActivitiesQueryParams,
  GetActivitiesQueryResponse,
} from "../types/GetActivities";

type GetActivitiesClient = typeof client<
  GetActivitiesQueryResponse,
  never,
  never
>;
type GetActivities = {
  data: GetActivitiesQueryResponse;
  error: never;
  request: never;
  pathParams: never;
  queryParams: GetActivitiesQueryParams;
  headerParams: never;
  response: GetActivitiesQueryResponse;
  client: {
    parameters: Partial<Parameters<GetActivitiesClient>[0]>;
    return: Awaited<ReturnType<GetActivitiesClient>>;
  };
};
export function getActivitiesQueryOptions<
  TData extends GetActivities["response"] = GetActivities["response"],
  TError = GetActivities["error"],
>(
  params?: GetActivities["queryParams"],
  options: GetActivities["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/activities`,
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
 * @link /activities */
export function useGetActivities<
  TData extends GetActivities["response"] = GetActivities["response"],
  TError = GetActivities["error"],
>(
  params?: GetActivities["queryParams"],
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: GetActivities["client"]["parameters"];
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/activities` as const;
  const query = useSWR<TData, TError, [typeof url, typeof params] | null>(
    shouldFetch ? [url, params] : null,
    {
      ...getActivitiesQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
