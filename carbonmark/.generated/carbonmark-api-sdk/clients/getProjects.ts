import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetProjectsQueryParams,
  GetProjectsQueryResponse,
} from "../types/GetProjects";

/**
 * @description Retrieve an array of carbon projects filtered by desired query parameters
 * @summary List projects
 * @link /projects
 */
export async function getProjects<TData = GetProjectsQueryResponse>(
  params?: GetProjectsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>> {
  return client<TData>({
    method: "get",
    url: `/projects`,
    params,
    ...options,
  });
}
