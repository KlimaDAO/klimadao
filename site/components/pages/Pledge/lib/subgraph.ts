// import { BigNumber } from "ethers";
// import { subgraphs } from "@klimadao/lib/constants";
// import { QueryKlimaRetires, KlimaRetire } from "../../types/subgraph";

export const queryHoldingsByAddress = async (
  beneficiaryAddress: string
) => {
  try {
    const result = await fetch("https://api.thegraph.com/subgraphs/name/cujowolf/klima-user-dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            holdings(
              where: {
                klimate: "${beneficiaryAddress.toLowerCase()}" 
              }
            ) {
              id
              timestamp
              token
              tokenAmount
              carbonValue
            }
          }
        `,
      }),
    });
    const json = await result.json();
    return json.data.holdings;
  } catch (e) {
    console.error("Failed to query HoldingsByAddress", e);
    return Promise.reject(e);
  }
};