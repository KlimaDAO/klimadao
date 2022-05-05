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
              first: 1000,
              orderBy: timestamp, 
              orderDirection: asc,
              where: {beneficiaryAddress: "${beneficiaryAddress}", index: ${BigNumber.from(
          index
        )} }
              ) {
              id
              timestamp
              transaction {
                id
                timestamp
                value
              }
              retiringAddress
              beneficiaryAddress
              beneficiary
              retirementMessage
              pool
              amount
              offset {
                id
                name
                tokenAddress
                bridge
                vintage
                projectID
                bridge
              }
            }
          }
          `,
      }),
    });
    const json: QueryKlimaRetires = await result.json();
    return !!json.data.klimaRetires.length && json.data.klimaRetires[0];
  } catch (e) {
    console.log("e", e);
    return Promise.reject(e);
  }
};
