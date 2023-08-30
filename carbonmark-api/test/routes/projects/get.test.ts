import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../../src/graphql/codegen.constants";
import { build } from "../../helper";
import { DEV_URL } from "../../test.constants";
import { mockGqlRequest } from "../../utils";
import { ERROR } from "../routes.mock";
import { MOCKS, mockMarketplaceProject } from "./get.mocks";

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
    console.log(response);
    expect(response.body).toContain("Graph error occurred");
    expect(response.statusCode).toEqual(502);
  });

  /** Check that duplicate projects are removed from the results */
  test("Duplicate projects in pools and marketplace", async () => {});

  test("Empty data", async () => {});

  test("Invalid data", async () => {});
});
