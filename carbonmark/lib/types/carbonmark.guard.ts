import { CATEGORY_INFO } from "lib/getCategoryInfo";
import { notNil } from "lib/utils/functional.utils";
import { CategoryName, Listing, TokenPrice } from "./carbonmark.types";

export function isTokenPrice(
  obj: TokenPrice | Listing | null
): obj is TokenPrice {
  return (
    notNil(obj) &&
    typeof obj === "object" &&
    "poolName" in obj &&
    "supply" in obj &&
    "poolAddress" in obj &&
    "projectTokenAddress" in obj &&
    "singleUnitPrice" in obj
  );
}

export const isCategoryName = (name?: string | null): name is CategoryName =>
  Object.keys(CATEGORY_INFO).includes(name?.trim() as CategoryName);
