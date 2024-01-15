import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetPurchasesQueryParams,
  GetPurchasesQueryResponse,
} from "../types/GetPurchases";

/**
 * @description Retrieve a list of recent purchases
 * @summary Recent purchases
 * @link /purchases
 */
export async function getPurchases<TData = GetPurchasesQueryResponse>(
  params?: GetPurchasesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/purchases`,
    params,
    ...options,
  });

  return resData;
}
