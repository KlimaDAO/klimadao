import { t } from "@lingui/macro";
import { Chain, DateFilteringOption, Pool, Status } from "./types";

/** An option */
export interface Option<T> {
  /** label of the option */
  label: string;
  /** value of the option */
  value: T;
}
export type Options<T> = Array<Option<T>>;
export type OptionChangeHandler<T> = (value: T) => undefined | void;

/** Return options for credits bridges switcher widgets */
export function getCreditsBridgeOptions(): Options<"onchain" | "offchain"> {
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
}

/** Return options for credits statuses switcher widgets */
export function getCreditsStatusOptions(): Options<Status> {
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
}

/** Return options for chain (ommiting celo) switcher widgets */
export function getChainsOptionsWithoutCelo(): Options<Chain> {
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
}

/** Return options for chain switcher widgets */
export function getChainsOptions(): Options<Chain> {
  const options = getChainsOptionsWithoutCelo();
  options.push({
    label: t`Celo`,
    value: "celo",
  });
  return options;
}

/** Returns options for chain switcher widgets */
export function getC3PoolsOptions(): Options<Pool> {
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
}

/** Returns options for chain switcher widgets */
export function getToucanPoolsOptions(): Options<Pool> {
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
}

/** Returns options for pool statuses widgets */
export function getPoolStatusOptions(): Options<Status> {
  return [
    {
      label: t`Bridged`,
      value: "bridged",
    },
    {
      label: t`Retired`,
      value: "retired",
    },
  ];
}

/** Returns options for pool date filtering widgets */
export function getDateFilteringOptions(): Options<DateFilteringOption> {
  return [
    {
      label: t`Lifetime`,
      value: "lifetime",
    },
    {
      label: t`Last 30 days`,
      value: "last30d",
    },
    {
      label: t`Last 7 days`,
      value: "last7d",
    },
  ];
}
