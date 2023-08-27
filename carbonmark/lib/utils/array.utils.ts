import { pipe, reverse, sortBy as _sortBy } from "lodash/fp";

/** sortBy but reverse */
const reverseSortBy = <T>(key: keyof T) => pipe(_sortBy<T>(key), reverse);

/** sortBy with an order argument, by default an ascending sort */
export const sortBy = <T>(
  key: keyof T,
  order: "asc" | "desc" = "asc"
): ((arr: T[]) => T[]) => (order === "asc" ? _sortBy(key) : reverseSortBy(key));
