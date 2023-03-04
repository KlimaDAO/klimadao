import { isString } from "lodash";
import { isStringArray } from "./utils/types.utils";

const PROJECT_QUERY_PARAMS = [
  "search",
  "category",
  "country",
  "vintage",
] as const;
type ProjectsParam = (typeof PROJECT_QUERY_PARAMS)[number];

/**
 * Convert an unknown query object into a valid query for /api/project endpoint.
 * Ignores empty queries.
 * Returns empty string if no valid params exist.
 * @example
 * getProjectQueryString({ search: "123", unsupportedParam: "456" }) // "?search=123"
 * getProjectQueryString({ search: "", unsupportedParam: ["456", "789"] }) // ""
 */
export const getProjectsQueryString = (query: {
  [key: string]: string | string[] | undefined;
}): string => {
  const paramValues: [ProjectsParam, string][] = [];
  for (const p of PROJECT_QUERY_PARAMS) {
    const val = query[p];
    //Concat string arrays into "str,str.."
    const paramValue = isStringArray(val) ? val.join(",") : val;
    if (isString(paramValue)) {
      paramValues.push([p, paramValue]);
    }
  }
  return paramValues.length ? `?${new URLSearchParams(paramValues)}` : "";
};
