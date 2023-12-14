import { Retire, RetirePageProps } from "components/pages/Portfolio/Retire";
import { loadTranslation } from "lib/i18n";
import { getProjectInfoViaPolygonDigitalCarbon } from "lib/retireQueries";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_token_0x: string;
}

export const getServerSideProps: GetServerSideProps<
  RetirePageProps,
  Params
> = async (ctx): Promise<GetServerSidePropsResult<RetirePageProps>> => {
  const { params } = ctx;

  if (!params || !params?.project_token_0x) {
    throw new Error("No matching params found");
  }

  try {
    const project = await getProjectInfoViaPolygonDigitalCarbon(
      params.project_token_0x.toLowerCase()
    );
    if (project.length === 0) {
      throw new Error(
        "No project found with address: " + params.project_token_0x
      );
    }

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
