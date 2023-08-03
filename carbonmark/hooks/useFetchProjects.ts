import { urls } from "lib/constants";
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
  const path = urls.api.projects + getProjectsQueryString(router.query);
  const { data, ...rest } = useSWR<Project[]>(path, fetcher, {
    revalidateOnMount: false,
  });
  /** Remove any null or undefined projects */
  const allProjects = data?.filter(negate(isNil)) ?? [];

  // group projects by key and vintage to find same projects with multiple prices
  const groupedProjects = allProjects.reduce<{ [key: string]: Project[] }>(
    (grouped, project) => {
      const key = `${project.key}-${project.vintage}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(project);
      return grouped;
    },
    {}
  );

  // find the lowest price project for each key and vintage
  const projects = Object.values(groupedProjects).map((projects) => {
    if (projects.length > 1) {
      return projects.reduce((lowest, project) => {
        if (project.price < lowest.price) {
          return project;
        }
        return lowest;
      });
    } else {
      return projects[0];
    }
  });

  return { projects, ...rest };
};
