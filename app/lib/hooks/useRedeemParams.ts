import { utils } from "ethers";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export type RedeemablePoolToken = "bct" | "nct" | "ubo" | "nbo";
export const redeemablePoolTokens: RedeemablePoolToken[] = [
  "bct",
  "nct",
  "ubo",
  "nbo",
];

export type RedeemPaymentMethod = RedeemablePoolToken | "klima" | "usdc";
export const redeemPaymentMethods: RedeemPaymentMethod[] = [
  ...redeemablePoolTokens,
  "klima",
  "usdc",
];

type CompatMap = { [token in RedeemPaymentMethod]: RedeemablePoolToken[] };
export const redeemCompatability: CompatMap = {
  ubo: ["ubo"],
  nbo: ["nbo"],
  bct: ["bct"],
  nct: ["nct"],
  usdc: ["bct", "nct", "ubo", "nbo"],
  klima: ["bct", "nct", "ubo", "nbo"],
};

const inputParams = [
  "quantity",
  "pool",
  "projectTokenAddress",
  "paymentMethod",
] as const;

export interface RedeemParams {
  quantity?: string;
  pool?: RedeemablePoolToken;
  projectTokenAddress?: string;
  paymentMethod?: RedeemPaymentMethod;
}

/** Type guard to correctly infer the typed string e.g. "mco2" | "bct" */
const isValidToken = <T extends readonly string[]>(
  str: string,
  arr: T
): str is T[number] => arr.includes(str);

/**
 * For the Redeem view in the app. On mount, validates, extracts and strips the search params from the url and returns them as a typed object.
 * @example http://app.klimadao.finance/#/redeem
 *   ?quantity=123
 *   &pool=bct
 *   &projectTokenAddress=0x12341234
 *   &paymentMethod=usdc
 * */
export const useRedeemParams = (): RedeemParams => {
  const [params, setParams] = useSearchParams();
  const [state, setState] = useState<RedeemParams>({});

  useEffect(() => {
    const data: RedeemParams = {};
    inputParams.forEach((param) => {
      if (param === "pool") {
        const pool = params.get("pool")?.toLowerCase() || undefined;
        data[param] =
          pool && isValidToken(pool, redeemablePoolTokens) ? pool : undefined;
      } else if (param === "paymentMethod") {
        const method = params.get("paymentMethod")?.toLowerCase() || undefined;
        data[param] =
          method && isValidToken(method, redeemPaymentMethods)
            ? method
            : undefined;
      } else if (param === "projectTokenAddress") {
        const tkn =
          params.get("projectTokenAddress")?.toLowerCase() || undefined;
        data[param] = tkn && utils.isAddress(tkn) ? tkn : undefined;
      } else if (param === "quantity") {
        const quantity = params.get(param);
        data[param] = quantity && Number(quantity) ? quantity : undefined;
      }
    });

    // set state to trigger re-render in parent component
    setState(data);
    // strip the params from the browser url
    const strippedParams = Object.fromEntries(params.entries());
    for (const key of inputParams) {
      delete strippedParams[key];
    }
    setParams(strippedParams);
  }, []);
  return state;
};
