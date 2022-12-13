import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { MarketPlaceProjectPurchase } from "components/pages/Marketplace/Purchase";
import { getMarketplaceProject } from "@klimadao/lib/utils";
import { loadTranslation } from "lib/i18n";
import { Project } from "@klimadao/lib/types/marketplace";

interface Params extends ParsedUrlQuery {
  project_id: string;
}

interface PageProps {
  project: Project;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  console.log("CTX", ctx);
  const { params, locale } = ctx;

  if (!params || !params?.project_id) {
    throw new Error("No matching params found");
  }

  try {
    // TODO: read listingID and seller data from queries
    const project = await getMarketplaceProject(params.project_id);
    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        project,
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate Marketplace Project Purchase Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default MarketPlaceProjectPurchase;
