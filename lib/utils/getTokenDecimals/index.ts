/** get the decimals for given token name */
export const getTokenDecimals = (
  tkn: "usdc" | "klima" | "sklima" | string
): 9 | 6 | 18 => {
  if (tkn === "usdc") return 6;
  if (tkn === "klima" || tkn === "sklima") return 9;
  return 18;
};
