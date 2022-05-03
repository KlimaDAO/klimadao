export interface KlimaRetire {
  id: string;
  timestamp: string;
  retiringAddress: string;
  beneficiaryAddress: string;
  beneficiary: string;
  retirementMessage: string;
  pool: string;
  amount: string;
  transaction: {
    id: string;
    timestamp: string;
    value: string;
    blockHash: string;
  };
  offset: {
    id: string;
    name: string;
    tokenAddress: string;
    bridge: string;
    vintage: string;
    projectID: string;
  };
}

export interface QueryKlimaRetires {
  data: {
    klimaRetires: KlimaRetire[];
  };
}
