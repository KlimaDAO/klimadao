import {
  getProjectsId,
  getProjectsIdActivity,
} from ".generated/carbonmark-api-sdk/clients";
import {
  PageProps,
  Project,
  VISIBLE_ACTIVITIES,
} from "components/pages/Project";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_id: string;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  const { params, locale } = ctx;

  if (!params || !params?.project_id) {
    throw new Error("No matching params found");
  }

  try {
    const [project, activities] = await Promise.all([
      getProjectsId(params.project_id),
      getProjectsIdActivity(params.project_id, {
        activityType: VISIBLE_ACTIVITIES,
      }),
    ]);

    if (!project) {
      throw new Error("No project found");
    }
    const translation = await loadTranslation(locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        project,
        activities,
        projectID: params.project_id,
        translation,
        fixedThemeName: "theme-light",
      },
      revalidate: 10,
    };
  } catch (e) {
    console.error("Failed to generate Carbonnmark Project Page", e);
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

export default Project;
