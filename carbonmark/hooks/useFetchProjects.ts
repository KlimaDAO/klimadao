import { useGetProjects } from ".generated/carbonmark-api-sdk/hooks/useGetProjects";
import { Project } from ".generated/carbonmark-api-sdk/types";
import { DEFAULT_MIN_LISTING_QUANTITY } from "lib/constants";
import { emptyToUndefined, joinArray } from "lib/utils/string.utils";
import { mapValues } from "lodash";
import { pipe } from "lodash/fp";
import { useRouter } from "next/router";

export type ProjectsProps = {
  isLoading: boolean;
  isValidating: boolean;
  projects: Array<Project>;
};

/** This is a utility wrapper that handles query mapping (converting arrays of strings in to a single string) */
export const useFetchProjects = () => {
  const { query } = useRouter();
  const mappedParams = mapValues(query, pipe(joinArray, emptyToUndefined));
  return useGetProjects({
    ...mappedParams,
    minSupply: DEFAULT_MIN_LISTING_QUANTITY,
  });
};
