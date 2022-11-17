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
    carbonOffsetSearch: CarbonProject[];
  };
}

export const queryCarbonProjectDetails = async (
  searchQuery: string
): Promise<CarbonProject[]> => {
  try {
    console.log(searchQuery);
    const result = await fetch(subgraphs.polygonBridgedCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            carbonOffsetSearch(text: "${searchQuery}") {
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
    return json.data.carbonOffsetSearch;
  } catch (e) {
    console.error("Failed to query QueryCarbonProjectDetails", e);
    return Promise.reject(e);
  }
};
