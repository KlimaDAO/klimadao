import { subgraphs } from "@klimadao/lib/constants";

export const getProjectInfoViaPolygonDigitalCarbon = async (
  address: string
) => {
  try {
    const result = await fetch(subgraphs.polygonDigitalCarbon, {
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
