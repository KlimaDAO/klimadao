import {
  ProjectPurchase,
  ProjectPurchasePageProps,
} from "components/pages/Project/Purchase";
import { api } from "lib/api/sdk";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
}

export const getStaticProps: GetStaticProps<
  ProjectPurchasePageProps,
  Params
> = async (ctx) => {
  const { params, locale } = ctx;

  if (!params || !params?.project_id) {
    throw new Error("No matching params found");
  }

  try {
    const project = await api.carbonmark.getProject(params.project_id);

    // check if listing ID is correct here on server? Or rather on client with nicer error state?
    const listing =
      !!project.listings?.length &&
      project.listings.find((listing) => listing.id === params?.listing_id);

    if (!listing) {
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
