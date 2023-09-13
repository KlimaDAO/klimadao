import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../src/graphql/codegen.constants";
import digitalCarbon from "../fixtures/digitalCarbon";
import { build } from "../helper";
import { DEV_URL } from "../test.constants";
import { COUNTRIES, ERROR } from "./routes.mock";

describe("GET /countries", () => {
  let fastify: FastifyInstance;

  // Setup the server
  afterEach(async () => await fastify.close());
  beforeEach(async () => {
    fastify = await build();
    nock.cleanAll();
  });

  /** The happy path */
  test("Success", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { countries: COUNTRIES } });

    nock(GRAPH_URLS.digitalCarbon).post("").reply(200, digitalCarbon.countries);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/countries`,
    });

    const data = await response.json();
    console.log("response", data);
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(COUNTRIES);
  });

  /** An issue with one of the graph APIs */
  test("Graph Error", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });
    nock(GRAPH_URLS.digitalCarbon).post("").reply(200, digitalCarbon.countries);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/countries`,
    });

    expect(response.body).toContain("Graph error occurred");
    expect(response.statusCode).toEqual(502);
  });

  test("Empty data", async () => {
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { countries: [] } });
    nock(GRAPH_URLS.digitalCarbon)
      .post("")
      .reply(200, digitalCarbon.empty_countries);

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/countries`,
    });

    expect(response.statusCode).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
  });
});
