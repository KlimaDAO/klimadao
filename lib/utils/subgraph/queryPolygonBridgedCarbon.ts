import { BigNumber } from "ethers";
import { subgraphs } from "../../constants";
import { KlimaRetire, QueryKlimaRetires } from "../../types/subgraph";

export const queryKlimaRetireByIndex = async (
  beneficiaryAddress: string,
  index: number
): Promise<KlimaRetire | null> => {
  try {
    const result = await fetch(subgraphs.polygonBridgedCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            klimaRetires(
              where: {
                beneficiaryAddress: "${beneficiaryAddress.toLowerCase()}", 
                index: ${BigNumber.from(index)} 
              }
            ) {
              id
              timestamp
              pool
              transaction {
                id
              }
              beneficiaryAddress
              beneficiary
              retirementMessage
              amount
              offset {
                name
                id
                tokenAddress
                totalRetired
                projectID
                country
                region 
                bridge
                registry 
                standard
                vintage
                vintageYear
                methodology
                methodologyCategory
                category
                currentSupply
              }
            }
          }
          `,
      }),
    });
    if (!result.ok) {
      const json = await result.json();
      throw new Error(json);
    }
    const json: QueryKlimaRetires = await result.json();
    if (!json.data.klimaRetires.length) {
      return null; // might not exist yet, subgraph can be slow to index
    }
    return json.data.klimaRetires[0];
  } catch (e) {
    console.error("Failed to query KlimaRetireByIndex", e);
    return Promise.reject(e);
  }
};

export const queryKlimaRetiresByAddress = async (
  beneficiaryAddress: string
): Promise<KlimaRetire[] | false> => {
  try {
    const result = await fetch(subgraphs.polygonBridgedCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            klimaRetires(
              where: {
                beneficiaryAddress: "${beneficiaryAddress.toLowerCase()}"
              },
              orderBy: timestamp, 
              orderDirection: desc
            ) {
              id
              pool
              beneficiaryAddress
              index
              timestamp
              retirementMessage
              amount
              offset {
                id
                tokenAddress
                totalRetired
                projectID
                country
                region 
                bridge
                registry 
                standard
                name
              }
            }
          }
          `,
      }),
    });
    const json: QueryKlimaRetires = await result.json();
    return !!json.data.klimaRetires.length && json.data.klimaRetires;
  } catch (e) {
    console.error("Failed to query KlimaRetiresByAddress", e);
    return Promise.reject(e);
  }
};
