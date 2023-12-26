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
 * @link /listings/:id
 */
export async function getListingsId<TData = GetListingsIdQueryResponse>(
  id: GetListingsIdPathParams["id"],
  params?: GetListingsIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/listings/${id}`,
    params,
    ...options,
  });

  return resData;
}
