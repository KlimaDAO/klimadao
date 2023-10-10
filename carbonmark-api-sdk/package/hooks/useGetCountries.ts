import type { SWRConfiguration, SWRResponse } from "swr";
import useSWR from "swr";
import client from "../../client";
import type { GetCountriesQueryResponse } from "../models/GetCountries";

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
      });
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
}): SWRResponse<TData, TError> {
  const { query: queryOptions, client: clientOptions = {} } = options ?? {};

  const query = useSWR<TData, TError, string>(`/countries`, {
    ...getCountriesQueryOptions<TData, TError>(clientOptions),
    ...queryOptions,
  });

  return query;
}
