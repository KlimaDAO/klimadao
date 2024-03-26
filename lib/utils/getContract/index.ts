import { Contract, providers, Signer } from "ethers";

import Carbonmark from "../../abi/Carbonmark.json";
import DistributorContractv4 from "../../abi/DistributorContractv4.json";
import ExercisePKlima from "../../abi/ExercisepKLIMA.json";
import IERC20 from "../../abi/IERC20.json";
import Depository from "../../abi/KlimaBondDepository_Regular.json";
import KlimaInfinity from "../../abi/KlimaInfinity.json";
import KlimaProV2 from "../../abi/KlimaProV2.json";
import KlimaRetirementAggregatorV2 from "../../abi/KlimaRetirementAggregatorV2.json";
import KlimaRetirementStorage from "../../abi/KlimaRetirementStorage.json";
import KlimaStakingHelper from "../../abi/KlimaStakingHelper.json";
import KlimaStakingv2 from "../../abi/KlimaStakingv2.json";
import OhmDai from "../../abi/OhmDai.json";
import PunkTLD from "../../abi/PunkTLD.json";
import SKlima from "../../abi/sKlima.json";
import WSKLIMA from "../../abi/wsKlima.json";
import { addresses } from "../../constants";

type Address = keyof (typeof addresses)["mainnet"];
type ContractMap = {
  [K in ContractName]:
    | (typeof IERC20)["abi"]
    | (typeof KlimaStakingHelper)["abi"];
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

  // USDC.e
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
  retirementAggregatorV2: KlimaRetirementAggregatorV2.abi, // offset
  pklima_exercise: ExercisePKlima.abi,
  staking_helper: KlimaStakingHelper.abi, // stake
  staking: KlimaStakingv2.abi, // unstake
  retirementStorage: KlimaRetirementStorage.abi,
  carbonmark: Carbonmark.abi,
  klimaInfinity: KlimaInfinity.abi,
} as const;
type ContractName = keyof typeof contractMap;

export const isNameInAddresses = (name: string): boolean => {
  const keys = Object.keys(
    addresses.mainnet
  ) as (keyof (typeof addresses)["mainnet"])[];
  return keys.includes(name as keyof (typeof addresses)["mainnet"]);
};

const getContractAbiByName = (name: ContractName) => {
  return contractMap[name as keyof ContractMap];
};

export const getContract = (params: {
  contractName: ContractName;
  provider: providers.BaseProvider | providers.JsonRpcProvider | Signer;
  network?: "testnet" | "mainnet";
}): Contract => {
  const { network = "mainnet" } = params;
  const abi = getContractAbiByName(params.contractName);
  if (!abi)
    throw new Error(`Unknown abi for contractName: ${params.contractName}`);

  const nameInAddresses = params.contractName.replace("Main", "") as Address;
  if (!isNameInAddresses(nameInAddresses)) {
    throw new Error(`Unknown contract name: ${nameInAddresses}`);
  }

  return new Contract(
    addresses[network][nameInAddresses],
    abi,
    params.provider
  );
};
