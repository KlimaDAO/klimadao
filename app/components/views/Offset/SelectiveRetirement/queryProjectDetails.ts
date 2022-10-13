import { subgraphs } from "@klimadao/lib/constants";

export interface CarbonProject {
  id: string;
  tokenAddress: string;
  projectID: string; // starts with 'VCS-' if registry is "Verra"
  name: string;
  country: string;
  region: string;
  vintage: string;
  methodology: string;
  methodologyCategory: string;
  category: string;
  currentSupply: number;
}

export interface QueryCarbonProjectDetails {
  data: {
    carbonProjects: CarbonProject[];
  };
}

export const queryCarbonProjectDetails = async (
  searchQuery: string
): Promise<CarbonProject | false> => {
  try {
    const result = await fetch(subgraphs.polygonBridgedCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            carbonProjects(text: "${searchQuery}") {
              id
              tokenAddress
              projectID
              name
              country
              region 
              vintage
              methodology
              methodologyCategory
              category
              currentSupply
            }
          }
          `,
      }),
    });
    const json: QueryCarbonProjectDetails = await result.json();
    return !!json.data.carbonProjects.length && json.data.carbonProjects[0];
  } catch (e) {
    console.error("Failed to query QueryCarbonProjectDetails", e);
    return Promise.reject(e);
  }
};
