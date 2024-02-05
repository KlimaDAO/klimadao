import { Retire, RetirePageProps } from "components/pages/Portfolio/Retire";
import { loadTranslation } from "lib/i18n";
import { getProjectInfoViaPolygonDigitalCarbon } from "lib/retirementDataQueries/getProjectInfoViaPolygonDigitalCarbon";
import { DigitalCarbonCredit } from "lib/types/carbonmark.types";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_token_0x: string;
  network: string;
}

export const getServerSideProps: GetServerSideProps<
  RetirePageProps,
  Params
> = async (ctx): Promise<GetServerSidePropsResult<RetirePageProps>> => {
  const { params, query } = ctx;

  const network = query.network as string;
  const vintage = query.vintage as string;

  if (!params || !params?.project_token_0x) {
    throw new Error("No matching params found");
  }

  if (network !== "polygon" && network !== "mumbai") {
    throw new Error("Invalid network");
  }

  try {
    const project: DigitalCarbonCredit | null =
      await getProjectInfoViaPolygonDigitalCarbon(
        params.project_token_0x.toLowerCase(),
        Number(vintage)
      );

    if (!project) {
      throw new Error("Project could not be determined.");
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
    console.error("Failed to generate Portfolio Retire Page", e);
    return {
      notFound: true,
      props: undefined,
    };
  }
};

export default Retire;
