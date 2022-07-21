import { BigNumber } from "ethers";
import { allowancesContracts } from "../constants";

export type AllowancesSpender = keyof typeof allowancesContracts;
export type AllowancesToken =
  typeof allowancesContracts[keyof typeof allowancesContracts][number];
export type AllowancesSpenderWithTokens = {
  [K in AllowancesSpender]: AllowancesToken[];
};
// final Allowances
export type Allowances = {
  [key in AllowancesToken]: {
    [key in AllowancesSpender]: BigNumber;
  };
};
export type AllowancesFormatted = {
  [key in AllowancesToken]: {
    [key in AllowancesSpender]: string;
  };
};
