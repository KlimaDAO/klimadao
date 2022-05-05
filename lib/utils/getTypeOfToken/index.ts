import { addresses, InputToken } from "../../constants";

const { mainnet } = addresses;

export const getTypeofTokenByAddress = (
  tokenAddress: string
): InputToken | undefined =>
  Object.keys(mainnet).find(
    (key) => mainnet[key as InputToken] === tokenAddress.toLowerCase()
  ) as InputToken;
