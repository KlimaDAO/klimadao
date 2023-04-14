import { fetcher } from "lib/fetcher";
import { getProjectsQueryString } from "lib/getProjectsQueryString";
import { isNil } from "lodash";
import { negate } from "lodash/fp";
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
  /** Remove any null or undefined projects */
  const projects = data?.filter(negate(isNil)) ?? [];
  return { projects, ...rest };
};
