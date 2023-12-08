import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetRetirementsKlimaAccountIdRetirementIndexPathParams,
  GetRetirementsKlimaAccountIdRetirementIndexQueryParams,
  GetRetirementsKlimaAccountIdRetirementIndexQueryResponse,
} from "../types/GetRetirementsKlimaAccountIdRetirementIndex";

/**
 * @description Retrieve a klima retirement by account and retirement index
 * @summary Retirement
 * @link /retirements/klima/:account_id/:retirement_index
 */
export async function getRetirementsKlimaAccountIdRetirementIndex<
  TData = GetRetirementsKlimaAccountIdRetirementIndexQueryResponse,
>(
  accountId: GetRetirementsKlimaAccountIdRetirementIndexPathParams["account_id"],
  retirementIndex: GetRetirementsKlimaAccountIdRetirementIndexPathParams["retirement_index"],
  params?: GetRetirementsKlimaAccountIdRetirementIndexQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/retirements/klima/${accountId}/${retirementIndex}`,
    params,
    ...options,
  });

  return resData;
}
