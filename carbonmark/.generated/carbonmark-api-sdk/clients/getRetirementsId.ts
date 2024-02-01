import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetRetirementsIdPathParams,
  GetRetirementsIdQueryParams,
  GetRetirementsIdQueryResponse,
} from "../types/GetRetirementsId";

/**
 * @description Retrieve a klima retirement by account and retirement index
 * @summary Retirement
 * @link /retirements/:id */
export async function getRetirementsId(
  id: GetRetirementsIdPathParams["id"],
  params?: GetRetirementsIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetRetirementsIdQueryResponse>["data"]> {
  const res = await client<GetRetirementsIdQueryResponse>({
    method: "get",
    url: `/retirements/${id}`,
    params,
    ...options,
  });
  return res.data;
}
