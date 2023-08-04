import { FastifyInstance } from "fastify";
import nock from "nock";
import { aPurchase } from "../../src/.generated/mocks/marketplace.mocks";
import { GRAPH_URLS } from "../../src/graphql/codegen.constants";
import { build } from "../helper";
import { DEV_URL } from "../test.constants";
import { ERROR } from "./routes.mock";

describe("GET /purchases/:id", () => {
  let fastify: FastifyInstance;

  // Setup the server
  afterEach(async () => await fastify.close());
  beforeEach(async () => {
    fastify = await build();
  });

  /** The happy path */
  test("Success", async () => {
    const mock = aPurchase();
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { purchases: [mock] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/1234`,
    });

    const data = await response.json();

    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(mock);
  });

  test("Purchase not found", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { purchases: [] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/1234`,
    });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toContain("Purchase not found");
  });

  test("Server error", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/1234`,
    });

    expect(response.statusCode).toEqual(502);
    expect(response.body).toContain("Graph error occurred");
  });
});
