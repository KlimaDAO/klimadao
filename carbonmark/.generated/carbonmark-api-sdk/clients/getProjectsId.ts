import client from "../client";
import type {
  GetProjectsIdPathParams,
  GetProjectsIdQueryParams,
  GetProjectsIdQueryResponse,
} from "../models/GetProjectsId";

/**
 * @description Retrieve a carbon project by its project ID
 * @summary Project details
 * @link /projects/:id
 */

export function getProjectsId<TData = GetProjectsIdQueryResponse>(
  id: GetProjectsIdPathParams["id"],
  params?: GetProjectsIdQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData>({
    method: "get",
    url: `/projects/${id}`,
    params,

    ...options,
  });
}
