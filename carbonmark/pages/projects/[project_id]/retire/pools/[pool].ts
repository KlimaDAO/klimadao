import { getProjectsId } from ".generated/carbonmark-api-sdk/clients";
import { PoolToken } from "@klimadao/lib/constants";
import {
  ProjectRetire,
  ProjectRetirePageProps,
} from "components/pages/Project/Retire";
import { isPoolToken } from "lib/getPoolData";
import { loadTranslation } from "lib/i18n";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
  pool: PoolToken;
}

export const getServerSideProps: GetServerSideProps<
  ProjectRetirePageProps,
  Params
> = async (ctx) => {
  const { params, locale } = ctx;

  const poolName = !!params?.pool && params.pool.toLowerCase();

  if (!params || !params?.project_id || !poolName || !isPoolToken(poolName)) {
    throw new Error("No matching params found");
  }

  try {
    const project = await getProjectsId(params.project_id);
    if (!project) {
      throw new Error("project not found");
    }

    // check if price for pool exists for this project
    const poolPrice =
      !!project.prices?.length &&
      project.prices.find((price) => price.poolName.toLowerCase() === poolName);

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
        product: { ...poolPrice, type: "pool" },
        translation,
        fixedThemeName: "theme-light",
      },
    };
  } catch (e) {
    console.error(
      "Failed to generate Carbonmark Project Retire from Pool Page",
      e
    );
    return {
      notFound: true,
    };
  }
};

export default ProjectRetire;
