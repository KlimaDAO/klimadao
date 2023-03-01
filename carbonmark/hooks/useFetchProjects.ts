import { fetcher } from "lib/fetcher";
import { getProjectsQueryString } from "lib/getProjectsQueryString";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Project } from "../lib/types/carbonmark";

/** SWR hook that listens to the router for query param changes */
export const useFetchProjects = () => {
  const router = useRouter();
  const path = `/api/projects` + getProjectsQueryString(router.query);
  const { data, ...rest } = useSWR<Project[]>(path, fetcher, {
    revalidateOnMount: false,
  });
  return { projects: data, ...rest };
};
