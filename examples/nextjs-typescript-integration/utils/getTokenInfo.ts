const tokenInfo = {
  usdc: { address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", decimals: 6 }, // USDC.e
  bct: { address: "0x2f800db0fdb5223b3c3f354886d907a671414a7f", decimals: 18 },
  nct: { address: "0xD838290e877E0188a4A44700463419ED96c16107", decimals: 18 },
  ubo: { address: "0x2B3eCb0991AF0498ECE9135bcD04013d7993110c", decimals: 18 },
  nbo: { address: "0x6BCa3B77C1909Ce1a4Ba1A20d1103bDe8d222E48", decimals: 18 },
};

export const getTokenInfo = (key: keyof typeof tokenInfo) => {
  return tokenInfo[key];
};
