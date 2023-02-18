export interface KlimaRetire {
  id: string;
  timestamp: string;
  index: string;
  pool: string; // mainnet address for retirement tokens
  beneficiaryAddress: string;
  beneficiary: string;
  retirementMessage: string;
  amount: string;
  transaction: {
    id: string;
  };
  offset: {
    id: string;
    tokenAddress: string;
    totalRetired: string; // "0" if bridge is "Moss"
    projectID: string; // starts with 'VCS-' if registry is "Verra"
    country: string;
    region: string;
    bridge: string; // "Toucan", "Moss" or "C3"
    registry: string; // "Verra" or "VCS"
    standard: string; // "VCS" or "" for Moss
    vintage: string;
    methodology: string;
    methodologyCategory: string;
    category: string;
  };
  pending?: undefined;
}

/** When the subgraph index is behind, we can still use the storage contract to return the following info */
export interface PendingKlimaRetire {
  beneficiaryAddress: string;
  beneficiary: string;
  retirementMessage: string;
  amount: string;
  pending: true;
}

export interface QueryKlimaRetires {
  data: {
    klimaRetires: KlimaRetire[];
  };
}
