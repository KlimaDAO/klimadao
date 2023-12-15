import { GetKlimaRetirementTransactionIdQuery } from "src/.generated/types/offsets.types";
import { aCarbonOffset } from "../../src/.generated/mocks/offsets.mocks";
import { POOL_INFO } from "../../src/routes/projects/get.constants";

/** VCS-191-2008 entry from subgraph */
const offset = aCarbonOffset({
  tokenAddress: POOL_INFO.bct.defaultProjectTokenAddress,
  balanceBCT: "123456.123456789012345678",
  balanceNCT: "0",
  balanceUBO: "0",
  balanceNBO: "0",
  projectID: "VCS-191",
  vintageYear: "2008",
  methodologyCategory: "Energy",
});

/** Answer from a getKlimaRetirementTransactionId query */
const retirementTransactionIds: GetKlimaRetirementTransactionIdQuery = {
  klimaRetires: [
    {
      transaction: {
        id: "0xc9eb3103ba879e31185abaz27f404cda8ebcda9134d3a347c813df71514ae5b5",
      },
    },
  ],
};

/** Fixtures for the polygon-bridged-carbon subgraph */
const fixtures = {
  /** VCS-191-2008 entry from subgraph */
  offset,
  retirementTransactionIds,
};

export default fixtures;
