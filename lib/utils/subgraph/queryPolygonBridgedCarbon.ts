import { BigNumber } from "ethers";
import { subgraphs } from "../../constants";
import { QueryKlimaRetires, KlimaRetire } from "../../types/subgraph";

export const queryKlimaRetireByIndex = async (
  beneficiaryAddress: string,
  index: number
): Promise<KlimaRetire | false> => {
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
              transaction {
                id
              }
              beneficiaryAddress
              beneficiary
              retirementMessage
              amount
              offset {
                id
                tokenAddress
              }
            }
          }
          `,
      }),
    });
    const json: QueryKlimaRetires = await result.json();
    return !!json.data.klimaRetires.length && json.data.klimaRetires[0];
  } catch (e) {
    console.error("Failed to query KlimaRetireByIndex", e);
    return Promise.reject(e);
  }
};

export const queryKlimaRetiresByAddress = async (
  beneficiaryAddress: string
): Promise<KlimaRetire[]> => {
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
              beneficiaryAddress
              index
              timestamp
              retirementMessage
              amount
              offset {
                id
                tokenAddress
              }
            }
          }
          `,
      }),
    });
    const json: QueryKlimaRetires = await result.json();
    return json.data.klimaRetires;
  } catch (e) {
    console.error("Failed to query KlimaRetiresByAddress", e);
    return Promise.reject(e);
  }
};
