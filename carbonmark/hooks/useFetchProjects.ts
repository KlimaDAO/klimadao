import { getProjects } from ".generated/carbonmark-api-sdk/clients";
import { Project } from ".generated/carbonmark-api-sdk/types";
import { PROJECT_SORT_FNS } from "components/ProjectFilterModal/constants";
import { isStringArray } from "lib/utils/types.utils";
import { get, identity, mapValues, omit } from "lodash";
import { pipe } from "lodash/fp";
import { ParsedUrlQuery } from "querystring";

const joinArray = (value: string | string[]): string =>
  isStringArray(value) ? value.join(",") : value;

const emptyToUndefined = (value: string): string | undefined =>
  value === "" ? undefined : value;

export const fetchProjects = async (query: ParsedUrlQuery) => {
  const mappedParams = mapValues(query, pipe(joinArray, emptyToUndefined));

  const projects = await getProjects(omit(mappedParams, ["layout", "sort"]));

  const sortFn = get(PROJECT_SORT_FNS, query.sort as string) ?? identity;
  return sortFn(projects);
};

export type ProjectsProps = {
  projects: Array<Project>;
};
