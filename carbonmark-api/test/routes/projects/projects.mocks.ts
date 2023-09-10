import { GQLMockDefinition } from "test/utils";
import {
  aProject as aCarbonProject,
  aProjectContent as aCarbonProjectContent,
} from "../../../src/.generated/mocks/carbonProjects.mocks";
import {
  aListing,
  aProject as aMarketplaceProject,
} from "../../../src/.generated/mocks/marketplace.mocks";
import { aCarbonOffset as aOffsetProject } from "../../../src/.generated/mocks/offsets.mocks";
import {
  GRAPH_URLS,
  SANITY_URLS,
} from "../../../src/graphql/codegen.constants";
import { POOL_INFO } from "../../../src/routes/projects/projects.constants";
import { CarbonProject } from "../../../src/utils/helpers/carbonProjects.utils";

export const mockListing = aListing({
  singleUnitPrice: "99000000",
  leftToSell: "100000000000000000000",
  updatedAt: "1234",
});

export const mockMarketplaceProject = aMarketplaceProject({
  projectID: "191",
  registry: "VCS",
  key: "VCS-191",
  listings: [mockListing],
  vintage: "2008",
  updatedAt: "1234",
});

export const mockOffsetProject = aOffsetProject({
  tokenAddress: POOL_INFO.bct.defaultProjectTokenAddress,
  balanceBCT: "123456.123456789012345678",
  balanceNCT: "0",
  balanceUBO: "0",
  balanceNBO: "0",
  projectID: "VCS-191",
  vintageYear: "2008",
  methodologyCategory: "Energy",
});

const carbonProject = aCarbonProject({
  country: "China",
  registry: "VCS",
  registryProjectId: "191",
});
const mockCarbonProjectContent = aCarbonProjectContent({
  project: carbonProject,
  shortDescription: "Short description for vcs-191",
  longDescription: "Long description for vcs-191",
});

// Generated types are wrong, id is string - https://github.com/KlimaDAO/klimadao/issues/1500
export const mockCarbonProject: CarbonProject = {
  ...carbonProject,
  // override these because the type from aProject() is wrong
  id: "VCS-191",
  methodologies: [
    {
      id: "ACM0002",
      category: "Renewable Energy",
      name: "Grid-connected electricity generation from renewable sources",
    },
  ],
  content: mockCarbonProjectContent,
};

const poolPrices = {
  bct: {
    poolName: "bct",
    defaultPrice: "1.23456",
    selectiveRedeemPrice: "2.23456",
  },
  nct: {
    poolName: "nct",
    defaultPrice: "2.23456",
    selectiveRedeemPrice: "3.23456",
  },
  ubo: {
    poolName: "ubo",
    defaultPrice: "3.23456",
    selectiveRedeemPrice: "4.23456",
  },
  nbo: {
    poolName: "nbo",
    defaultPrice: "4.23456",
    selectiveRedeemPrice: "5.23456",
  },
};

export const MOCKS: GQLMockDefinition[] = [
  [GRAPH_URLS.offsets, "getCarbonOffsetsCategories", { carbonOffsets: [] }],
  [GRAPH_URLS.offsets, "getCarbonOffsetsCountries", { carbonOffsets: [] }],
  [GRAPH_URLS.offsets, "getCarbonOffsetsVintages", { carbonOffsets: [] }],
  [
    GRAPH_URLS.offsets,
    "findCarbonOffsets",
    { carbonOffsets: [mockOffsetProject] },
  ],
  [GRAPH_URLS.marketplace, "getCountries", { countries: [] }],
  [GRAPH_URLS.marketplace, "getCategories", { categories: [] }],
  [GRAPH_URLS.marketplace, "getVintages", { projects: [] }],
  [GRAPH_URLS.tokens, "getPoolPrices", poolPrices],
  [
    SANITY_URLS.carbonProjects,
    "getProject",
    { allProject: [mockCarbonProject] },
  ],
  [
    SANITY_URLS.carbonProjects,
    "getAllProjects",
    { allProject: [mockCarbonProject] },
  ],
  [
    SANITY_URLS.carbonProjects,
    "getProjectContent",
    { allProjectContent: [mockCarbonProjectContent] },
  ],
  [
    SANITY_URLS.carbonProjects,
    "getAllProjectContent",
    { allProjectContent: [mockCarbonProjectContent] },
  ],
];
