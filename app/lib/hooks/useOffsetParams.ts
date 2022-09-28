import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  OffsetInputToken,
  offsetInputTokens,
  RetirementToken,
  retirementTokens,
} from "@klimadao/lib/constants";

const inputParams = [
  "quantity",
  "inputToken",
  "retirementToken",
  "beneficiary",
  "beneficiaryAddress",
  "message",
  "projectTokens",
] as const;

interface OffsetParams {
  quantity?: string;
  inputToken?: OffsetInputToken;
  retirementToken?: RetirementToken;
  beneficiary?: string;
  beneficiaryAddress?: string;
  message?: string;
  projectTokens?: string;
}

/** Type guard to correctly infer the typed string e.g. "mco2" | "bct" */
const isValidToken = <T extends readonly string[]>(
  str: string,
  arr: T
): str is T[number] => arr.includes(str);

/**
 * For the Offset view in the app. On mount, validates, extracts and strips the search params from the url and returns them as a typed object.
 * @example http://app.klimadao.finance/#/offset
 *   ?quantity=123
 *   &inputToken=klima
 *   &retirementToken=mco2
 *   &projectTokens=0x1234
 *   &beneficiary=The%20Devs
 *   &beneficiaryAddress=0x123
 *   &message=Thanks%20devs!
 * */
export const useOffsetParams = (): OffsetParams => {
  const [params, setParams] = useSearchParams();
  const [state, setState] = useState<OffsetParams>({});

  useEffect(() => {
    const data: OffsetParams = {};
    inputParams.forEach((param) => {
      if (param === "projectTokens") {
        const projectTokens = params.get("projectTokens");
        data.projectTokens = projectTokens ? projectTokens : undefined;
      } else if (param === "inputToken") {
        const tkn = params.get("inputToken")?.toLowerCase() || undefined;
        data[param] =
          tkn && isValidToken(tkn, offsetInputTokens) ? tkn : undefined;
      } else if (param === "retirementToken") {
        const tkn = params.get("retirementToken")?.toLowerCase() || undefined;
        data[param] =
          tkn && isValidToken(tkn, retirementTokens) ? tkn : undefined;
      } else {
        data[param] = params.get(param) || undefined;
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
