import client from "../client";
import type {
  GetPurchasesIdPathParams,
  GetPurchasesIdQueryParams,
  GetPurchasesIdQueryResponse,
} from "../models/GetPurchasesId";

/**
 * @description Retrieve the details of a purchase by its ID (transaction hash)
 * @summary Purchase details
 * @link /purchases/:id
 */

export function getPurchasesId<TData = GetPurchasesIdQueryResponse>(
  id: GetPurchasesIdPathParams["id"],
  params?: GetPurchasesIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData>({
    method: "get",
    url: `/purchases/${id}`,
    params,

    ...options,
  });
}
