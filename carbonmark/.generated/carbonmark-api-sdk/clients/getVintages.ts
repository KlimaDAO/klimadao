import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetVintagesQueryParams,
  GetVintagesQueryResponse,
} from "../types/GetVintages";

/**
 * @description Retrieve an array of the vintages of available carbon projects
 * @summary Vintages
 * @link /vintages */
export async function getVintages(
  params?: GetVintagesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetVintagesQueryResponse>["data"]> {
  const res = await client<GetVintagesQueryResponse>({
    method: "get",
    url: `/vintages`,
    params,
    ...options,
  });
  return res.data;
}
