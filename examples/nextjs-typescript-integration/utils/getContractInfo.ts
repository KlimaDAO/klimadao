const contractInfo = {
  klimaRetirementAggregatorV2: {
    address: "0x8cE54d9625371fb2a068986d32C85De8E6e995f8",
  },
};

export const getContractInfo = (key: keyof typeof contractInfo) => {
  return contractInfo[key];
};
