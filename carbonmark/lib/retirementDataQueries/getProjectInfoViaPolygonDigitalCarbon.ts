import { subgraphs } from "@klimadao/lib/constants";

import { DigitalCarbonCredit } from "lib/types/carbonmark.types";
import fetch from "node-fetch";

export const getProjectInfoViaPolygonDigitalCarbon = async (
  address: string,
  vintage: number
): Promise<DigitalCarbonCredit | null> => {
  let creditWithStandard: DigitalCarbonCredit | null = null;

  try {
    const result = await fetch(subgraphs.polygonDigitalCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query ProjectTokenInfo($address: String, $vintage: Int) {
            carbonCredits(where: {tokenAddress: $address, vintage: $vintage}) {
              id
              vintage
                tokenId
              tokenAddress
              project {
                registry
                region
                name
                id
                country
                category
                methodologies
                projectID
              }
              currentSupply
              bridgeProtocol
              retired
              poolBalances {
                pool {
                  id
                }
              }
            }
  
        }
                `,
        variables: {
          address: address.toLowerCase(),
          vintage,
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

    const credit = data.data.carbonCredits[0];

    if (credit.project.registry === "ICR") {
      creditWithStandard = { ...credit, tokenStandard: "ERC1155" };
    } else {
      creditWithStandard = { ...credit, tokenStandard: "ERC20" };
    }

    return creditWithStandard;
  } catch (error) {
    console.error("Error fetching project token info:", error);
    return null;
  }
};
