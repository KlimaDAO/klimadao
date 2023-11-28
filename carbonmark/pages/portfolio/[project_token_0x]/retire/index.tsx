import { ICR_API_KEYS } from "@klimadao/lib/constants";
import { Retire, RetirePageProps } from "components/pages/Portfolio/Retire";
import { loadTranslation } from "lib/i18n";
import { getProjectInfoFromPolygonBridgedCarbon } from "lib/retireQueries";
import type {
  PbcProject,
  ProjectRetirementDetails,
} from "lib/types/carbonmark.types";
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
    let project: ProjectRetirementDetails | null = null;

    // vintage only necessary for ICR projects to look up specific vintage on project contracts that hold multiple vintages
    if (!!vintage) {
      const IcrResponse = await fetch(subgraphUrls[network], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ICR_API_KEYS[network]}`,
        },
        body: JSON.stringify({ query: exPostQuery, variables }),
      });
      const IcrProject = await IcrResponse.json();
      const projectDetails = IcrProject.data.exPosts[0];
      project = {
        tokenAddress: projectDetails.project.projectAddress,
        tokenId: projectDetails.tokenId,
        vintageYear: projectDetails.vintage,
        name: projectDetails.project.projectName,
        registry: projectDetails.serialization.split("-")[0],
        methodologyCategory: "",
        projectId:
          projectDetails.serialization.split("-")[0] +
          "-" +
          projectDetails.serialization.split("-")[3],
        tokenStandard: "ERC1155",
      };
    } else if (network === "polygon") {
      const PbcResponse: PbcProject[] =
        await getProjectInfoFromPolygonBridgedCarbon(
          params.project_token_0x.toLowerCase()
        );
      const targetProject = PbcResponse[0];
      project = {
        tokenAddress: targetProject.tokenAddress,
        tokenId: "",
        vintageYear: targetProject.vintageYear,
        name: targetProject.name,
        registry: targetProject.registry,
        methodologyCategory: targetProject.methodologyCategory,
        projectId: targetProject.projectID,
        tokenStandard: "ERC20",
      };
    } else if (network === "mumbai") {
      throw new Error("Mumbai not supported yet for non IRC projects");
    } else {
      throw new Error("Invalid network");
    }

    if (
      !project ||
      Object.values(project).some((val) => val === null || val === undefined)
    ) {
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
    console.error("Failed to generate Retire Page", e);
    return {
      notFound: true,
      props: undefined,
    };
  }
};

export default Retire;
