import type { ResponseConfig } from "../client";
import client from "../client";
import type { GetCategoriesQueryResponse } from "../types/GetCategories";

/**
 * @description A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.
 * @summary Categories
 * @link /categories
 */
export async function getCategories<TData = GetCategoriesQueryResponse>(
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<TData>["data"]> {
  const { data: resData } = await client<TData>({
    method: "get",
    url: `/categories`,
    ...options,
  });

  return resData;
}
