import { isStringArray } from "lib/utils/types.utils";
import { mapValues } from "lodash";
import { pipe } from "lodash/fp";
import { useRouter } from "next/router";
import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type {
  GetProjectsQueryParams,
  GetProjectsQueryResponse,
} from "../types/GetProjects";

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
      }).then((res) => res.data);
    },
  };
}

const joinArray = (value: string | string[]): string =>
  isStringArray(value) ? value.join(",") : value;

const emptyToUndefined = (value: string): string | undefined =>
  value === "" ? undefined : value;

/**
 * @description Retrieve an array of carbon projects filtered by desired query parameters
 * @summary List projects
 * @link /projects
 */

export function useGetProjects<
  TData = GetProjectsQueryResponse,
  TError = unknown,
>(
  options?: {
    query?: SWRConfiguration<TData, TError>;
    client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
    shouldFetch?: boolean;
  }
): SWRResponse<TData, TError> {
  const router = useRouter();
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};

  /** convert all string arrays to comma separated string as per the api's expectation */
  const mappedParams = mapValues(router.query, pipe(joinArray, emptyToUndefined));

  const url = shouldFetch ? `/projects` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getProjectsQueryOptions<TData, TError>(mappedParams, clientOptions),
    ...queryOptions,
  });
  return query;
}
