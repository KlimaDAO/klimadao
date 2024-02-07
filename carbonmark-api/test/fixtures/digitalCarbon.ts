import {
  BridgeProtocol,
  CarbonCredit,
  CarbonPool,
  CarbonPoolCreditBalance,
  CarbonPoolDailySnapshot,
  ProvenanceType,
  Registry,
} from "../../src/.generated/types/digitalCarbon.types";

import {
  aCarbonProject,
  aProvenanceRecord,
  aRetire,
  anAccount,
} from "../../src/.generated/mocks/digitalCarbon.mocks";

// /** Fixtures for the polygon-digital-carbon subgraph */

const creditBalance: Partial<CarbonPoolCreditBalance> = {
  id: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
};

const dailySnapshot: Partial<CarbonPoolDailySnapshot> = {
  id: "0xaa7dbd1598251f856c12f63557a4c4397c253cea014b0000",
  lastUpdateTimestamp: "1628582400",
};

const poolBalance: Partial<CarbonPoolCreditBalance> = {
  balance: "320307910491148199345054",
  id: "0x2f800db0fdb5223b3c3f354886d907a671414a7fb139c4cc9d20a3618e9a2268d73eff18c496b99",
  deposited: "320308000000000000000000",
  redeemed: "89508851800654946",
  pool: {
    name: "Toucan Protocol: Base Carbon Tonne",
    supply: "18546102526284342155938612",
    id: "0x2f800db0fdb5223b3c3f354886d907a671414a7f",
    decimals: 18,
    creditBalances: [creditBalance as CarbonPoolCreditBalance],
    crossChainSupply: "0",
    dailySnapshots: [dailySnapshot as CarbonPoolDailySnapshot],
  } as CarbonPool,
};

const digitalCarbonProjectWithoutCredits = aCarbonProject({
  id: "VCS-191",
  name: "Grid-connected electricity generation from renewable sources",
  projectID: "VCS-191",
  methodologies: "ACM0002",
  country: "China",
  category: "Renewable Energy",
  registry: Registry.VERRA,
  region: "Asia",
});

const carbonCredit: Partial<CarbonCredit> = {
  vintage: 2011,
  currentSupply: "320308000000000000000000",
  id: "0xb139c4cc9d20a3618e9a2268d73eff18c496b991",
  crossChainSupply: "0",
  bridgeProtocol: BridgeProtocol.TOUCAN,
  bridged: "320308000000000000000000",
  retired: "0",
  poolBalances: [poolBalance as CarbonPoolCreditBalance],
  project: digitalCarbonProjectWithoutCredits,
};

export const digitalCarbonProject = aCarbonProject({
  id: "VCS-191",
  name: "Grid-connected electricity generation from renewable sources",
  projectID: "VCS-191",
  methodologies: "ACM0002",
  country: "China",
  category: "Renewable Energy",
  registry: Registry.VERRA,
  region: "Asia",
  carbonCredits: [carbonCredit as CarbonCredit],
});

const account1 = anAccount({
  id: "0x0a1g3hcbteay53hd9ee1q8e06b56e8cd6767z52",
});
const account2 = anAccount({
  id: "0x0a1g3hcbteay53hd9ee1q8e06b56e8cd6767z52",
});

const retirement = aRetire({
  id: "0x0a1g3hcbteay53hd9ee1q8e06b56e8cd6767z52a01000000",
  hash: "0xa049a8354af988a4285eadc5c540590d26d95bca1c6a85c873e32a5c280e7509",
  bridgeID: "6787",
  amount: "3000000000000000000",
  beneficiaryAddress: account1,
  beneficiaryName: "john",
  retirementMessage: "burn this CO2",
  retiringAddress: account2,
  retiringName: "",
  timestamp: "1701095367",
  credit: carbonCredit as CarbonCredit,
});

const provenanceRecordWithoutPriorRecords = aProvenanceRecord({
  id: "0xc645b80fdaa23d14e9d59626ba3fz72e8a59d4cb00000000000000000000000000000000000000007d030000",
  transactionType: ProvenanceType.RETIREMENT,
  registrySerialNumbers: [],
  token: "0xc645b80zd8a23a1459d59626ba3f872e8a59d4cb",
  sender: "0xace5id96z5371fb2a068986d32c85de8e6e995f8",
  receiver: "0x0000000000000000000000000000000000000000",
  originalAmount: "3000000000000000000",
  remainingAmount: "3000000000000000000",
  createdAt: "1701095377",
  updatedAt: "1701095377",
  priorRecords: [],
});
const provenanceRecord = aProvenanceRecord({
  ...provenanceRecordWithoutPriorRecords,
  priorRecords: [provenanceRecordWithoutPriorRecords],
});

const empty_countries = {
  data: {
    carbonProjects: [],
  },
};

const fixtures = {
  empty_countries,
  carbonCredit,
  poolBalance,
  digitalCarbonProject,
  retirement,
  provenanceRecord,
};

export default fixtures;
