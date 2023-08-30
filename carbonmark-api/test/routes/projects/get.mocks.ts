import { GQLMockDefinition } from "test/utils";
import {
  aProject as aCarbonProject,
  aProjectContent as aCarbonProjectContent,
} from "../../../src/.generated/mocks/carbonProjects.mocks";
import {
  aListing,
  aProject as aMarketplaceProject,
} from "../../../src/.generated/mocks/marketplace.mocks";
import {
  GRAPH_URLS,
  SANITY_URLS,
} from "../../../src/graphql/codegen.constants";

export const mockMarketplaceProject = aMarketplaceProject({
  projectID: "1",
  registry: "a",
  listings: [aListing({ singleUnitPrice: "101" })],
});
const mockCarbonProject = aCarbonProject({
  registryProjectId: "1",
  registry: "a",
});
const mockCarbonProjectContent = aCarbonProjectContent({
  project: mockCarbonProject,
});

export const MOCKS: GQLMockDefinition[] = [
  [GRAPH_URLS.offsets, "getCarbonOffsetsCategories", { carbonOffsets: [] }],
  [GRAPH_URLS.offsets, "getCarbonOffsetsCountries", { carbonOffsets: [] }],
  [GRAPH_URLS.offsets, "getCarbonOffsetsVintages", { carbonOffsets: [] }],
  [GRAPH_URLS.offsets, "findCarbonOffsets", { carbonOffsets: [] }],
  [GRAPH_URLS.marketplace, "getCountries", { countries: [] }],
  [GRAPH_URLS.marketplace, "getCategories", { categories: [] }],
  [GRAPH_URLS.marketplace, "getVintages", { projects: [] }],
  [GRAPH_URLS.tokens, "getPoolPrices", { projects: [] }],
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
