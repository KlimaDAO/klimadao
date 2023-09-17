import { t } from "@lingui/macro";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Text } from "components/Text";
import { CATEGORY_INFO } from "lib/getCategoryInfo";
import { Project } from "lib/types/carbonmark.types";
import { sortBy } from "lib/utils/array.utils";
import { IdentityFn } from "lib/utils/types.utils";
import * as styles from "./styles";

export const PROJECT_SORT_OPTIONS = {
  "price-highest": t`Price Highest`,
  "price-lowest": t`Price Lowest`,
  "recently-updated": t`Recently Updated`,
  "vintage-newest": t`Vintage Newest`,
  "vintage-oldest": t`Vintage Oldest`,
} as const;

const projectPriceSort = (a: Project, b: Project) =>
  Number(a.price) < Number(b.price) ? -1 : 1;

/** A Collection of sort functions keyed by sort option */
export const PROJECT_SORT_FNS: Record<string, IdentityFn<Project[]>> = {
  "price-highest": (projects: Project[]) =>
    projects.sort(projectPriceSort).reverse(),
  "price-lowest": (projects: Project[]) => projects.sort(projectPriceSort),
  "recently-updated": sortBy<Project>("updatedAt", "desc"),
  "vintage-newest": sortBy<Project>("vintage", "desc"),
  "vintage-oldest": sortBy<Project>("vintage"),
};

/** We need this function to find icons etc that are defined here and not returned by the API */
export const getCategoryFilters = () => {
  const allCategories = Object.values(CATEGORY_INFO);
  const projectFilters: Record<string, CheckboxOption[]> = {
    CATEGORIES: allCategories.map((category) => ({
      label: (
        <Text className={styles.option} t="body1">
          <category.icon />
          {category.label}
        </Text>
      ),
      value: category.key,
    })),
  };
  return projectFilters;
};
