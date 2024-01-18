import { constants } from "ethers";

// if allowance is maximum allowance displays "Maximum allowance of tonnes"
// if allowance is greater than 10 millionit displays in scientific notation
// else just the allowance is shown

export const formatAllowanceDisplay = (allowance: string) => {
  if (allowance === constants.MaxUint256.toString()) {
    return "Maximum allowance of tonnes";
  } else if (Number(allowance) > 10000000) {
    return `${Number(allowance).toExponential(2)} tonnes`;
  } else {
    return `${allowance} tonnes`;
  }
};
