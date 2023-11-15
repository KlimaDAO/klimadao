import client from "../client";
import type { GetCountriesQueryResponse } from "../models/GetCountries";

/**
 * @description Retrieve an array containing the countries that carbon projects originate from
 * @summary Countries
 * @link /countries
 */

export function getCountries<TData = GetCountriesQueryResponse>(
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData>({
    method: "get",
    url: `/countries`,

    ...options,
  });
}
