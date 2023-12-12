import { KlimaRetire } from "@klimadao/lib/types/subgraph";

// Leaves only unique elements from a comma separated list of entries
export const getOffsetCategories = (offset: KlimaRetire["offset"]) => {
  return Array.from(new Set(offset.methodologyCategory.split(", "))).join(", ");
};

// Leaves only unique elements from a comma separated list of entries
export const getOffsetMainCategory = (offset: KlimaRetire["offset"]) => {
  return offset.methodologyCategory.split(", ")[0];
};
