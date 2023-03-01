const PROJECT_QUERY_PARAMS = ["search", "country", "vintage"] as const;
type ProjectsParam = (typeof PROJECT_QUERY_PARAMS)[number];

/**
 * Convert an unknown query object into a valid query for /api/project endpoint.
 * Ignores empty queries.
 * Returns empty string if no valid params exist.
 * @example
 * getProjectQueryString({ search: "123", unsupportedParam: "456" }) // "?search=123"
 * getProjectQueryString({ search: "", unsupportedParam: ["456", "789"] }) // ""
 */
export const getProjectsQueryString = (
  query: Partial<{
    [key: string]: string | string[];
  }>
): string => {
  const paramValues: [ProjectsParam, string][] = [];
  for (const p of PROJECT_QUERY_PARAMS) {
    const paramValue = query[p];
    if (typeof paramValue === "string" && paramValue) {
      paramValues.push([p, paramValue]);
    }
  }
  return paramValues.length ? `?${new URLSearchParams(paramValues)}` : "";
};
