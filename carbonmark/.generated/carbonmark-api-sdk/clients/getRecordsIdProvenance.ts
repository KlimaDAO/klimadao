import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetRecordsIdProvenancePathParams,
  GetRecordsIdProvenanceQueryParams,
  GetRecordsIdProvenanceQueryResponse,
} from "../types/GetRecordsIdProvenance";

/**
 * @description Retrieve a record and its history by its transaction ID
 * @summary Record details
 * @link /records/:id/provenance
 */
export async function getRecordsIdProvenance<
  TData = GetRecordsIdProvenanceQueryResponse,
>(
  id: GetRecordsIdProvenancePathParams["id"],
  params?: GetRecordsIdProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/records/${id}/provenance`,
    params,
    ...options,
  });

  return resData;
}
