import { FastifyInstance } from "fastify";
import nock from "nock";
import {
  GRAPH_URLS,
  SANITY_URLS,
} from "../../../src/graphql/codegen.constants";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";
import { GQLMockDefinition, mockGqlRequest } from "../../utils";
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

  //Ensure the api still returns projects when no CMS data exists
  test("Project missing CMS Data", async () => {
    const mocks: GQLMockDefinition[] = [
      [SANITY_URLS.carbonProjects, "getAllProjects", { allProject: [] }],
      [
        GRAPH_URLS.marketplace,
        "findProjects",
        {
          projects: [mockMarketplaceProject],
        },
      ],
      [
        SANITY_URLS.carbonProjects,
        "getAllProjectContent",
        { allProjectContent: [] },
      ],
    ];
    mocks.forEach(mockGqlRequest);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/projects`,
    });

    const data = await response.json();
    expect(response.statusCode).toBe(200);
    expect(data).toMatchObject([mockMarketplaceProject]);
  });
});
