import { t } from "@lingui/macro";
import { Dropdown } from "components/Dropdown";
import { PROJECT_SORT_OPTIONS } from "components/ProjectFilterModal/constants";
import {
  FilterValues,
  SortOption,
  useProjectsParams,
} from "hooks/useProjectsFilterParams";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as styles from "../styles";

export const ProjectSort = () => {
  const router = useRouter();
  const { defaultValues, sortValue, updateQueryParams } = useProjectsParams();

  const { control, setValue } = useForm<FilterValues>({ defaultValues });

  const sort = useWatch({ control, name: "sort" });

  useEffect(() => {
    if (!sortValue) return;
    setValue("sort", sortValue as SortOption);
  }, [sortValue]);

  useEffect(() => {
    if (!sort || !router.isReady) return;
    updateQueryParams({ ...router.query, sort });
  }, [sort]);
  return (
    <Dropdown
      key={sort}
      name="sort"
      initial={sort ?? "recently-updated"}
      className={styles.dropdown}
      aria-label={t`Toggle sort menu`}
      renderLabel={(selected) => `Sort: ${selected?.label}`}
      control={control}
      options={Object.entries(PROJECT_SORT_OPTIONS).map(([option, label]) => ({
        id: option,
        label: label,
        value: option,
      }))}
    />
  );
};
