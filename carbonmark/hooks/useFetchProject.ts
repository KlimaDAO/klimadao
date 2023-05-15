import { fetcher } from "lib/fetcher";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import { Project } from "../lib/types/carbonmark";

export const useFetchProject = (
  projectID: string,
  options?: SWRConfiguration
) => {
  const { data: project, ...rest } = useSWR<Project>(
    `/api/projects/${projectID}`,
    fetcher,
    options
  );

  return { project, ...rest };
};
