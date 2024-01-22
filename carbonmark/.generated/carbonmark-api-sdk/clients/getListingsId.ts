import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetListingsIdPathParams,
  GetListingsIdQueryParams,
  GetListingsIdQueryResponse,
} from "../types/GetListingsId";

/**
 * @description Get a listing by its identifier
 * @summary Listing
 * @link /listings/:id */
export async function getListingsId(
  id: GetListingsIdPathParams["id"],
  params?: GetListingsIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetListingsIdQueryResponse>["data"]> {
  const res = await client<GetListingsIdQueryResponse>({
    method: "get",
    url: `/listings/${id}`,
    params,
    ...options,
  });
  return res.data;
}
