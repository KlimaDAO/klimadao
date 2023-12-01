export interface KlimaRetire {
  id: string;
  timestamp: string;
  index: string;
  pool: string; // mainnet address for retirement tokens. 0x000 for tco2s
  beneficiaryAddress: string;
  beneficiary: string;
  retirementMessage: string;
  amount: string;
  transaction: {
    id: string;
  };
  offset: {
    name: string; // Name of project, not present on all
    id: string;
    tokenAddress: string;
    totalRetired: string; // "0" if bridge is "Moss"
    projectID: string; // starts with 'VCS-' if registry is "Verra"
    country: string;
    region: string;
    bridge: "Toucan" | "Moss" | "C3";
    registry: string; // "Verra" or "VCS"
    standard: string; // "VCS" or "" for Moss
    vintage: string;
    vintageYear: string;
    methodology: string;
    methodologyCategory: string;
    category: string;
    currentSupply: string;
  };
}

export interface QueryKlimaRetires {
  data: {
    klimaRetires: KlimaRetire[];
  };
}
