import { subgraphs } from "./constants";

export interface CarbonToken {
  amount: string;
  id: string;
  token: {
    decimals: number;
    id: string;
    name: string;
    symbol: string;
  };
}

export const queryUserCarbonTokens = async (
  address: string
): Promise<Array<CarbonToken>> => {
  const variables = {
    address: address.toLowerCase(),
  };
  const query = `
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
  `;
  const body = JSON.stringify({
    variables,
    query,
  });
  const res = await fetch(subgraphs.polygonBridgedCarbon, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const json: { data: { account: { holdings: Array<CarbonToken> } } } =
    await res.json();
  if (
    !res.ok ||
    !json.data ||
    !json.data.account ||
    !json.data.account.holdings
  )
    throw new Error(JSON.stringify(json));
  return json.data.account.holdings;
};
