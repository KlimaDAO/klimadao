import { t } from "@lingui/macro";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Text } from "components/Text";
import { BigNumber } from "ethers";
import { categoryNames, getCategoryInfo } from "lib/getCategoryInfo";
import { Project } from "lib/types/carbonmark";
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

/** Sort projects by big number price @todo extract as a generic BigNumber sort fn */
const projectPriceSort = (a: Project, b: Project) =>
  BigNumber.from(a.price).lt(BigNumber.from(b.price)) ? -1 : 1;

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
  const allCategories = categoryNames.map((name) => getCategoryInfo(name));
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
