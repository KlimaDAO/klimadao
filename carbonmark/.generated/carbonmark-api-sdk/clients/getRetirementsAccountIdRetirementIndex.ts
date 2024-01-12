import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetRetirementsAccountIdRetirementIndexPathParams,
  GetRetirementsAccountIdRetirementIndexQueryParams,
  GetRetirementsAccountIdRetirementIndexQueryResponse,
} from "../types/GetRetirementsAccountIdRetirementIndex";

/**
 * @description Retrieve a klima retirement by account and retirement index
 * @summary Retirement
 * @link /retirements/:account_id/:retirement_index */
export async function getRetirementsAccountIdRetirementIndex(
  accountId: GetRetirementsAccountIdRetirementIndexPathParams["account_id"],
  retirementIndex: GetRetirementsAccountIdRetirementIndexPathParams["retirement_index"],
  params?: GetRetirementsAccountIdRetirementIndexQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<
  ResponseConfig<GetRetirementsAccountIdRetirementIndexQueryResponse>["data"]
> {
  const res = await client<GetRetirementsAccountIdRetirementIndexQueryResponse>(
    {
      method: "get",
      url: `/retirements/${accountId}/${retirementIndex}`,
      params,
      ...options,
    }
  );
  return res.data;
}
