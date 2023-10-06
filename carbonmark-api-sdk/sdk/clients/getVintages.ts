import client from "../client";
import type {
  GetVintagesQueryParams,
  GetVintagesQueryResponse,
} from "../models/GetVintages";

/**
 * @description Retrieve an array of the vintages of available carbon projects
 * @summary Vintages
 * @link /vintages
 */

export function getVintages<TData = GetVintagesQueryResponse>(
  params?: GetVintagesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData>({
    method: "get",
    url: `/vintages`,
    params,

    ...options,
  });
}
