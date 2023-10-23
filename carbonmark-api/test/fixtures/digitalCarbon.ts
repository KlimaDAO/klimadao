import {
  BridgeProtocol,
  CarbonCredit,
  CarbonPool,
  CarbonPoolCreditBalance,
  CarbonPoolDailySnapshot,
  Registry,
} from "../../src/.generated/types/digitalCarbon.types";

import { aCarbonProject } from "../../src/.generated/mocks/digitalCarbon.mocks";

type PartialCarbonPoolCreditBalance = Partial<CarbonPoolCreditBalance>;

type PartialCarbonPoolDailySnapshot = Partial<CarbonPoolDailySnapshot>;

// /** Fixtures for the polygon-digital-carbon subgraph */

const creditBalance: PartialCarbonPoolCreditBalance = {
  id: "0xb0d34b2ec3b47ba1f27c9d4e8520f8fa38ef538d",
};

const dailySnapshot: PartialCarbonPoolDailySnapshot = {
  id: "0xaa7dbd1598251f856c12f63557a4c4397c253cea014b0000",
  lastUpdateTimestamp: "1628582400",
};

const poolBalance: PartialCarbonPoolCreditBalance = {
  balance: "320307910491148199345054",
  id: "0x2f800db0fdb5223b3c3f354886d907a671414a7fb0d34b2ec3b47ba1f27c9d4e8520f8fa38ef538d",
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

type PartialCarbonCredit = Partial<CarbonCredit>;

const carbonCredit: PartialCarbonCredit = {
  vintage: 2011,
  currentSupply: "320308000000000000000000",
  id: "0xb0d34b2ec3b47ba1f27c9d4e8520f8fa38ef538d",
  crossChainSupply: "0",
  bridgeProtocol: BridgeProtocol.Toucan,
  bridged: "320308000000000000000000",
  retired: "0",
  poolBalances: [poolBalance as CarbonPoolCreditBalance],
};

const digitalCarbonProject = aCarbonProject({
  id: "VCS-191",
  name: "Grid-connected electricity generation from renewable sources",
  projectID: "VCS-191",
  methodologies: "ACM0002",
  country: "China",
  category: "Renewable Energy",
  registry: Registry.Verra,
  region: "Asia",
  carbonCredits: [carbonCredit as CarbonCredit],
});

const empty_countries = {
  data: {
    carbonProjects: [],
  },
};

const fixtures = {
  empty_countries,
  digitalCarbonProject,
};

export default fixtures;
