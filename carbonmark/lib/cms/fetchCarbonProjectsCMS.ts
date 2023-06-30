import sanityClient from "@sanity/client";
import { IS_PRODUCTION } from "lib/constants";

import {
  SANITY_STUDIO_API_CARBON_PROJECTS_PROJECT_ID,
  SANITY_STUDIO_API__CARBON_PROJECTS_DATASET,
} from "@klimadao/lib/constants";

export const getSanityClient = () => {
  return sanityClient({
    projectId: SANITY_STUDIO_API_CARBON_PROJECTS_PROJECT_ID,
    dataset: SANITY_STUDIO_API__CARBON_PROJECTS_DATASET,
    apiVersion: "2023-06-01",
    useCdn: IS_PRODUCTION, // `false` if you want to ensure fresh data
  });
};
