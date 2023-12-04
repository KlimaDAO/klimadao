import { getProjects } from ".generated/carbonmark-api-sdk/clients";
import { useGetProjects } from ".generated/carbonmark-api-sdk/hooks";
import { Project } from ".generated/carbonmark-api-sdk/types";
import { PROJECT_SORT_FNS } from "components/ProjectFilterModal/constants";
import { isStringArray } from "lib/utils/types.utils";
import { get, identity, isEmpty, mapValues, omit } from "lodash";
import { pipe } from "lodash/fp";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";
import { defaultParams } from "./useProjectsFilterParams";
import { useQueryChanges } from "./useQueryChanges";

const joinArray = (value: string | string[]): string =>
  isStringArray(value) ? value.join(",") : value;

const emptyToUndefined = (value: string): string | undefined =>
  value === "" ? undefined : value;

export const getApiParams = (query: ParsedUrlQuery) => {
  return omit(
    mapValues(
      { ...defaultParams, ...query },
      pipe(joinArray, emptyToUndefined)
    ),
    ["layout", "sort"]
  );
};
export const sortProjects = (
  projects: Project[] | undefined,
  query: ParsedUrlQuery
) => {
  if (projects === undefined) return undefined;
  const sortFn =
    get(PROJECT_SORT_FNS, { ...defaultParams, ...query }.sort as string) ??
    identity;
  return sortFn(projects);
};
/**
 * A fetch project function that can be used server side
 * @param query
 * @returns
 */
export const fetchProjects = async (query: ParsedUrlQuery) => {
  const projects = await getProjects(getApiParams(query));
  return sortProjects(projects, query);
};

export type ProjectsProps = {
  projects: Array<Project>;
  isValidating: boolean;
  isLoading: boolean;
};

/**
 * Unfortunately the SWR hooks generated by Kubb do not include params or config in the URL provided to `useSWR`
 * This is a problem because SWR does not build it's request keys using the params by default as react-query does.
 * The end result being that changes to params provided to the hook does not trigger a new fetch.
 *
 * This wrapper is a stopgap solution until we shift to react-query or the Kubb swr package is updated (perhaps by us)
 *
 * @note we may need to do the same for other generated hooks
 */
export const useFetchProjects = () => {
  const router = useRouter();
  const changes = useQueryChanges();

  // Fetch projects only if the user has changed query parameters
  const projects = useGetProjects(getApiParams(router.query), {
    shouldFetch: changes > 0,
  });

  useEffect(() => {
    if (!isEmpty(router.query)) {
      projects.mutate();
    }
  }, [router.query, projects.mutate]);

  return { ...projects, data: sortProjects(projects.data, router.query) };
};
