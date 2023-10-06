import { getProjectsId } from ".generated/carbonmark-api-sdk/clients";
import {
  ProjectPurchase,
  ProjectPurchasePageProps,
} from "components/pages/Project/Purchase";
import { IS_PRODUCTION } from "lib/constants";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
  listing_id: string;
}

export const getStaticProps: GetStaticProps<
  ProjectPurchasePageProps,
  Params
> = async (ctx) => {
  const { params, locale } = ctx;
  // destructure for type guarding
  const { project_id, listing_id } = params || {};

  if (!project_id || !listing_id) {
    throw new Error("Bad request");
  }

  try {
    let project = await getProjectsId(project_id);

    if (!project) {
      throw new Error("No project found");
    }

    const findListing = (l: { id: string }) =>
      l.id.toLowerCase() === listing_id.toLowerCase();

    // check if listing ID is correct here on server? Or rather on client with nicer error state?
    let listing = project.listings.find(findListing);

    if (!listing && !IS_PRODUCTION) {
      // check testnet listings
      project = await getProjectsId(project_id, { network: "mumbai" });
      listing = project?.listings.find(findListing);
    }

    if (!project || !listing) {
      throw new Error("No matching listing found");
    }

    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        project,
        purchase: listing,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error("Failed to generate Carbonmark Project Purchase Page", e);
    return {
      notFound: true,
      revalidate: 10,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProjectPurchase;
