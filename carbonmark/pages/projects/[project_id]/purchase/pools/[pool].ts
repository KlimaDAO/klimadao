import { PoolToken } from "@klimadao/lib/constants";
import {
  ProjectPurchase,
  ProjectPurchasePageProps,
} from "components/pages/Project/Purchase";
import { getCarbonmarkProject } from "lib/carbonmark";
import { isPoolToken } from "lib/getPoolData";
import { loadTranslation } from "lib/i18n";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
  pool: PoolToken;
}

export const getServerSideProps: GetServerSideProps<
  ProjectPurchasePageProps,
  Params
> = async (ctx) => {
  const { params, locale } = ctx;

  const poolName = !!params?.pool && params.pool.toLowerCase();

  if (!params || !params?.project_id || !poolName || !isPoolToken(poolName)) {
    throw new Error("No matching params found");
  }

  try {
    const project = await getCarbonmarkProject(params.project_id);

    // check if price for pool exists for this project
    const poolPrice =
      !!project.prices?.length &&
      project.prices.find((price) => price.name.toLowerCase() === poolName);

    if (!poolPrice) {
      throw new Error("No matching pool price found");
    }

    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        project,
        purchase: poolPrice,
        translation,
        fixedThemeName: "theme-light",
      },
    };
  } catch (e) {
    console.error(
      "Failed to generate Carbonmark Project Purchase from Pool Page",
      e
    );
    return {
      notFound: true,
    };
  }
};

export default ProjectPurchase;
