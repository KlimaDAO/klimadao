import { subgraphs } from "@klimadao/lib/constants";

export const getWalletHoldingsViaPolygonDigitalCarbon = async (
  address: string
) => {
  try {
    const result = await fetch(subgraphs.polygonDigitalCarbon, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query WalletHoldings($address: String) {
            account(id: $address) {
              holdings {
                id
                token {
                  id
                  name
                  symbol
                  decimals
                }
                amount
              }
            }
          }
        `,
        variables: {
          address: address.toLowerCase(),
        },
      }),
    });

    if (!result.ok) {
      const { message, name } = (await result.json()) as {
        message: string;
        name: string;
      };
      const e = new Error(message);
      e.name = name;
      throw e;
    }
    return await result.json();
  } catch (error) {
    console.error("Error fetching project token info:", error);
    return null;
  }
};
