import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetPurchasesIdPathParams,
  GetPurchasesIdQueryParams,
  GetPurchasesIdQueryResponse,
} from "../types/GetPurchasesId";

/**
 * @description Retrieve the details of a purchase by its ID (transaction hash)
 * @summary Purchase details
 * @link /purchases/:id
 */
export async function getPurchasesId<TData = GetPurchasesIdQueryResponse>(
  id: GetPurchasesIdPathParams["id"],
  params?: GetPurchasesIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/purchases/${id}`,
    params,
    ...options,
  });

  return resData;
}
