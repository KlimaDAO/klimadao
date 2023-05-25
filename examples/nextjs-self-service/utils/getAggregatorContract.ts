import { Contract, ContractRunner } from "ethers";
import KlimaRetirementAggregatorV2 from "../abis/KlimaRetirementAggregatorV2.json";
import { getContractInfo } from "./getContractInfo";
import { getStaticProvider } from "./getStaticProvider";

/**
 * In order to interact with an on-chain smart contract
 * Ether's needs to know the contract address, and the Application Binary Interface (ABI) which defines known methods for read and write.
 * Finally, the Provider is the connection to the blockchain via an RPC node (polygon-rpc.com in this case).
 */
export const getAggregatorContract = (provider?: ContractRunner) => {
  return new Contract(
    getContractInfo("klimaRetirementAggregatorV2").address,
    KlimaRetirementAggregatorV2.abi,
    provider ?? getStaticProvider()
  );
};
