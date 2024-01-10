import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetProjectsIdPathParams,
  GetProjectsIdQueryParams,
  GetProjectsIdQueryResponse,
} from "../types/GetProjectsId";

/**
 * @description Retrieve a carbon project by its project ID
 * @summary Project details
 * @link /projects/:id */
export async function getProjectsId(
  id: GetProjectsIdPathParams["id"],
  params?: GetProjectsIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetProjectsIdQueryResponse>["data"]> {
  const res = await client<GetProjectsIdQueryResponse>({
    method: "get",
    url: `/projects/${id}`,
    params,
    ...options,
  });
  return res.data;
}
