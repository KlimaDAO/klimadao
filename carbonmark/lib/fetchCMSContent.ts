import sanityClient from "@sanity/client";
import { IS_PRODUCTION } from "./constants";
import { queries, QueryContent } from "./queries";

import {
  SANITY_STUDIO_API_DATASET,
  SANITY_STUDIO_API_PROJECT_ID,
} from "@klimadao/lib/constants";

export const getSanityClient = () => {
  return sanityClient({
    projectId: SANITY_STUDIO_API_PROJECT_ID,
    dataset: SANITY_STUDIO_API_DATASET,
    apiVersion: "2022-01-05",
    // token: 'sanity-auth-token', // or leave blank for unauthenticated usage
    useCdn: IS_PRODUCTION, // `false` if you want to ensure fresh data
  });
};

/** Util to fetch and type queries from Sanity CMS */
export const fetchCMSContent = async <T extends keyof QueryContent>(
  queryName: T,
  params?: Record<string, string | string[] | undefined>
): Promise<QueryContent[T]> => {
  try {
    const cms = getSanityClient();

    const content = await cms.fetch<QueryContent[T]>(queries[queryName], {
      ...params,
    });
    return content;
  } catch (e) {
    throw e;
  }
};
