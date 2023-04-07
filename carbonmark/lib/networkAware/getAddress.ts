import { addresses } from "@klimadao/lib/constants";
import { DEFAULT_NETWORK } from "lib/constants";

/** Grab an address based on the given `network` parameter, fallback to DEFAULT_NETWORK */
export const getAddress = (
  name: keyof typeof addresses.mainnet,
  network?: "testnet" | "mainnet"
): string => {
  return addresses[network ?? DEFAULT_NETWORK][name];
};
