import { Holding } from "components/pages/Pledge/types";
import { Dictionary } from "lodash";
import {
  calculateChange,
  calculateTokenValues,
  groupHoldings,
  mergeHoldings,
} from "./mergeHoldings";
import {
  calculatedGroupedHoldingsDecreasing,
  calculatedGroupedHoldingsIncreasing,
  expectedOutputDecreasing,
  expectedOutputIncreasing,
  expectedOutputLargeNumber,
  groupedHoldingsDecreasing,
  groupedHoldingsIncreasing,
  holdingsInputDecreasing,
  holdingsInputIncreasing,
  holdingsInputLargeNumber,
} from "./testFixtures";

describe("groupHoldings", () => {
  it("Groups 2 holdings arrays of BCT and NCT", () => {
    expect(groupHoldings(holdingsInputIncreasing as Holding[][])).toStrictEqual(
      groupedHoldingsIncreasing
    );
  });
});

describe("calculateChange", () => {
  it("calculates the value change from sorted holdings increasing", () => {
    expect(
      calculateChange(
        groupedHoldingsIncreasing as unknown as Dictionary<Holding[]>[]
      )
    ).toStrictEqual(calculatedGroupedHoldingsIncreasing);
  });
  it("calculates the value change from sorted holdings decreasing", () => {
    expect(
      calculateChange(
        groupedHoldingsDecreasing as unknown as Dictionary<Holding[]>[]
      )
    ).toStrictEqual(calculatedGroupedHoldingsDecreasing);
  });
});

describe("calculateTokenValues", () => {
  it("merges all increasing value holdings and calculates new values based on change", () => {
    expect(
      calculateTokenValues(
        calculatedGroupedHoldingsIncreasing as {
          change: number;
          id: string;
          timestamp: string;
          token: string;
          tokenAmount: string;
          carbonValue: string;
        }[][]
      )
    ).toStrictEqual(expectedOutputIncreasing);
  });
  it("merges increasing and decreasing holdings and calculates new values based on change", () => {
    expect(
      calculateTokenValues(
        calculatedGroupedHoldingsDecreasing as {
          change: number;
          id: string;
          timestamp: string;
          token: string;
          tokenAmount: string;
          carbonValue: string;
        }[][]
      )
    ).toStrictEqual(expectedOutputDecreasing);
  });
});

describe("mergeHoldings", () => {
  test("merge holdings functions together", () => {
    expect(mergeHoldings(holdingsInputIncreasing as Holding[][])).toStrictEqual(
      expectedOutputIncreasing
    );
  });
  test("merge holdings functions together with decreasing values", () => {
    expect(mergeHoldings(holdingsInputDecreasing as Holding[][])).toStrictEqual(
      expectedOutputDecreasing
    );
  });
  test("merge holdings mergines weird with big decimals", () => {
    expect(
      mergeHoldings(holdingsInputLargeNumber as Holding[][])
    ).toStrictEqual(expectedOutputLargeNumber);
  });
});
