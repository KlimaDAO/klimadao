import { addresses } from "@klimadao/lib/constants";
import { config } from "lib/constants";

/** Grab an address based on the given `network` parameter, fallback to config.defaultNetwork */
export const getAddress = (
  name: keyof typeof addresses.mainnet,
  network?: "testnet" | "mainnet"
): string => {
  return addresses[network ?? config.defaultNetwork][name];
};
