import { ContractReceipt, utils } from "ethers";

/** The first event is USDC transfer from wallet to aggregator */
export const getRetirementIndexFromReceipt = (
  receipt: ContractReceipt
): string => {
  const abi = ["event Retirement(uint value)"];
  const Interface = new utils.Interface(abi);
  const { args } = Interface.parseLog(receipt.logs[0]);
  return args[0];
};
