import { ContractReceipt, utils } from "ethers";

export const getRetirementIndexFromReceipt = (
  receipt: ContractReceipt
): string => {
  const abi = ["event SingleOffsetIndex(uint index)"];
  const Interface = new utils.Interface(abi);
  const { args } = Interface.parseLog(receipt.logs[0]);
  return args[0];
};
