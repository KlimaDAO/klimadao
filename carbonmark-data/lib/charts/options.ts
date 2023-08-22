import { t } from "@lingui/macro";
import { Key } from "react";
import { ChartMappingParams, CreditsQueryParams } from "./types";

// An option
export interface Option<T> {
    // label of the option
    label: string;
    // value of the option
    value: Key;
}
export type Options<T> = Array<Option<T>>;
export type OptionChangeHandler = (value: Key) => undefined | void;

export type CreditsChartQueryParams = CreditsQueryParams & ChartMappingParams;

export const getCreditsBridgeOptions: () => Options<CreditsChartQueryParams> = () => {
    return [{
        label: t`Off-chain`,
        value: "offchain",
    },
    {
        label: t`On-chain`,
        value: "onchain",
    }]
}
// Find an Option from an array of options
export const selectOption = <T>(options: Options<T>, value: Key): Option<T> | undefined => {
    return options.find(option => option.value == value);
}
export const getCreditsQBridgeOptions = (value: Key): Option<CreditsChartQueryParams> | undefined => {
    return selectOption(getCreditsBridgeOptions(), value);
}