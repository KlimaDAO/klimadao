import { t } from "@lingui/macro";
import { Key } from "react";

// An option
export interface Option {
  // label of the option
  label: string;
  // value of the option
  value: Key;
}
export type Options = Array<Option>;
export type OptionChangeHandler = (value: Key) => undefined | void;

// Return options for credits bridges switcher widgets
export const getCreditsBridgeOptions: () => Options = () => {
  return [
    {
      label: t`On-chain`,
      value: "onchain",
    },
    {
      label: t`Off-chain`,
      value: "offchain",
    },
  ];
};

// Return options for credits statuses switcher widgets
export const getCreditsStatusOptions: () => Options = () => {
  return [
    {
      label: t`Issued`,
      value: "issued",
    },
    {
      label: t`Retired`,
      value: "retired",
    },
  ];
};

// Return options for chain switcher widgets
export const getChainsOptions: () => Options = () => {
  return [
    {
      label: "Polygon",
      value: "polygon",
    },
    {
      label: "Ethereum",
      value: "eth",
    },
    {
      label: "Celo",
      value: "celo",
    },
  ];
};
