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
 * @link /retirements/:id/provenance */
export async function getRetirementsIdProvenance(
  id: GetRetirementsIdProvenancePathParams["id"],
  params?: GetRetirementsIdProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetRetirementsIdProvenanceQueryResponse>["data"]> {
  const res = await client<GetRetirementsIdProvenanceQueryResponse>({
    method: "get",
    url: `/retirements/${id}/provenance`,
    params,
    ...options,
  });
  return res.data;
}
