import { compact, isArray } from "lodash";
import { sortBy as _sortBy, pipe, reverse } from "lodash/fp";

/** sortBy but reverse */
const reverseSortBy = <T>(key: keyof T) => pipe(_sortBy<T>(key), reverse);

/** sortBy with an order argument, by default an ascending sort */
export const sortBy = <T>(
  key: keyof T,
  order: "asc" | "desc" = "asc"
): ((arr: T[]) => T[]) => (order === "asc" ? _sortBy(key) : reverseSortBy(key));

/** Remove nullish values from arrays if they are an array or return the arg if not */
export const clean = (x: unknown) => (isArray(x) ? compact(x) : x);

export const ArrayUtils = {
  sortBy,
  clean,
  reverseSortBy,
};
