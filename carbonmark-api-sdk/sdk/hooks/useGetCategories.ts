import client from "@kubb/swagger-client/client";
import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import type { GetCategoriesQueryResponse } from "../models/GetCategories";

export function getCategoriesQueryOptions<
  TData = GetCategoriesQueryResponse,
  TError = unknown,
>(
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/categories`,

        ...options,
      });
    },
  };
}

/**
 * @description A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.
 * @summary Categories
 * @link /categories
 */

export function useGetCategories<
  TData = GetCategoriesQueryResponse,
  TError = unknown,
>(options?: {
  query?: SWRConfiguration<TData, TError>;
  client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
}): SWRResponse<TData, TError> {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};

  const query = useSWR<TData, TError, string>(`/categories`, {
    ...getCategoriesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  });

  return query;
}
