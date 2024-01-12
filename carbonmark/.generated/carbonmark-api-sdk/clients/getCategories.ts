import type { ResponseConfig } from "../client";
import client from "../client";
import type { GetCategoriesQueryResponse } from "../types/GetCategories";

/**
 * @description A list of all methodology categories used to delineate every project in the marketplace. A project may belong to one or more of these categories.
 * @summary Categories
 * @link /categories */
export async function getCategories(
  options: Partial<Parameters<typeof client>[0]> = {}
): Promise<ResponseConfig<GetCategoriesQueryResponse>["data"]> {
  const res = await client<GetCategoriesQueryResponse>({
    method: "get",
    url: `/categories`,
    ...options,
  });
  return res.data;
}
