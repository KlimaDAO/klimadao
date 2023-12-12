import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetActivitiesQueryParams,
  GetActivitiesQueryResponse,
} from "../types/GetActivities";

/**
 * @description Retrieve an array of activities related to a carbon project
 * @summary List project activities
 * @link /activities
 */
export async function getActivities<TData = GetActivitiesQueryResponse>(
  params?: GetActivitiesQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/activities`,
    params,
    ...options,
  });

  return resData;
}
