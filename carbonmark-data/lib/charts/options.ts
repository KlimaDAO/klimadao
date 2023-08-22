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

export const getCreditsBridgeOptions: () => Options = () => {
  return [
    {
      label: t`Off-chain`,
      value: "offchain",
    },
    {
      label: t`On-chain`,
      value: "onchain",
    },
  ];
};
