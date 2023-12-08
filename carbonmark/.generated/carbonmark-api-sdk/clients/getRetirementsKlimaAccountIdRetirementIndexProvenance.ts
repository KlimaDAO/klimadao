import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams,
  GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryParams,
  GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryResponse,
} from "../types/GetRetirementsKlimaAccountIdRetirementIndexProvenance";

/**
 * @description Retrieve a retirement provenance records
 * @summary Retirement provenance records
 * @link /retirements/klima/:account_id/:retirement_index/provenance
 */
export async function getRetirementsKlimaAccountIdRetirementIndexProvenance<
  TData = GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryResponse,
>(
  accountId: GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams["account_id"],
  retirementIndex: GetRetirementsKlimaAccountIdRetirementIndexProvenancePathParams["retirement_index"],
  params?: GetRetirementsKlimaAccountIdRetirementIndexProvenanceQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/retirements/klima/${accountId}/${retirementIndex}/provenance`,
    params,
    ...options,
  });

  return resData;
}
