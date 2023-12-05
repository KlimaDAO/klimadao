import { PROJECT_SORT_OPTIONS } from "components/ProjectFilterModal/constants";
import { flatMap, omit } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type SortOption = keyof typeof PROJECT_SORT_OPTIONS;

export type FilterValues = {
  layout: "grid" | "list" | "map";
  sort: SortOption;
  country: string[];
  category: string[];
  vintage: string[];
};

export const defaultParams: FilterValues = {
  layout: "grid",
  sort: "recently-updated",
  country: [],
  category: [],
  vintage: [],
};

export const useProjectsParams = () => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    const filters = flatMap(omit(router.query, ["search", "sort", "layout"]));
    setFilterCount(filters.length);
  }, [router.query]);

  const updateQueryParams = (query: Partial<FilterValues>) => {
    router.replace({ query }, undefined, { shallow: true });
  };

  const resetQueryParams = () => {
    const { layout } = router.query;
    router.replace({ query: { ...defaultParams, layout } }, undefined, {
      shallow: true,
    });
  };

  return {
    filterCount,
    resetQueryParams,
    updateQueryParams,
    params: { ...defaultParams, ...router.query },
  };
};
