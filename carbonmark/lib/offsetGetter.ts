import { KlimaRetire } from "@klimadao/lib/types/subgraph";

// Leaves only unique elements from a comma separated list of entries
export const getOffsetCategories = (offset: KlimaRetire["offset"]) => {
  return Array.from(new Set(offset.methodologyCategory.split(", "))).join(", ");
};

/** Returns the first category from a list of offset categories. Note: necessary for Retirement PDF category heading **/
export const getOffsetMainCategory = (offset: KlimaRetire["offset"]) => {
  return offset.methodologyCategory.split(", ")[0];
};
