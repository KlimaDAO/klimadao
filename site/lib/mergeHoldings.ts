import { Holding } from "components/pages/Pledge/types";
import { Dictionary, groupBy } from "lodash";

// merge holdings of multiple wallets
export const mergeHoldings = (holdings: Holding[][]) => {
  const groupedHoldings = groupHoldings(holdings);
  const calculatedChangeHoldings = calculateChange(groupedHoldings);
  const mergedHoldings = calculateTokenValues(calculatedChangeHoldings);
  return mergedHoldings;
};

// group each wallets holdings by token
export const groupHoldings = (holdings: Holding[][]) =>
  holdings.map((holding: Holding[]) => groupBy(holding, "token"));

// map through each token, sort by timestamp and calculate the token value change
export const calculateChange = (groupedHoldings: Dictionary<Holding[]>[]) => {
  const value = groupedHoldings.map((groupsObj) =>
    Object.values(groupsObj).map((groupArray) =>
      groupArray.map((holding, index) => {
        if (index === 0) {
          return {
            ...holding,
            change: Number(holding.tokenAmount),
          };
        } else {
          return {
            ...holding,
            change:
              Number(holding.tokenAmount) -
              Number(groupArray[index - 1].tokenAmount),
          };
        }
      })
    )
  );
  return value.flat();
};

// merge all holdings, sort by timestamp, sort by token, calculate new token value based on change value
export const calculateTokenValues = (
  holdings: {
    change: number;
    id: string;
    timestamp: string;
    token: string;
    tokenAmount: string;
    carbonValue: string;
  }[][]
) => {
  const sortedHoldings = holdings
    .flat()
    .sort((a, b) => Number(a.timestamp) - Number(b.timestamp));
  let tokenCount = 0;
  const values = Object.values(groupBy(sortedHoldings, "token")).map(
    (holdings) =>
      holdings.map((holding, index) => {
        if (index === 0) {
          tokenCount = Number(holding.tokenAmount);
          // we dont spread holding here to get rid of change key/value
          return {
            id: holding.id,
            timestamp: holding.timestamp,
            token: holding.token,
            tokenAmount: holding.change.toString(),
            carbonValue: holding.change.toString(),
          };
        } else {
          const newHolding = {
            id: holding.id,
            timestamp: holding.timestamp,
            token: holding.token,
            tokenAmount: (tokenCount + holding.change).toString(),
            carbonValue: (tokenCount + holding.change).toString(),
          };
          tokenCount += holding.change;
          return newHolding;
        }
      })
  );
  return groupBy(values.flat(2), "token");
};
