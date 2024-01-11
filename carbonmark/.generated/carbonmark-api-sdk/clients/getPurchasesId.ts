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
 * @link /purchases/:id */
export async function getPurchasesId(
  id: GetPurchasesIdPathParams["id"],
  params?: GetPurchasesIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetPurchasesIdQueryResponse>["data"]> {
  const res = await client<GetPurchasesIdQueryResponse>({
    method: "get",
    url: `/purchases/${id}`,
    params,
    ...options,
  });
  return res.data;
}
