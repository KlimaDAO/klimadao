import client from "../client";
import type { GetVintagesQueryResponse } from "../models/GetVintages";

/**
 * @description Retrieve an array of the vintages of available carbon projects
 * @summary Vintages
 * @link /vintages
 */

export function getVintages<TData = GetVintagesQueryResponse>(
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData>({
    method: "get",
    url: `/vintages`,

    ...options,
  });
}
