import {
  ProjectRetire,
  ProjectRetirePageProps,
} from "components/pages/Project/Retire";
import { getCarbonmarkProject } from "lib/carbonmark";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
  token_address: string;
}

export const getStaticProps: GetStaticProps<
  ProjectRetirePageProps,
  Params
> = async (ctx) => {
  const { params, locale } = ctx;

  if (!params || !params?.project_id) {
    throw new Error("No matching params found");
  }

  try {
    const project = await getCarbonmarkProject(params.project_id);

    // check if price for this token address is correct
    const poolPrice =
      !!project.prices?.length &&
      project.prices.find(
        (price) => price.tokenAddress === params?.token_address
      );

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
