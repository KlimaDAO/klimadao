import { ethers, providers } from "ethers";

import { addresses } from "../../constants";
import IERC20 from "../../abi/IERC20.json";
import WSKLIMA from "../../abi/wsKlima.json";
import DistributorContractv4 from "../../abi/DistributorContractv4.json";
import PunkTLD from "../../abi/PunkTLD.json";
import PairContract from "../../abi/PairContract.json";

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
  wsklima: WSKLIMA.abi,
  pklima: IERC20.abi,

  // USDC
  usdc: IERC20.abi,

  // Others
  distributor: DistributorContractv4.abi,
  klimaNameService: PunkTLD.abi,
  bctUsdcLp: PairContract.abi,
  klimaBctLp: PairContract.abi,
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
