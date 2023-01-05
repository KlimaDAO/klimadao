import { subgraphs } from "@klimadao/lib/constants";

import { Holding, QueryHoldings } from "../types";

const QUERY_LIMIT = 1000;

export const queryHoldingsByAddress = async (
  beneficiaryAddress: string
): Promise<Holding[]> => {
  try {
    const result = await fetch(subgraphs.userCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
            query {
              holdings(
                first: ${QUERY_LIMIT},
                where: {
                  klimate: "${beneficiaryAddress.toLowerCase()}",
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

    const json: QueryHoldings = await result.json();
    return json.data.holdings;
  } catch (e) {
    console.error("Failed to query HoldingsByAddress", e);
    return Promise.reject(e);
  }
};
