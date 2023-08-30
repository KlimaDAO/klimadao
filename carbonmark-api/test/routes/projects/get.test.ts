import { FastifyInstance } from "fastify";
import nock from "nock";
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
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";

const mockMarketplaceProject = aMarketplaceProject({
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

const MOCKS: [string, string, any][] = [
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

const mockGqlRequest = ([url, query, response]: (typeof MOCKS)[number]) => {
  nock(url)
    .post("", (body) => body.query.includes(query))
    .reply(200, { data: response });
};

describe("GET /projects", () => {
  let fastify: FastifyInstance;

  // Setup the server
  afterEach(async () => await fastify.close());
  beforeEach(async () => {
    fastify = await build();
  });

  /** A default response for offsets */
  beforeEach(() => {
    //Setup our gql mocks
    MOCKS.forEach(mockGqlRequest);
  });

  /** The happy path */
  test.only("Success", async () => {
    mockGqlRequest([
      GRAPH_URLS.marketplace,
      "findProjects",
      {
        projects: [mockMarketplaceProject],
      },
    ]);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });

    const data = await response.json();

    expect(response.statusCode).toEqual(200);
    expect(data).toMatchObject([mockMarketplaceProject]);
  });

  /** An issue with one of the graph APIs */
  test("Graph Error", async () => {});

  /** Check that duplicate projects are removed from the results */
  test("Duplicate projects in pools and marketplace", async () => {});

  test("Empty data", async () => {});

  test("Invalid data", async () => {});
});
