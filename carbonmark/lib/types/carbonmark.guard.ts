import { CATEGORY_INFO } from "lib/getCategoryInfo";
import { notNil } from "lib/utils/functional.utils";
import { CategoryName, TokenPrice } from "./carbonmark.types";

export function isTokenPrice(obj: unknown): obj is TokenPrice {
  return (
    notNil(obj) &&
    typeof obj === "object" &&
    "singleUnitPrice" in obj &&
    "totalSupply" in obj &&
    "totalRetired" in obj &&
    "totalBridged" in obj
  );
}

export const isCategoryName = (name?: string | null): name is CategoryName =>
  Object.keys(CATEGORY_INFO).includes(name as CategoryName);
