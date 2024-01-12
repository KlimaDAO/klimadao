import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetRetirementsAccountIdRetirementIndexProvenancePathParams,
  GetRetirementsAccountIdRetirementIndexProvenanceQueryParams,
  GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse,
} from "../types/GetRetirementsAccountIdRetirementIndexProvenance";

/**
 * @description Retrieve a retirement provenance records
 * @summary Retirement provenance records
 * @link /retirements/:account_id/:retirement_index/provenance */
export async function getRetirementsAccountIdRetirementIndexProvenance(
  accountId: GetRetirementsAccountIdRetirementIndexProvenancePathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexProvenancePathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndexProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<
  ResponseConfig<GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse>["data"]
> {
  const res =
    await client<GetRetirementsAccountIdRetirementIndexProvenanceQueryResponse>(
      {
        method: "get",
        url: `/retirements/${accountId}/${retirementIndex}/provenance`,
        params,
        ...options,
      }
    );
  return res.data;
}
