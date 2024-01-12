import type { ResponseConfig } from "../client";
import client from "../client";
import type { GetCountriesQueryResponse } from "../types/GetCountries";

/**
 * @description Retrieve an array containing the countries that carbon projects originate from
 * @summary Countries
 * @link /countries */
export async function getCountries(
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetCountriesQueryResponse>["data"]> {
  const res = await client<GetCountriesQueryResponse>({
    method: "get",
    url: `/countries`,
    ...options,
  });
  return res.data;
}
