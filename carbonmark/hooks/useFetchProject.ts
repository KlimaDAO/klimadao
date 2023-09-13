import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { DetailedProject } from "lib/types/carbonmark.types";
import type { SWRConfiguration } from "swr";
import useSWR from "swr";

export const useFetchProject = (
  projectID: string,
  options?: SWRConfiguration
) => {
  const { data: project, ...rest } = useSWR<DetailedProject>(
    `${urls.api.projects}/${projectID}`,
    fetcher,
    options
  );

  return { project, ...rest };
};
