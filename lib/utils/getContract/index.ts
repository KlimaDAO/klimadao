import { ethers, providers, Signer } from "ethers";

import { addresses } from "../../constants";
import IERC20 from "../../abi/IERC20.json";
import WSKLIMA from "../../abi/wsKlima.json";
import DistributorContractv4 from "../../abi/DistributorContractv4.json";
import PunkTLD from "../../abi/PunkTLD.json";
import PairContract from "../../abi/PairContract.json";
import KlimaRetirementAggregator from "../../abi/KlimaRetirementAggregator.json";
import ExercisePKlima from "../../abi/ExercisepKLIMA.json";
import KlimaStakingHelper from "../../abi/KlimaStakingHelper.json";
import KlimaStakingv2 from "../../abi/KlimaStakingv2.json";
import KlimaRetirementStorage from "../../abi/KlimaRetirementStorage.json";

type ContractName = keyof typeof addresses["mainnet"];
type ContractMap = {
  [K in ContractName]: typeof IERC20["abi"] | typeof KlimaStakingHelper["abi"];
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
  retirementAggregator: KlimaRetirementAggregator.abi,
  pklima_exercise: ExercisePKlima.abi,
  staking_helper: KlimaStakingHelper.abi,
  staking: KlimaStakingv2.abi,
  retirementStorage: KlimaRetirementStorage.abi,
} as ContractMap;

export const getContractAbiByName = (name: ContractName) => {
  return contractMap[name as keyof ContractMap];
};

export const getContract = (params: {
  contractName: ContractName;
  provider: providers.JsonRpcProvider | Signer;
}): ethers.Contract => {
  const abi = getContractAbiByName(params.contractName);
  if (!abi)
    throw new Error(`Unknown abi for contractName: ${params.contractName}`);
  return new ethers.Contract(
    addresses["mainnet"][params.contractName],
    abi,
    params.provider
  );
};
