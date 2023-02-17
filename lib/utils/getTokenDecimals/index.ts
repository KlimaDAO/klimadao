/** get the decimals for given token name */
export const getTokenDecimals = (
  tkn: "usdc" | "klima" | "sklima" | string,
  network: "mainnet" | "testnet" = "mainnet"
): 9 | 6 | 18 => {
  if (tkn === "usdc" && network !== "testnet") return 6;
  if (tkn === "klima" || tkn === "sklima") return 9;
  return 18;
};
