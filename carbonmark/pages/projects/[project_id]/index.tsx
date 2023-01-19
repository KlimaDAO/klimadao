import { Project as ProjectType } from "@klimadao/lib/types/carbonmark";
import { getCarbonmarkProject } from "@klimadao/lib/utils";
import { Project } from "components/pages/Project";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
}

interface PageProps {
  project: ProjectType;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  const { params, locale } = ctx;

  if (!params || !params?.project_id) {
    throw new Error("No matching params found");
  }

  try {
    const project = await getCarbonmarkProject(params.project_id);
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
    console.error("Failed to generate Carbonnmark Project Page", e);
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

export default Project;
