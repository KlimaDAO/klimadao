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

// Return options for chain (ommiting celo) switcher widgets
export const getChainsOptionsWithoutCelo: () => Options = () => {
  return [
    {
      label: t`Polygon`,
      value: "polygon",
    },
    {
      label: t`Ethereum`,
      value: "eth",
    },
  ];
};

// Return options for chain switcher widgets
export const getChainsOptions: () => Options = () => {
  const options = getChainsOptionsWithoutCelo();
  options.push({
    label: t`Celo`,
    value: "celo",
  });
  return options;
};

// Return options for chain switcher widgets
export const getC3TokensOptions: () => Options = () => {
  return [
    {
      label: t`All Tokens`,
      value: "all",
    },
    {
      label: t`UBO`,
      value: "ubo",
    },
    {
      label: t`NBO`,
      value: "nbo",
    },
  ];
};

// Return options for chain switcher widgets
export const getToucanTokensOptions: () => Options = () => {
  return [
    {
      label: t`All Tokens`,
      value: "all",
    },
    {
      label: t`BCT`,
      value: "bct",
    },
    {
      label: t`NCT`,
      value: "nct",
    },
  ];
};
