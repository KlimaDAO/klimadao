import { Retire, RetirePageProps } from "components/pages/Retire";
import { loadTranslation } from "lib/i18n";
import { getProjectTokenInfo } from "lib/retireQueries";
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

export const getStaticProps: GetStaticProps<RetirePageProps, Params> = async (
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
