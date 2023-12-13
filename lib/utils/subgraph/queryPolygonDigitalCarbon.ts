import { subgraphs } from "../../constants";
import { KlimaRetire, QueryKlimaRetires } from "../../types/subgraph";

export const queryKlimaRetireByIndex = async (
  beneficiaryAddress: string,
  index: number
): Promise<KlimaRetire | null> => {
  try {
    const result = await fetch(subgraphs.polygonDigitalCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
          klimaRetires(
            where: {retire_: {beneficiaryAddress: "${beneficiaryAddress.toLowerCase()}"}, index: ${index}},
            orderBy: retire__timestamp,
            orderDirection: desc
          ) {
            id
            index
            retire {
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
    const result = await fetch(subgraphs.polygonDigitalCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
          klimaRetires(
            where: {retire_: {beneficiaryAddress: "${beneficiaryAddress.toLowerCase()}"}},
            orderBy: retire__timestamp,
            orderDirection: desc
          ) {
            id
            index
            retire {
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

export const queryKlimaBlockNumber = async (): Promise<number> => {
  try {
    const result = await fetch(subgraphs.polygonDigitalCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            _meta {
              block {
                number
              }
            }
          }
          `,
      }),
    });
    if (!result.ok) {
      throw new Error(result.statusText);
    }
    const json = await result.json();
    return json.data._meta.block.number;
  } catch (e) {
    console.error("Failed to query KlimaBlockNumber", e);
    return Promise.reject(e);
  }
};
