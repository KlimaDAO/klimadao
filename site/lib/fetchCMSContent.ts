import sanityClient from "@sanity/client";
import { queries, QueryContent } from "./queries";

const getSanityClient = () => {
  return sanityClient({
    projectId: process.env.SANITY_STUDIO_API_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_API_DATASET,
    apiVersion: "2022-01-05",
    // token: 'sanity-auth-token', // or leave blank for unauthenticated usage
    useCdn: true, // `false` if you want to ensure fresh data
  });
};

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
