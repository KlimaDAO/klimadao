import {
  getListingsId,
  getProjectsId,
} from ".generated/carbonmark-api-sdk/clients";
import {
  ProjectRetire,
  ProjectRetirePageProps,
} from "components/pages/Project/Retire";
import { IS_PRODUCTION } from "lib/constants";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
  listing_id: string;
}

export const getStaticProps: GetStaticProps<
  ProjectRetirePageProps,
  Params
> = async (ctx) => {
  const { params, locale } = ctx;
  // destructure for type guarding
  const { project_id, listing_id } = params || {};

  if (!project_id || !listing_id) {
    throw new Error("Bad request");
  }

  try {
    let [project, listing] = await Promise.all([
      getProjectsId(project_id),
      getListingsId(listing_id.toLowerCase()),
    ]);

    if (!project) {
      throw new Error("No project found");
    }

    if (!listing && !IS_PRODUCTION) {
      // check testnet listings
      [project, listing] = await Promise.all([
        getProjectsId(project_id, { network: "mumbai" }),
        getListingsId(listing_id.toLowerCase(), {
          network: "mumbai",
        }),
      ]);
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
        product: {
          ...listing,
          type: "listing",
        },
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error("Failed to generate Carbonmark Project Retire Page", e);
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

export default ProjectRetire;
