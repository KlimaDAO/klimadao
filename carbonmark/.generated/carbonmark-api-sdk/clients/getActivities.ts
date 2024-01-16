import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetActivitiesQueryParams,
  GetActivitiesQueryResponse,
} from "../types/GetActivities";

/**
 * @description Retrieve an array of activities related to a carbon project
 * @summary List project activities
 * @link /activities */
export async function getActivities(
  params?: GetActivitiesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetActivitiesQueryResponse>["data"]> {
  const res = await client<GetActivitiesQueryResponse>({
    method: "get",
    url: `/activities`,
    params,
    ...options,
  });
  return res.data;
}
