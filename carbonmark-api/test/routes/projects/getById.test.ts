import { FastifyInstance } from "fastify";
import { GRAPH_URLS } from "../../../src/graphql/codegen.constants";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";
import { mockGqlRequest } from "../../utils";
import {
  MOCKS,
  mockMarketplaceProject,
  mockOffsetProject,
} from "./projects.mocks";

describe("GET /projects/{id}", () => {
  let fastify: FastifyInstance;

  // Setup the server
  afterEach(async () => await fastify.close());
  beforeEach(async () => {
    fastify = await build();
  });

  beforeEach(() => {
    //Setup our gql mocks
    MOCKS.forEach(mockGqlRequest);
  });

  /** The happy path */
  test("Success", async () => {
    mockGqlRequest([
      GRAPH_URLS.marketplace,
      "getProjectsById",
      { projects: [mockMarketplaceProject] },
    ]);
    mockGqlRequest([
      GRAPH_URLS.offsets,
      "getCarbonOffsetsByProjectAndVintage",
      { carbonOffsets: [mockOffsetProject] },
    ]);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects/VCS-191-2008`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toMatchObject(mockMarketplaceProject);
  });
});
