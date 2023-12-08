import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetRetirementsIdProvenancePathParams,
  GetRetirementsIdProvenanceQueryParams,
  GetRetirementsIdProvenanceQueryResponse,
} from "../types/GetRetirementsIdProvenance";

/**
 * @description Retrieve a retirement provenance records
 * @summary Retirement provenance records
 * @link /retirements/:id/provenance
 */
export async function getRetirementsIdProvenance<
  TData = GetRetirementsIdProvenanceQueryResponse,
>(
  id: GetRetirementsIdProvenancePathParams["id"],
  params?: GetRetirementsIdProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/retirements/${id}/provenance`,
    params,
    ...options,
  });

  return resData;
}
