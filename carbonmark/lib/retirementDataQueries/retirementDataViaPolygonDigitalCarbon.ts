import { subgraphs } from "@klimadao/lib/constants";
import { KlimaRetire, QueryKlimaRetires } from "@klimadao/lib/types/subgraph";
import { parseUnits } from "ethers/lib/utils";

async function fetchGraphQL(
  query: string,
  variables: Record<string, any> = {}
) {
  const response = await fetch(subgraphs.polygonDigitalCarbon, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error);
  }
  const json = await response.json();

  // ICR amounts are currently in regular integers in the subgraph. This standardizes them to wei to match the other registries and combining retirement data
  if (json.data.klimaRetires) {
    json.data.klimaRetires.forEach((retirement: KlimaRetire) => {
      if (retirement.retire.credit.project.registry === "ICR") {
        retirement.retire.amount = parseUnits(
          retirement.retire.amount,
          18
        ).toString();
      }
    });
  }
  return json;
}

function generateKlimaRetireQuery(beneficiaryAddress: string, index?: number) {
  return `
    query {
      klimaRetires(
        where: {
          retire_: {beneficiaryAddress: "${beneficiaryAddress.toLowerCase()}"}
          ${index !== undefined ? `, index: ${index}` : ""}
        },
        first: 1000,
        orderBy: retire__timestamp,
        orderDirection: desc
      ) {
        id
        index
        retire {
          hash
          beneficiaryName
          amount
          retirementMessage
          timestamp
          beneficiaryAddress {
            id
          }
          pool {
            id
          }
          credit {
            id
            project {
              registry
              projectID
              region
              name
              methodologies
              id
              country
              category
            }
            bridgeProtocol
            vintage
          }
        }
        feeAmount
      }
    }
  `;
}

export const queryKlimaRetireByIndex = async (
  beneficiaryAddress: string,
  index: number
): Promise<KlimaRetire | null> => {
  try {
    const json: QueryKlimaRetires = await fetchGraphQL(
      generateKlimaRetireQuery(beneficiaryAddress, index)
    );
    return json.data.klimaRetires.length ? json.data.klimaRetires[0] : null;
  } catch (e) {
    console.error("Failed to query KlimaRetireByIndex", e);
    return Promise.reject(e);
  }
};

export const queryKlimaRetiresByAddress = async (
  beneficiaryAddress: string
): Promise<KlimaRetire[]> => {
  try {
    const json: QueryKlimaRetires = await fetchGraphQL(
      generateKlimaRetireQuery(beneficiaryAddress)
    );
    return json.data.klimaRetires || [];
  } catch (e) {
    throw new Error("Failed to query KlimaRetiresByAddress", { cause: e });
  }
};

export const queryKlimaBlockNumber = async (): Promise<number> => {
  try {
    const json = await fetchGraphQL(`
      query {
        _meta {
          block {
            number
          }
        }
      }
    `);
    return json.data._meta.block.number;
  } catch (e) {
    console.error("Failed to query KlimaBlockNumber", e);
    return Promise.reject(e);
  }
};
