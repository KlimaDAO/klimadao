import { Project } from "@klimadao/lib/types/marketplace";
import { getMarketplaceProject } from "@klimadao/lib/utils";
import { MarketPlaceProject } from "components/pages/Project";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
}

interface PageProps {
  project: Project;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  const { params, locale } = ctx;

  if (!params || !params?.project_id) {
    throw new Error("No matching params found");
  }

  try {
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
    console.error("Failed to generate Marketplace Project Page", e);
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

export default MarketPlaceProject;
