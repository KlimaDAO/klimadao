import client from "../client";
import type {
  GetProjectsQueryParams,
  GetProjectsQueryResponse,
} from "../models/GetProjects";

/**
 * @description Retrieve an array of carbon projects filtered by desired query parameters
 * @summary List projects
 * @link /projects
 */

export function getProjects<TData = GetProjectsQueryResponse>(
  params?: GetProjectsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData>({
    method: "get",
    url: `/projects`,
    params,

    ...options,
  });
}
