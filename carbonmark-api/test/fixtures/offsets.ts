import { aCarbonOffset } from "../../src/.generated/mocks/offsets.mocks";
import { POOL_INFO } from "../../src/routes/projects/projects.constants";

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

/** Fixtures for the polygon-bridged-carbon subgraph */
const fixtures = {
  /** VCS-191-2008 entry from subgraph */
  offset,
};

export default fixtures;
