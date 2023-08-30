import { t } from "@lingui/macro";
import { Dropdown } from "components/Dropdown";
import { PROJECT_SORT_OPTIONS } from "components/ProjectFilterModal/constants";
import { SortOption, useProjectsParams } from "hooks/useProjectsFilterParams";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as styles from "../styles";

export const ProjectSort = () => {
  const { params, updateQueryParams } = useProjectsParams();

  const { control } = useForm<{ sort: SortOption }>({
    defaultValues: { sort: params.sort },
  });

  const sort = useWatch({ control, name: "sort" });

  useEffect(() => {
    if (!sort) return;
    updateQueryParams({ ...params, sort });
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
