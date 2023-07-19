import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../src/constants/graphs.constants";
import { build } from "../helper";
import { DEV_URL } from "../test.constants";
import { CATEGORIES, ERROR } from "./routes.mock";

describe("GET /categories", () => {
  let fastify: FastifyInstance;

  // Setup the server
  afterEach(async () => await fastify.close());
  beforeEach(async () => {
    fastify = await build();
  });

  /** A default response for offsets */
  beforeEach(() =>
    nock(GRAPH_URLS.offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [] } })
  );

  /** An issue with one of the graph APIs */
  test("Graph Error", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/categories`,
    });

    expect(response.body).toContain("User not found");
    expect(response.statusCode).toEqual(502);
  });

  /** The happy path */
  test("Success", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { categories: CATEGORIES } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/categories`,
    });

    const data = await response.json();

    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(CATEGORIES);
  });

  test("Empty data", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { categories: [] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/categories`,
    });

    expect(response.statusCode).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
  });

  test("Invalid data", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { categories: "invalid data" } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/categories`,
    });

    expect(response.statusCode).toEqual(502);
    expect(response.body).toContain(
      "Response from server did not match schema definition"
    );
  });
});
