import { useGetProjects } from ".generated/carbonmark-api-sdk/hooks/useGetProjects";
import { Project } from ".generated/carbonmark-api-sdk/types";
import { DEFAULT_MIN_LISTING_QUANTITY } from "lib/constants";
import { ObjectUtils } from "lib/utils/object.utils";
import { joinArray } from "lib/utils/string.utils";
import { mapValues } from "lodash";
import { useRouter } from "next/router";
import { FilterValues } from "./useProjectsFilterParams";

export type ProjectsProps = {
  isLoading: boolean;
  isValidating: boolean;
  projects: Array<Project>;
};

/** This is a utility wrapper that handles query mapping (converting arrays of strings in to a single string) */
export const useFetchProjects = () => {
  const { query } = useRouter();
  const params = query as FilterValues;

  //Remove keys with nullish values and nullish values from arrays then join
  const mappedParams = mapValues(ObjectUtils.clean(params), joinArray(","));

  return useGetProjects({
    ...mappedParams,
    minSupply: DEFAULT_MIN_LISTING_QUANTITY,
  });
};
