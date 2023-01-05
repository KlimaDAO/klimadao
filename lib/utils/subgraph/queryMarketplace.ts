import { subgraphs } from "../../constants";
import { Purchase } from "../../types/marketplace";

type QueryResult = {
  data: {
    purchase: Purchase;
  };
};

export const queryMarketplaceByPurchase = async (
  id: string
): Promise<Purchase | false> => {
  try {
    const result = await fetch(subgraphs.marketplace, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            purchase(
              id: "${id}"
            ) {
              id
              amount
              price
              timeStamp
              listing {
                id
                project {
                  name
                  key
                  id
                  methodology
                  projectID
                  projectType
                  region
                  registry
                  vintage
                  category {
                    id
                  }
                  country {
                    id
                  }
                  projectAddress
                }
                singleUnitPrice
              }
            }
          }
          `,
      }),
    });
    const json: QueryResult = await result.json();
    return !!json?.data?.purchase && json.data.purchase;
  } catch (e) {
    console.error("Failed to query MarketplaceByPurchase", e);
    return Promise.reject(e);
  }
};
