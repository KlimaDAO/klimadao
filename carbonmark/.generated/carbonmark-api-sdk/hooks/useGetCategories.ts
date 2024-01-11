import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type { GetCategoriesQueryResponse } from "../types/GetCategories";

type GetCategoriesClient = typeof client<
  GetCategoriesQueryResponse,
  never,
  never
>;
type GetCategories = {
  data: GetCategoriesQueryResponse;
  error: never;
  request: never;
  pathParams: never;
  queryParams: never;
  headerParams: never;
  response: GetCategoriesQueryResponse;
  client: {
    parameters: Partial<Parameters<GetCategoriesClient>[0]>;
    return: Awaited<ReturnType<GetCategoriesClient>>;
  };
};
export function getCategoriesQueryOptions<
  TData extends GetCategories["response"] = GetCategories["response"],
  TError = GetCategories["error"],
>(
  options: GetCategories["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/categories`,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.
 * @summary Categories
 * @link /categories */
export function useGetCategories<
  TData extends GetCategories["response"] = GetCategories["response"],
  TError = GetCategories["error"],
>(options?: {
  query?: SWRConfiguration<TData, TError>;
  client?: GetCategories["client"]["parameters"];
  shouldFetch?: boolean;
}): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/categories` as const;
  const query = useSWR<TData, TError, typeof url | null>(
    shouldFetch ? url : null,
    {
      ...getCategoriesQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
