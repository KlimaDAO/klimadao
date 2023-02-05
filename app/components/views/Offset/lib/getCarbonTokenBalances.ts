export type BalanceAttribute =
  | "balanceBCT"
  | "balanceNCT"
  | "balanceUBO"
  | "balanceNBO";

export interface CarbonProject {
  id: string;
  tokenAddress: string;
  projectID: string; // starts with 'VCS-' if registry is "Verra"
  name: string;
  country: string;
  region: string;
  vintage: string;
  vintageYear: string;
  methodology: string;
  methodologyCategory: string;
  category: string;
  currentSupply: number;
  bridge: string;
  balanceBCT: string;
  balanceNCT: string;
  balanceUBO: string;
  balanceNBO: string;
}

export interface GetCarbonTokenBalances {
  data: {
    account: any;
  };
}

export const getCarbonTokenBalances = async (
  address: string
): Promise<CarbonProject[]> => {
  try {
    const result = await fetch(
      "https://api.thegraph.com/subgraphs/name/cujowolf/klima-refi-current-holdings",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
          query {
            account(id: "${address}") {
                id
                holdings {
                  id
                  token {
                    symbol
                    name
                  }
                }
            }
          }
          `,
        }),
      }
    );
    if (!result.ok) {
      const { message, name } = await result.json();
      const e = new Error(message);
      e.name = name;
    }
    const json: any = await result.json();
    console.log(json.data.account);
    return json.data.account;
  } catch (e) {
    console.error("Failed to query GetCarbonTokenBalances", e);
    return Promise.reject(e);
  }
};
