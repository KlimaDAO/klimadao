import type { ResponseConfig } from "../client";
import client from "../client";
import type { GetCountriesQueryResponse } from "../types/GetCountries";

/**
 * @description Retrieve an array containing the countries that carbon projects originate from
 * @summary Countries
 * @link /countries
 */
export async function getCountries<TData = GetCountriesQueryResponse>(
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/countries`,
    ...options,
  });

  return resData;
}
