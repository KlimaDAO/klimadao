import { Holding } from "components/pages/Pledge/types";
import {
  calculateChange,
  calculateTokenValues,
  groupHoldings,
  mergeHoldings,
} from "./mergeHoldings";

const holdingsInput: Holding[][] = [
  [
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "1",
      token: "BCT",
      tokenAmount: "1",
      carbonValue: "1",
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "3",
      token: "BCT",
      tokenAmount: "2",
      carbonValue: "2",
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "5",
      token: "BCT",
      tokenAmount: "3",
      carbonValue: "3",
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "7",
      token: "NCT",
      tokenAmount: "1",
      carbonValue: "1",
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "9",
      token: "NCT",
      tokenAmount: "2",
      carbonValue: "2",
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "11",
      token: "NCT",
      tokenAmount: "3",
      carbonValue: "3",
    },
  ],
  [
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-BCT-1674777600",
      timestamp: "4",
      token: "BCT",
      tokenAmount: "2",
      carbonValue: "2",
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-BCT-1674777600",
      timestamp: "6",
      token: "BCT",
      tokenAmount: "3",
      carbonValue: "3",
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "8",
      token: "NCT",
      tokenAmount: "1",
      carbonValue: "1",
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "10",
      token: "NCT",
      tokenAmount: "2",
      carbonValue: "2",
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "12",
      token: "NCT",
      tokenAmount: "3",
      carbonValue: "3",
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "14",
      token: "NCT",
      tokenAmount: "4",
      carbonValue: "4",
    },
  ],
];

const groupedHoldings = [
  {
    BCT: [
      {
        id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
        timestamp: "1",
        token: "BCT",
        tokenAmount: "1",
        carbonValue: "1",
      },
      {
        id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
        timestamp: "3",
        token: "BCT",
        tokenAmount: "2",
        carbonValue: "2",
      },
      {
        id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
        timestamp: "5",
        token: "BCT",
        tokenAmount: "3",
        carbonValue: "3",
      },
    ],
    NCT: [
      {
        id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
        timestamp: "7",
        token: "NCT",
        tokenAmount: "1",
        carbonValue: "1",
      },
      {
        id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
        timestamp: "9",
        token: "NCT",
        tokenAmount: "2",
        carbonValue: "2",
      },
      {
        id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
        timestamp: "11",
        token: "NCT",
        tokenAmount: "3",
        carbonValue: "3",
      },
    ],
  },
  {
    BCT: [
      {
        id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-BCT-1674777600",
        timestamp: "4",
        token: "BCT",
        tokenAmount: "2",
        carbonValue: "2",
      },
      {
        id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-BCT-1674777600",
        timestamp: "6",
        token: "BCT",
        tokenAmount: "3",
        carbonValue: "3",
      },
    ],
    NCT: [
      {
        id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
        timestamp: "8",
        token: "NCT",
        tokenAmount: "1",
        carbonValue: "1",
      },
      {
        id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
        timestamp: "10",
        token: "NCT",
        tokenAmount: "2",
        carbonValue: "2",
      },
      {
        id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
        timestamp: "12",
        token: "NCT",
        tokenAmount: "3",
        carbonValue: "3",
      },
      {
        id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
        timestamp: "14",
        token: "NCT",
        tokenAmount: "4",
        carbonValue: "4",
      },
    ],
  },
];

const calculatedGroupedHoldings = [
  [
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "1",
      token: "BCT",
      tokenAmount: "1",
      carbonValue: "1",
      change: 1,
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "3",
      token: "BCT",
      tokenAmount: "2",
      carbonValue: "2",
      change: 1,
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "5",
      token: "BCT",
      tokenAmount: "3",
      carbonValue: "3",
      change: 1,
    },
  ],
  [
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "7",
      token: "NCT",
      tokenAmount: "1",
      carbonValue: "1",
      change: 1,
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "9",
      token: "NCT",
      tokenAmount: "2",
      carbonValue: "2",
      change: 1,
    },
    {
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "11",
      token: "NCT",
      tokenAmount: "3",
      carbonValue: "3",
      change: 1,
    },
  ],
  [
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-BCT-1674777600",
      timestamp: "4",
      token: "BCT",
      tokenAmount: "2",
      carbonValue: "2",
      change: 2,
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-BCT-1674777600",
      timestamp: "6",
      token: "BCT",
      tokenAmount: "3",
      carbonValue: "3",
      change: 1,
    },
  ],
  [
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "8",
      token: "NCT",
      tokenAmount: "1",
      carbonValue: "1",
      change: 1,
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "10",
      token: "NCT",
      tokenAmount: "2",
      carbonValue: "2",
      change: 1,
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "12",
      token: "NCT",
      tokenAmount: "3",
      carbonValue: "3",
      change: 1,
    },
    {
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "14",
      token: "NCT",
      tokenAmount: "4",
      carbonValue: "4",
      change: 1,
    },
  ],
];

const expectedOutput = {
  BCT: [
    {
      carbonValue: "1",
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "1",
      token: "BCT",
      tokenAmount: "1",
    },
    {
      carbonValue: "2",
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "3",
      token: "BCT",
      tokenAmount: "2",
    },
    {
      carbonValue: "4",
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-BCT-1674777600",
      timestamp: "4",
      token: "BCT",
      tokenAmount: "4",
    },
    {
      carbonValue: "5",
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-BCT-1674777600",
      timestamp: "5",
      token: "BCT",
      tokenAmount: "5",
    },
    {
      carbonValue: "6",
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-BCT-1674777600",
      timestamp: "6",
      token: "BCT",
      tokenAmount: "6",
    },
  ],
  NCT: [
    {
      carbonValue: "1",
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "7",
      token: "NCT",
      tokenAmount: "1",
    },
    {
      carbonValue: "2",
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "8",
      token: "NCT",
      tokenAmount: "2",
    },
    {
      carbonValue: "3",
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "9",
      token: "NCT",
      tokenAmount: "3",
    },
    {
      carbonValue: "4",
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "10",
      token: "NCT",
      tokenAmount: "4",
    },
    {
      carbonValue: "5",
      id: "0xdeb8c24ad9640d62334da6f30c191e9cfd180e5b-NCT-1674777600",
      timestamp: "11",
      token: "NCT",
      tokenAmount: "5",
    },
    {
      carbonValue: "6",
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "12",
      token: "NCT",
      tokenAmount: "6",
    },
    {
      carbonValue: "7",
      id: "0x838cd36c38e64c166b2c5130d15a8acff1e09d44-NCT-1674777600",
      timestamp: "14",
      token: "NCT",
      tokenAmount: "7",
    },
  ],
};

export const holdingsTest = test("setup", () => {
  expect(groupHoldings(holdingsInput)).toStrictEqual(groupedHoldings);
  expect(calculateChange(groupedHoldings)).toStrictEqual(
    calculatedGroupedHoldings
  );
  expect(calculateTokenValues(calculatedGroupedHoldings)).toStrictEqual(
    expectedOutput
  );
  expect(mergeHoldings(holdingsInput)).toStrictEqual(expectedOutput);
});
