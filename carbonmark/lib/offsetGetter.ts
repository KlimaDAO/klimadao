import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { getCategoryFromMethodology } from "./getCategoryFromMethodology";

// Leaves only unique elements from a comma separated list of entries
export const getOffsetCategories = (retire: KlimaRetire["retire"]) => {
  return Array.from(
    new Set(retire.credit.project.methodologies.split(", "))
  ).join(", ");
};

/** Returns the first category from a list of retire categories. Note: necessary for Retirement PDF category heading **/
export const getOffsetMainCategory = (retire: KlimaRetire["retire"]) => {
  return getCategoryFromMethodology(
    retire.credit.project.methodologies.split(", ")[0]
  );
};
