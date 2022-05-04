export interface KlimaRetire {
  id: string;
  timestamp: string;
  beneficiaryAddress: string;
  beneficiary: string;
  retirementMessage: string;
  amount: string;
  transaction: {
    id: string;
    timestamp: string;
  };
  offset: {
    id: string;
    tokenAddress: string;
  };
}

export interface QueryKlimaRetires {
  data: {
    klimaRetires: KlimaRetire[];
  };
}
