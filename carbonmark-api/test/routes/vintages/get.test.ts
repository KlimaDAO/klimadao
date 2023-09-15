import { FastifyInstance } from "fastify";
import nock from "nock";
import { aProject } from "../../../src/.generated/mocks/marketplace.mocks";
import { GRAPH_URLS } from "../../../src/graphql/codegen.constants";
import { build } from "../../helper";
import { DEV_URL, ERROR } from "../../test.constants";

describe("GET /vintages", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    fastify = await build();
  });

  /** A default response for offsets */
  beforeEach(() =>
    nock(GRAPH_URLS.offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [] } })
  );

  /** The happy path */
  test("Success", async () => {
    const mock = aProject();
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { projects: [mock] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/vintages`,
    });

    const data = await response.json();

    expect(response.statusCode).toEqual(200);
    expect(data).toEqual([mock.vintage]);
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
      url: `${DEV_URL}/vintages`,
    });

    expect(response.body).toContain("Graph error occurred");
    expect(response.statusCode).toEqual(502);
  });

  test("Empty data", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { projects: [] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/vintages`,
    });

    expect(response.statusCode).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
  });

  test("Invalid data", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { projects: "invalid data" } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/vintages`,
    });

    expect(response.statusCode).toEqual(502);
    expect(response.body).toContain(
      "Response from server did not match schema definition"
    );
  });
});
