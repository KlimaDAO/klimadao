import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../../lib/api/client";
import type { GetCountriesQueryResponse } from "../types/GetCountries";

export function getCountriesQueryOptions<
  TData = GetCountriesQueryResponse,
  TError = unknown,
>(
  options: Partial<Parameters<typeof client>[0]> = {}
): SWRConfiguration<TData, TError> {
  return {
    fetcher: () => {
      return client<TData, TError>({
        method: "get",
        url: `/countries`,

        ...options,
      }).then((res) => res.data);
    },
  };
}

/**
 * @description Retrieve an array containing the countries that carbon projects originate from
 * @summary Countries
 * @link /countries
 */

export function useGetCountries<
  TData = GetCountriesQueryResponse,
  TError = unknown,
>(options?: {
  query?: SWRConfiguration<TData, TError>;
  client?: Partial<Parameters<typeof client<TData, TError>>[0]>;
  shouldFetch?: boolean;
}): SWRResponse<TData, TError> {
  const {
    query: queryOptions,
    client: clientOptions = {},
    shouldFetch = true,
  } = options ?? {};

  const url = shouldFetch ? `/countries` : null;
  const query = useSWR<TData, TError, string | null>(url, {
    ...getCountriesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  });

  return query;
}
