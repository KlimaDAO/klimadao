import { subgraphs } from "@klimadao/lib/constants";
import { KlimaRetire, QueryKlimaRetires } from "@klimadao/lib/types/subgraph";
import { convertCountryCodeToName } from "../../lib/convertCountryCodeToName";
import { getCategoryFromMethodology } from "../../lib/getCategoryFromMethodology";
import { ICR_API } from "../../lib/registryAPIs/ICR/ICR_API";

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

    // need to do a second lookup for ICR to fetch the project num, country, region and methodologies as they are not included in the subgraph
    if (
      json.data.klimaRetires.length &&
      json.data.klimaRetires[0].retire.credit.project.registry === "ICR"
    ) {
      const klimaRetire = json.data.klimaRetires[0];

      // currently defaults to polygon
      const { ICR_API_URL, ICR_API_KEY } = ICR_API("polygon");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ICR_API_KEY}`,
      };

      const response = await fetch(
        `${ICR_API_URL}/public/projects?onChainId=${klimaRetire.retire.credit.project.projectID}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      const data = await response.json();
      klimaRetire.retire.credit.project.country =
        convertCountryCodeToName(data.countryCode) || "";
      klimaRetire.retire.credit.project.category = (
        getCategoryFromMethodology(data.methodology.id) ?? ""
      ).toString();

      klimaRetire.retire.credit.project.methodologies = data.methodology.id;
      klimaRetire.retire.credit.project.region = data.geographicalRegion;
      klimaRetire.retire.credit.project.projectID = "ICR" + "-" + data.num;
      return klimaRetire;
    }
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
