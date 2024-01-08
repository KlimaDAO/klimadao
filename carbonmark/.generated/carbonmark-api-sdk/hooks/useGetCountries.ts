import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../client";
import type { GetCountriesQueryResponse } from "../types/GetCountries";

type GetCountriesClient = typeof client<
  GetCountriesQueryResponse,
  never,
  never
>;
type GetCountries = {
  data: GetCountriesQueryResponse;
  error: never;
  request: never;
  pathParams: never;
  queryParams: never;
  headerParams: never;
  response: GetCountriesQueryResponse;
  client: {
    parameters: Partial<Parameters<GetCountriesClient>[0]>;
    return: Awaited<ReturnType<GetCountriesClient>>;
  };
};
export function getCountriesQueryOptions<
  TData extends GetCountries["response"] = GetCountries["response"],
  TError = GetCountries["error"],
>(
  options: GetCountries["client"]["parameters"] = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: async () => {
      const res = await client<TData, TError>({
        method: "get",
        url: `/countries`,
        ...options,
      });
      return res.data;
    },
  };
}
/**
 * @description Retrieve an array containing the countries that carbon projects originate from
 * @summary Countries
 * @link /countries */
export function useGetCountries<
  TData extends GetCountries["response"] = GetCountries["response"],
  TError = GetCountries["error"],
>(options?: {
  query?: SWRConfiguration<TData, TError>;
  client?: GetCountries["client"]["parameters"];
  shouldFetch?: boolean;
}): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};
  const url = `/countries` as const;
  const query = useSWR<TData, TError, typeof url | null>(
    shouldFetch ? url : null,
    {
      ...getCountriesQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
    }
  );
  return query;
}
