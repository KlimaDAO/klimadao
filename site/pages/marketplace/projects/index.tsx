import { Project } from "@klimadao/lib/types/marketplace";
import { getMarketplaceProjects } from "@klimadao/lib/utils";
import { MarketPlaceProjects } from "components/pages/Marketplace/Projects";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";

interface PageProps {
  projects: Project[];
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  try {
    const projects = await getMarketplaceProjects();
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        projects,
        translation,
      },
      revalidate: 240,
    };
  } catch (e) {
    console.error("Failed to generate Marketplace Projects Page", e);
    return {
      notFound: true,
      revalidate: 240,
    };
  }
};

export default MarketPlaceProjects;
