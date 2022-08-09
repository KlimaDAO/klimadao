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
import SKlima from "../../abi/sKlima.json";

type Address = keyof typeof addresses["mainnet"];
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
  pklima: IERC20.abi,
  wsklima: WSKLIMA.abi,

  // USDC
  usdc: IERC20.abi,

  // Main Contracts
  sklimaMain: SKlima.abi,

  // PairContracts
  bctUsdcLp: PairContract.abi,
  klimaBctLp: PairContract.abi,
  klimaUboLp: PairContract.abi,
  klimaNboLp: PairContract.abi,
  klimaUsdcLp: PairContract.abi,
  klimaMco2Lp: PairContract.abi,

  // Others
  distributor: DistributorContractv4.abi,
  klimaNameService: PunkTLD.abi,
  retirementAggregator: KlimaRetirementAggregator.abi, // offset
  pklima_exercise: ExercisePKlima.abi,
  staking_helper: KlimaStakingHelper.abi, // stake
  staking: KlimaStakingv2.abi, // unstake
  retirementStorage: KlimaRetirementStorage.abi,
} as const;
type ContractName = keyof typeof contractMap;

export const isNameInAddresses = (name: string): boolean => {
  const keys = Object.keys(
    addresses.mainnet
  ) as (keyof typeof addresses["mainnet"])[];
  return keys.includes(name as keyof typeof addresses["mainnet"]);
};

const getContractAbiByName = (name: ContractName) => {
  return contractMap[name as keyof ContractMap];
};

export const getContract = (params: {
  contractName: ContractName;
  provider: providers.JsonRpcProvider | Signer;
}): ethers.Contract => {
  const abi = getContractAbiByName(params.contractName);
  if (!abi)
    throw new Error(`Unknown abi for contractName: ${params.contractName}`);

  const nameInAddresses = params.contractName.replace("Main", "") as Address;
  if (!isNameInAddresses(nameInAddresses)) {
    throw new Error(`Unknown contract name in mainnet: ${nameInAddresses}`);
  }

  return new ethers.Contract(
    addresses["mainnet"][nameInAddresses],
    abi,
    params.provider
  );
};
