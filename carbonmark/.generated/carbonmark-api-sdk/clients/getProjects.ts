import type { ResponseConfig } from "../client";
import client from "../client";
import type {
  GetProjectsQueryParams,
  GetProjectsQueryResponse,
} from "../types/GetProjects";

/**
 * @description Retrieve an array of carbon projects filtered by desired query parameters
 * @summary List projects
 * @link /projects */
export async function getProjects(
  params?: GetProjectsQueryParams,
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetProjectsQueryResponse>["data"]> {
  const res = await client<GetProjectsQueryResponse>({
    method: "get",
    url: `/projects`,
    params,
    ...options,
  });
  return res.data;
}
