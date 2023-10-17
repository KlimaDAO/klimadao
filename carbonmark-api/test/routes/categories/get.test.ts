import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../../src/app.constants";
import { build } from "../../helper";
import { CATEGORIES, DEV_URL, ERROR } from "../../test.constants";

describe("GET /categories", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    fastify = await build();
  });

  /** A default response for offsets */
  beforeEach(() =>
    nock(GRAPH_URLS["polygon"].offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [] } })
  );

  /** The happy path */
  test("Success", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
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

  /** An issue with one of the graph APIs */
  test("Graph Error", async () => {
    const mockConsole = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/categories`,
    });

    expect(response.body).toContain("Graph error occurred");
    expect(response.statusCode).toEqual(502);
    mockConsole.mockRestore();
  });

  test("Empty data", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
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
    const mockConsole = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    nock(GRAPH_URLS["polygon"].marketplace)
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
    mockConsole.mockRestore();
  });
});
