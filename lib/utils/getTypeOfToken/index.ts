import { addresses, RetirementToken } from "../../constants";

const { mainnet } = addresses;

export const getTypeofTokenByAddress = (
  tokenAddress: string
): RetirementToken =>
  Object.keys(mainnet).find(
    (key) => mainnet[key as RetirementToken] === tokenAddress.toLowerCase()
  ) as RetirementToken;
