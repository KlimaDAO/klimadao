import { ethers } from "ethers";

// contract methods return this address on not found
const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";

export const getIsValidAddress = (address: string) => {
  return (
    !!address && address !== EMPTY_ADDRESS && ethers.utils.isAddress(address)
  );
};
