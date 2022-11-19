import { Contract, providers, Signer } from "ethers";

import { addresses } from "../../constants";
import IERC20 from "../../abi/IERC20.json";
import WSKLIMA from "../../abi/wsKlima.json";
import DistributorContractv4 from "../../abi/DistributorContractv4.json";
import PunkTLD from "../../abi/PunkTLD.json";
import KlimaRetirementAggregator from "../../abi/KlimaRetirementAggregator.json";
import ExercisePKlima from "../../abi/ExercisepKLIMA.json";
import KlimaStakingHelper from "../../abi/KlimaStakingHelper.json";
import KlimaStakingv2 from "../../abi/KlimaStakingv2.json";
import KlimaRetirementStorage from "../../abi/KlimaRetirementStorage.json";
import SKlima from "../../abi/sKlima.json";
import OhmDai from "../../abi/OhmDai.json";
import Depository from "../../abi/KlimaBondDepository_Regular.json";
import KlimaProV2 from "../../abi/KlimaProV2.json";

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

  // Bonds Tokens
  klimaBctLp: OhmDai.abi,
  klimaUsdcLp: OhmDai.abi,
  bctUsdcLp: OhmDai.abi,
  klimaMco2Lp: OhmDai.abi,

  // Bonds Inverse
  klimaProV2: KlimaProV2.abi,

  // Bonds Contracts
  bond_klimaBctLp: Depository.abi,
  bond_klimaUsdcLp: Depository.abi,
  bond_klimaMco2Lp: Depository.abi,
  bond_mco2: Depository.abi,
  bond_bct: Depository.abi,
  bond_nbo: Depository.abi,
  bond_ubo: Depository.abi,

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
}): Contract => {
  const abi = getContractAbiByName(params.contractName);
  if (!abi)
    throw new Error(`Unknown abi for contractName: ${params.contractName}`);

  const nameInAddresses = params.contractName.replace("Main", "") as Address;
  if (!isNameInAddresses(nameInAddresses)) {
    throw new Error(`Unknown contract name in mainnet: ${nameInAddresses}`);
  }

  return new Contract(
    addresses["mainnet"][nameInAddresses],
    abi,
    params.provider
  );
};
