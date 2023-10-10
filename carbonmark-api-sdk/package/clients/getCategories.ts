import client from "../client";
import type { GetCategoriesQueryResponse } from "../models/GetCategories";

/**
 * @description A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.
 * @summary Categories
 * @link /categories
 */

export function getCategories<TData = GetCategoriesQueryResponse>(
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<TData> {
  return client<TData>({
    method: "get",
    url: `/categories`,

    ...options,
  });
}
