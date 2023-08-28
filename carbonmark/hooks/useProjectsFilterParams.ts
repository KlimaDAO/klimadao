import { PROJECT_SORT_OPTIONS } from "components/ProjectFilterModal/constants";
import { flatMap, omit } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type SortOption = keyof typeof PROJECT_SORT_OPTIONS;

export type FilterValues = {
  layout: "grid" | "list";
  sort: SortOption;
  country: string[];
  category: string[];
  vintage: string[];
};

export const defaultFilterProps: FilterValues = {
  layout: "grid",
  sort: "recently-updated",
  country: [],
  category: [],
  vintage: [],
};

export const useProjectsFilterParams = () => {
  const router = useRouter();
  const [sortValue, setSortValue] = useState("");
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    const filters = flatMap(omit(router.query, ["search", "sort", "layout"]));
    setFilterCount(filters.length);
  }, [router.query]);

  useEffect(() => {
    setSortValue((router.query.sort as SortOption) ?? "recently-updated");
  }, [router.query]);

  const updateQueryParams = (query: Partial<FilterValues>) => {
    router.replace({ query }, undefined, { shallow: true });
  };

  const resetQueryParams = () => {
    router.replace({ query: defaultFilterProps }, undefined, { shallow: true });
  };

  return {
    sortValue,
    filterCount,
    resetQueryParams,
    updateQueryParams,
    defaultValues: { ...defaultFilterProps, ...router.query },
  };
};
