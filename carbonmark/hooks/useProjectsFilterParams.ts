import { PROJECT_SORT_OPTIONS } from "components/ProjectFilterModal/constants";
import { useRouter } from "next/router";
import { useEffect } from "react";

export type SortOption = keyof typeof PROJECT_SORT_OPTIONS;

export type FilterValues = {
  sort: SortOption;
  country: string[];
  category: string[];
  vintage: string[];
};

export const defaultFilterProps: FilterValues = {
  sort: "recently-updated",
  country: [],
  category: [],
  vintage: [],
};

export const useProjectsFilterParams = () => {
  const router = useRouter();

  useEffect(() => {
    // 0xMakka @todo - move all query param logic to hook
  }, []);

  return { ...defaultFilterProps, ...router.query };
};
