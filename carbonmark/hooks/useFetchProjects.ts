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
// @todo fixit
// import { useWeb3 } from "@klimadao/lib/utils";
// import { urls } from "lib/constants";
// import { fetcher } from "lib/fetcher";
// import { getProjectsQueryString } from "lib/getProjectsQueryString";
// import { Project } from "lib/types/carbonmark.types";
// import { isNil } from "lodash";
// import { negate } from "lodash/fp";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import useSWR, { mutate } from "swr";

// export const useFetchProjects = () => {
//   const router = useRouter();
//   const queryString = getProjectsQueryString(router.query);
//   const { networkLabel } = useWeb3();

//   const [currentNetwork, setCurrentNetwork] = useState(networkLabel);

//   useEffect(() => {
//     if (networkLabel && networkLabel !== currentNetwork) {
//       setCurrentNetwork(networkLabel);
//       const path = `${urls.api.projects}${queryString}${
//         queryString ? "&" : "?"
//       }network=${networkLabel}`;
//       mutate(path);
//     }
//   }, [networkLabel, queryString]);

//   const path = currentNetwork
//     ? `${urls.api.projects}${queryString}${
//         queryString ? "&" : "?"
//       }network=${currentNetwork}`
//     : null;

//   const { data, ...rest } = useSWR<Project[]>(path, fetcher, {
//     revalidateOnMount: true,
//   });

//   const projects = data?.filter(negate(isNil)) ?? [];
//   return { projects, ...rest };
