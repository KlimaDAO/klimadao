import {
  aCarbonCredit,
  aCarbonPool,
  aCarbonPoolCreditBalance,
  aCarbonProject,
} from "../../src/.generated/mocks/digitalCarbon.mocks";
import { POOL_INFO } from "../../src/routes/projects/get.constants";

const TCO2_VCS_981_2017 = "0xeaa9938076748d7edd4df0721b3e3fe4077349d3";
const C3T_VCS_981_2017 = "0x7dbeebf8c2356ff8c53e41928c9575054a6f331b";

const uboPool = aCarbonPool({
  id: POOL_INFO.nbo.poolAddress,
  decimals: 18,
  name: "Universal Basic Offset",
  supply: "21202280666164910248664",
});
const nboPool = aCarbonPool({
  id: POOL_INFO.nbo.poolAddress,
  decimals: 18,
  name: "Nature Based Offset",
  supply: "31202280666164910248664",
});
const nctPool = aCarbonPool({
  id: POOL_INFO.nct.poolAddress,
  name: "Toucan Protocol: Nature Carbon Tonne",
  supply: "1604659955808874505539565",
  decimals: 18,
});
const bctPool = aCarbonPool({
  id: POOL_INFO.bct.poolAddress,
  name: "Toucan Protocol: Base Carbon Tonne",
  supply: "18545844499823544157213608",
  decimals: 18,
});
const poolBalance_NBO = aCarbonPoolCreditBalance({
  balance: "26202320013669175484739",
  pool: nboPool,
  deposited: "28903000000000000000000",
  redeemed: "2700679986330824515261",
});
const poolBalance_NCT = aCarbonPoolCreditBalance({
  balance: "137168659539439210",
  pool: nctPool,
  deposited: "19048774113647802186879",
  redeemed: "17724636944988262747669",
});
const poolBalance_BCT = aCarbonPoolCreditBalance({
  balance: "0", // all redeemed and moved to TCO2
  pool: bctPool,
  deposited: "142330703112744844598983",
  redeemed: "142330703112744844598983",
});
const carbonCredit_C3T = aCarbonCredit({
  vintage: 2017,
  bridged: "28903000000000000000000",
  retired: "2645744986330824515261",
  currentSupply: "26257255013669175484739",
  poolBalances: [poolBalance_NBO],
  id: C3T_VCS_981_2017,
});
const carbonCredit_TCO2 = aCarbonCredit({
  vintage: 2017,
  bridged: "73794000000000000000000",
  retired: "6709707416786222240581",
  currentSupply: "62876512583213777759419",
  poolBalances: [poolBalance_BCT, poolBalance_NCT],
  id: TCO2_VCS_981_2017,
});
/** A project with two pool prices (1 empty pool) */
const carbonProject = aCarbonProject({
  projectID: "VCS-981",
  name: "Pacajai REDD+ Project",
  methodologies: "VM0015",
  id: "VCS-981",
  country: "Brazil",
  category: "Forestry",
  carbonCredits: [carbonCredit_TCO2, carbonCredit_C3T],
});

/** Fixtures for the polygon-bridged-carbon subgraph */
const fixtures = {
  carbonProject,
  bctPool,
  nctPool,
  uboPool,
  nboPool,
};

export default fixtures;
