import { subgraphs } from "../../constants";
import { KlimaRetire, QueryKlimaRetires } from "../../types/subgraph";

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
  return response.json();
}

function generateKlimaRetireQuery(beneficiaryAddress: string, index?: number) {
  return `
    query {
      klimaRetires(
        where: {
          retire_: {beneficiaryAddress: "${beneficiaryAddress.toLowerCase()}"}
          ${index !== undefined ? `, index: ${index}` : ""}
        },
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
): Promise<KlimaRetire[] | false> => {
  try {
    const json: QueryKlimaRetires = await fetchGraphQL(
      generateKlimaRetireQuery(beneficiaryAddress)
    );
    return !!json.data.klimaRetires.length && json.data.klimaRetires;
  } catch (e) {
    console.error("Failed to query KlimaRetiresByAddress", e);
    return Promise.reject(e);
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
