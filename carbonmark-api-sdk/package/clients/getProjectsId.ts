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
 * @link /projects/:id
 */
export async function getProjectsId<TData = GetProjectsIdQueryResponse>(
  id: GetProjectsIdPathParams["id"],
  params?: GetProjectsIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/projects/${id}`,
    params,
    ...options,
  });

  return resData;
}
