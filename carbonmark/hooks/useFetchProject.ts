import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";
import { Project } from "../lib/types/carbonmark";

export const useFetchProject = (
  projectID: string,
  options?: SWRConfiguration
) => {
  console.log("API.PROHJECTS", urls.api.projects);
  const { data: project, ...rest } = useSWR<Project>(
    `${urls.api.projects}/${projectID}`,
    fetcher,
    options
  );

  return { project, ...rest };
};
