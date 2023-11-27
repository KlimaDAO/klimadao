import { Retire, RetirePageProps } from "components/pages/Portfolio/Retire";
import { loadTranslation } from "lib/i18n";
import { getProjectInfoViaPolygonDigitalCarbon } from "lib/retirementDataQueries/getProjectInfoViaPolygonDigitalCarbon";
import { GetServerSideProps, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  project_token_0x: string;
  network: string;
}

// @todo break out info correct files
const GRAPH_API_ROOT = "https://api.thegraph.com/subgraphs/name";

// @todo change polygon to correct subgraph when api key authenticated
const subgraphUrls = {
  polygon: `${GRAPH_API_ROOT}/skjaldbaka17/carbon-registry-test`,
  mumbai: `${GRAPH_API_ROOT}/skjaldbaka17/carbon-registry-test`,
};

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

  const exPostQuery = `
  query getExpostByAddressAndVintage($projectAddress: String!, $vintage: String!) {
    exPosts(
      where: {project_: {projectAddress: $projectAddress}, vintage: $vintage}
    ) {
      serialization
      tokenId
      vintage
      project {
        projectName
        projectAddress
      }
    }
  }
`;

  const variables = {
    projectAddress: params.project_token_0x.toLowerCase(),
    vintage: vintage,
  };
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
