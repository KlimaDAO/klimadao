import { ethers, providers } from "ethers";

import { addresses } from "../../constants";
import IERC20 from "../../abi/IERC20.json";

type Token = keyof typeof addresses["mainnet"];
type ContractMap = {
  [K in Token]: typeof IERC20["abi"] | typeof WSKLIMA["abi"];
};
const contractMap = {
  // CARBON
  bct: IERC20.abi,
  mco2: IERC20.abi,
  nct: IERC20.abi,
  ubo: IERC20.abi,
  nbo: IERC20.abi,

  // KLIMA
  klima: IERC20.abi,
  sklima: IERC20.abi,
  pklima: IERC20.abi,

  // USDC
  usdc: IERC20.abi,
} as ContractMap;

export const getContractAbiByToken = (token: Token) => {
  return contractMap[token as keyof ContractMap];
};

export const getContractByToken = (params: {
  token: Token;
  provider: providers.JsonRpcProvider;
}): ethers.Contract => {
  const abi = getContractAbiByToken(params.token);
  if (!abi) throw new Error(`Unknown abi for token: ${params.token}`);
  return new ethers.Contract(
    addresses["mainnet"][params.token],
    abi,
    params.provider
  );
};
