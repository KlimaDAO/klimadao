export interface KlimaRetire {
  id: string;
  index: string;
  retire: {
    hash: string;
    beneficiaryName: string;
    amount: string;
    retirementMessage: string;
    timestamp: string;
    beneficiaryAddress: {
      id: string;
    };
    pool: {
      id: string;
    };
    credit: {
      id: string;
      project: {
        registry: string;
        projectID: string;
        region: string;
        name: string;
        methodologies: string;
        id: string;
        country: string;
        category: string;
      };
      bridgeProtocol: "TOUCAN" | "MOSS" | "C3" | "ICR";
      vintage: string;
      currentSupply: string;
      retired: string;
      poolBalances: {
        pool: {
          id: string;
        };
      };
    };
  };
  feeAmount: string;
}

export interface QueryKlimaRetires {
  data: {
    klimaRetires: KlimaRetire[];
  };
}
