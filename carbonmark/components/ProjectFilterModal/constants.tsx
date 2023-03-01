import { t } from "@lingui/macro";
import { CheckboxOption } from "components/CheckboxGroup/CheckboxGroup.types";
import { Text } from "components/Text";
import { categoryNames, getCategoryInfo } from "lib/getCategoryInfo";
import * as styles from "./styles";

export const PROJECT_SORT_OPTIONS = {
  "price-highest": t`Price Highest`,
  "price-lowest": t`Price Lowest`,
  "recently-updated": t`Recently Updated`,
  "vintage-newest": t`Vintage Newest`,
  "vintage-oldest": t`Vintage Oldest`,
} as const;

export const getProjectFilters = () => {
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
