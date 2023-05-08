import { PageProps, Retire } from "components/pages/Retire";
import { getProjectTokenInfo } from "lib/graphQueries";
import { loadTranslation } from "lib/i18n";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

interface Params extends ParsedUrlQuery {
  project_token_0x: string;
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  ctx
) => {
  const { params } = ctx;

  if (!params || !params?.project_token_0x) {
    throw new Error("No matching params found");
  }

  try {
    const project = await getProjectTokenInfo(params.project_token_0x);
    const translation = await loadTranslation(ctx.locale);

    if (!translation) {
      throw new Error("No translation found");
    }

    return {
      props: {
        translation,
        project,
        fixedThemeName: "theme-light",
      },
      notFound: undefined,
    };
  } catch (e) {
    console.error("Failed to generate Retire Page", e);
    return {
      notFound: true,
      props: undefined,
    };
  }
};

export default Retire;
