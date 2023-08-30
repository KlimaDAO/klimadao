import { FastifyInstance } from "fastify";
import nock from "nock";
import { aProject as aCmsProject } from "../../../src/.generated/mocks/carbonProjects.mocks";
import { aProject as aMarketplaceProject } from "../../../src/.generated/mocks/marketplace.mocks";
import {
  GRAPH_URLS,
  SANITY_URLS,
} from "../../../src/graphql/codegen.constants";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";
import { mockGqlRequest } from "../../utils";
import { ERROR } from "../routes.mock";
import { MOCKS, mockMarketplaceProject, mockOffsetProject } from "./get.mocks";

describe("GET /projects", () => {
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
  test("Graph Error", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    expect(response.body).toContain("Graph error occurred");
    expect(response.statusCode).toEqual(502);
  });

  /** Check that duplicate projects are removed from the results */
  test("Duplicate projects in pools and marketplace", async () => {
    mockGqlRequest([
      GRAPH_URLS.marketplace,
      "findProjects",
      {
        projects: [mockMarketplaceProject],
      },
    ]);

    mockGqlRequest([
      GRAPH_URLS.offsets,
      "",
      {
        projects: [mockOffsetProject],
      },
    ]);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toMatchObject([mockMarketplaceProject]);
    expect(data).not.toMatchObject([mockOffsetProject]);
  });

  test("Empty data", async () => {
    mockGqlRequest([
      GRAPH_URLS.marketplace,
      "findProjects",
      {
        projects: [],
      },
    ]);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });
    expect(response.statusCode).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
  });

  test.only("Search", async () => {
    const mockCmsProject = aCmsProject({
      registryProjectId: "2",
      registry: "b",
      country: "Bahamas",
    });
    const mockBahamasProject = aMarketplaceProject({
      projectID: "2",
      registry: "b",
      country: { id: "Bahamas" },
    });

    mockGqlRequest([
      SANITY_URLS.carbonProjects,
      "",
      { allProject: [mockCmsProject] },
    ]);
    mockGqlRequest([
      GRAPH_URLS.marketplace,
      "findProjects",
      {
        projects: [mockMarketplaceProject, mockBahamasProject],
      },
    ]);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects?country=Bahamas`,
    });
    expect(response.statusCode).toBe(200);
    const data = await response.json();
    expect(data).toMatchObject([mockBahamasProject]);
  });

  test.todo("handles missing cms data");

  //Check that the cheapest project is returned when duplicates exist in multiple graphs
  test.todo("returns cheapest project");
});
