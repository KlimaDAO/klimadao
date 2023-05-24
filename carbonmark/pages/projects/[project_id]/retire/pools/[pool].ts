import { PoolToken } from "@klimadao/lib/constants";
import {
  ProjectRetire,
  ProjectRetirePageProps,
} from "components/pages/Project/Retire";
import { getCarbonmarkProject } from "lib/carbonmark";
import { isPoolToken } from "lib/getPoolData";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
  pool: PoolToken;
}

export const getStaticProps: GetStaticProps<
  ProjectRetirePageProps,
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
        poolPrice,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error(
      "Failed to generate Carbonmark Project Retire from Pool Page",
      e
    );
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
