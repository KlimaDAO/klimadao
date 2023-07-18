import Fastify from "fastify";
import fp from "fastify-plugin";
import nock from "nock";
import app from "../../src/app";
import { GRAPH_URLS } from "../../src/constants/graphs.constants";
import { DEV_URL } from "../test.constants";
import { CATEGORIES, ERROR } from "./categories.mock";

describe("GET /categories", () => {
  const fastify = Fastify();

  beforeAll(async () => {
    void fastify.register(fp(app));
    await fastify.ready();

    // Block outside http requests
    nock.disableNetConnect();
  });

  // Remove any stale mocks between tests
  beforeEach(() => nock.cleanAll());

  // Close the server after all tests
  afterAll(() => fastify.close());

  /** An issue with one of the graph APIs */
  test("Graph Error", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });

    nock(GRAPH_URLS.offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [] } });

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

    nock(GRAPH_URLS.offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [] } });

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

    nock(GRAPH_URLS.offsets)
      .post("")
      .reply(200, { data: { carbonOffsets: [] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/categories`,
    });

    expect(response.statusCode).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
  });
});

// t.test("GET /categories", async (main) => {
//   const app = await build(main);

//   // t.test("Empty data", async (t) => {
//   //   t.plan(2);
//   //   nock(GRAPH_URLS.marketplace)
//   //     .post("")
//   //     .reply(200, { data: { categories: [] } });

//   //   const response = await app.inject({
//   //     method: "GET",
//   //     url: `${DEV_URL}/categories`,
//   //   });

//   //   t.equal(response.statusCode, 200, "Should return success status");
//   //   const data = await response.json();
//   //   t.same(data, [], "Expected empty data");
//   // });

//   // t.test("Invalid data", async (t) => {
//   //   t.plan(2);
//   //   nock(GRAPH_URLS.marketplace)
//   //     .post("")
//   //     .reply(200, { data: { categories: "invalid data" } });

//   //   const response = await app.inject({
//   //     method: "GET",
//   //     url: `${DEV_URL}/categories`,
//   //   });

//   //   t.equal(response.statusCode, 200, "Should return success status");
//   //   const data = await response.json();
//   //   t.notSame(
//   //     data,
//   //     MOCK_CATEGORIES,
//   //     "Expected data not to match MOCK_CATEGORIES"
//   //   );
//   // });
// });
