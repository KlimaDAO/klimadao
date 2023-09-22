import { addresses } from "@klimadao/lib/constants";

/** Grab an address based on the given `network` parameter, fallback to DEFAULT_NETWORK */
export const getAddress = (
  name: keyof typeof addresses.mainnet,
  network?: "polygon" | "mumbai"
): string => {
  const net = network === "mumbai" ? "testnet" : "mainnet";
  return addresses[net][name];
};
