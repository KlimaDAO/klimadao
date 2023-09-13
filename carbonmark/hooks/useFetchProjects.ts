import { urls } from "lib/constants";
import { fetcher } from "lib/fetcher";
import { getProjectsQueryString } from "lib/getProjectsQueryString";
import { Project } from "lib/types/carbonmark.types";
import { isNil } from "lodash";
import { negate } from "lodash/fp";
import { useRouter } from "next/router";
import useSWR from "swr";

/** SWR hook that listens to the router for query param changes */
export const useFetchProjects = () => {
  const router = useRouter();
  const path = urls.api.projects + getProjectsQueryString(router.query);
  const { data, ...rest } = useSWR<Project[]>(path, fetcher, {
    revalidateOnMount: false,
  });
  /** Remove any null or undefined projects */
  const projects = data?.filter(negate(isNil)) ?? [];
  return { projects, ...rest };
};
