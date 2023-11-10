import {
    ProjectRetire,
    ProjectRetirePageProps,
} from "components/pages/Project/Retire";
import { getCarbonmarkProject } from "lib/carbonmark";
import { IS_PRODUCTION } from "lib/constants";
import { loadTranslation } from "lib/i18n";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
  listing_id: string;
}

export const getServerSideProps: GetServerSideProps<
  ProjectRetirePageProps,
  Params
> = async (ctx) => {
  const { params, locale } = ctx;
  // destructure for type guarding
  const { project_id, listing_id } = params || {};

  if (!project_id || !listing_id) {
    throw new Error("No matching params found");
  }

  try {
    let project = await getCarbonmarkProject(project_id);

    if (!project) {
      throw new Error("No project found");
    }

    const findListing = (l: { id: string }) =>
      l.id.toLowerCase() === listing_id.toLowerCase();

    // check if listing ID is correct here on server? Or rather on client with nicer error state?
    let listing = project.listings.find(findListing);

    if (!listing && !IS_PRODUCTION) {
      // check testnet listings
      project = await getCarbonmarkProject(project_id, {
        network: "mumbai",
      });
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
    };
  } catch (e) {
    console.error(
      "Failed to generate Carbonmark Project Retire from Listing Page",
      e
    );
    return {
      notFound: true,
    };
  }
};

export default ProjectRetire;
