import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetProjectsIdActivityPathParams,
  GetProjectsIdActivityQueryParams,
  GetProjectsIdActivityQueryResponse,
} from "../types/GetProjectsIdActivity";

/**
 * @description Retrieve an array of activities related to a carbon project
 * @summary List project activities
 * @link /projects/:id/activity */
export async function getProjectsIdActivity(
  id: GetProjectsIdActivityPathParams["id"],
  params?: GetProjectsIdActivityQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetProjectsIdActivityQueryResponse>["data"]> {
  const res = await client<GetProjectsIdActivityQueryResponse>({
    method: "get",
    url: `/projects/${id}/activity`,
    params,
    ...options,
  });
  return res.data;
}
