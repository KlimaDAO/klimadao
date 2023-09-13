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

const creditBalance: PartialCarbonPoolCreditBalance = {
  id: "0xaa7dbd1598251f856c12f63557a4c4397c253ceaaa7dbd1598251f856c12f63557a4c4397c253cea",
};

const dailySnapshot: PartialCarbonPoolDailySnapshot = {
  id: "0xaa7dbd1598251f856c12f63557a4c4397c253cea014b0000",
};

const poolBalance: PartialCarbonPoolCreditBalance = {
  balance: "0",
  id: "0xaa7dbd1598251f856c12f63557a4c4397c253ceaaa7dbd1598251f856c12f63557a4c4397c253cea",
  deposited: "0",
  redeemed: "0",
  pool: {
    name: "Moss Carbon Credit (PoS)",
    supply: "312781489636583528430443",
    id: "0xaa7dbd1598251f856c12f63557a4c4397c253cea",
    decimals: 18,
    creditBalances: [creditBalance as CarbonPoolCreditBalance],
    crossChainSupply: "0",
    dailySnapshots: [dailySnapshot as CarbonPoolDailySnapshot],
  } as CarbonPool,
};

type PartialCarbonCredit = Partial<CarbonCredit>;

const carbonCredit: PartialCarbonCredit = {
  vintage: 2021,
  currentSupply: "312781489636583528430443",
  id: "0xaa7dbd1598251f856c12f63557a4c4397c253cea",
  crossChainSupply: "0",
  bridgeProtocol: BridgeProtocol.Moss,
  bridged: "863113930784517728586729",
  retired: "17078058859699017192441",
  poolBalances: [poolBalance as CarbonPoolCreditBalance],
};

const carbonProject = aCarbonProject({
  id: "Moss",
  name: "",
  projectID: "Moss",
  methodologies: "",
  country: "",
  category: "",
  registry: Registry.Verra,
  region: "",
  carbonCredits: [carbonCredit as CarbonCredit],
});

const countries = {
  data: {
    carbonProjects: [
      {
        country: "",
      },
      {
        country: "",
      },
      {
        country: "Brazil",
      },
      {
        country: "India",
      },
      {
        country: "India",
      },
      {
        country: "China",
      },
      {
        country: "China",
      },
      {
        country: "Congo",
      },
      {
        country: "",
      },
      {
        country: "India",
      },
      {
        country: "Brazil",
      },
    ],
  },
};

const empty_countries = {
  data: {
    carbonProjects: [],
  },
};

const fixtures = {
  countries,
  empty_countries,
  carbonProject,
};

export default fixtures;
