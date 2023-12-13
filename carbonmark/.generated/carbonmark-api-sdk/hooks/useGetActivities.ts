import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetActivitiesQueryParams,
  GetActivitiesQueryResponse,
} from "../types/GetActivities";

export function getActivitiesQueryOptions<
  TData = GetActivitiesQueryResponse,
  TError = unknown,
>(
  params?: GetActivitiesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/activities`,

        params,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve an array of activities related to a carbon project
 * @summary List project activities
 * @link /activities
 */

export function useGetActivities<
  TData = GetActivitiesQueryResponse,
  TError = unknown,
>(
  params?: GetActivitiesQueryParams,
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

  const url = shouldFetch ? `/activities` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getActivitiesQueryOptions<TData, TError>(params, clientOptions),
    ...queryOptions,
  });

  return query;
}
