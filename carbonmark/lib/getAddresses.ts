import { addresses } from "@klimadao/lib/constants";

export const getMarketplaceAddress = (): string =>
  addresses["mainnet"].marketplace; // testnet and mainnet have the same address, change mainnet address for GO LIVE
