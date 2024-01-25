import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetRetirementsQueryParams,
  GetRetirementsQueryResponse,
} from "../types/GetRetirements";

/**
 * @description Retrieve an array of retirement filtered by desired query parameters
 * @summary Retirement
 * @link /retirements */
export async function getRetirements(
  params?: GetRetirementsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetRetirementsQueryResponse>["data"]> {
  const res = await client<GetRetirementsQueryResponse>({
    method: "get",
    url: `/retirements`,
    params,
    ...options,
  });
  return res.data;
}
