import { ICR_API_KEYS, subgraphs } from "@klimadao/lib/constants";
import { ProjectRetirementDetails } from "./types/carbonmark.types";

export const getProjectInfoFromPolygonBridgedCarbon = async (
  address: string,
  network: "polygon" | "mumbai"
) => {
  let networkSpecificSubgraph: string;
  if (network === "polygon") {
    networkSpecificSubgraph = subgraphs.polygonBridgedCarbon;
  } else if (network === "mumbai") {
    console.error("No polygon bridged carbon subgraph for mumbai.");
    return null;
  } else {
    throw new Error("Invalid network provided");
  }
  try {
    const result = await fetch(networkSpecificSubgraph, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query ProjectTokenInfo($address: String) {
          carbonOffsets(where: {id: $address}) {
            projectID
            vintageYear
            vintage
            totalRetired
            tokenAddress
            totalBridged
            standard
            storageMethod
            id
            registry
            region
            name
            methodologyCategory
            methodology
            method
            lastUpdate
            klimaRanking
            isCorsiaCompliant
            emissionType
            currentSupply
            country
            correspAdjustment
            coBenefits
            category
          }
        }
                `,
        variables: {
          address: address.toLowerCase(),
        },
      }),
    });

    if (!result.ok) {
      const { message, name } = await result.json();
      const e = new Error(message);
      e.name = name;
      throw e;
    }

    const data = await result.json();
    return data.data.carbonOffsets;
  } catch (error) {
    console.error("Error fetching project token info:", error);
    return null;
  }
};

export async function fetchPbcProjectData(
  projectToken: string,
  network: "polygon" | "mumbai"
): Promise<ProjectRetirementDetails> {
  const pbcResponse = await getProjectInfoFromPolygonBridgedCarbon(
    projectToken,
    network
  );

  if (!pbcResponse || pbcResponse.length === 0) {
    throw new Error("No PBC project data found.");
  }

  const targetProject = pbcResponse[0];

  return {
    tokenAddress: targetProject.tokenAddress,
    tokenId: "",
    vintageYear: targetProject.vintageYear,
    name: targetProject.name,
    registry: targetProject.registry,
    methodologyCategory: targetProject.methodologyCategory,
    projectId: targetProject.projectID,
    tokenStandard: "ERC20",
  };
}

export const fetchIcrProjectData = async (
  projectAddress: string,
  vintage: string,
  network: string
): Promise<ProjectRetirementDetails> => {
  const query = `
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
  let networkSpecificSubgraph;

  if (network === "polygon") {
    networkSpecificSubgraph = subgraphs.IcrPolygon;
  } else if (network === "mumbai") {
    networkSpecificSubgraph = subgraphs.IcrMumbai;
  } else {
    throw new Error("Invalid network provided");
  }
  try {
    const result = await fetch(networkSpecificSubgraph, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ICR_API_KEYS[network]}`,
      },
      body: JSON.stringify({
        query: query,
        variables: {
          projectAddress: projectAddress.toLowerCase(),
          vintage: vintage,
        },
      }),
    });

    if (!result.ok) {
      const { message, name } = await result.json();
      const e = new Error(message);
      e.name = name;
      throw e;
    }

    const data = await result.json();

    if (
      !data ||
      !data.data ||
      !data.data.exPosts ||
      data.data.exPosts.length === 0
    ) {
      throw new Error("No ICR project data found.");
    }

    const projectDetails = data.data.exPosts[0];

    return {
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
  } catch (error) {
    console.error("Error fetching ICR project data:", error);
    throw error; // Rethrowing the error to be handled by the caller
  }
};
