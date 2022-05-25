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
    totalRetired: string;
    projectID: string; // starts with 'VCS-'
    country: string;
    region: string;
    bridge: string;
    registry: string;
    standard: string;
  };
}

export interface QueryKlimaRetires {
  data: {
    klimaRetires: KlimaRetire[];
  };
}
