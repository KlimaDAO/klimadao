import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetPurchasesQueryParams,
  GetPurchasesQueryResponse,
} from "../types/GetPurchases";

/**
 * @description Retrieve a list of recent purchases
 * @summary Recent purchases
 * @link /purchases */
export async function getPurchases(
  params?: GetPurchasesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetPurchasesQueryResponse>["data"]> {
  const res = await client<GetPurchasesQueryResponse>({
    method: "get",
    url: `/purchases`,
    params,
    ...options,
  });
  return res.data;
}
