import { FastifyInstance } from "fastify";
import nock from "nock";
import { aProject } from "../../../src/.generated/mocks/marketplace.mocks";
import { GRAPH_URLS, ICR_API } from "../../../src/app.constants";
import { COUNTRY_CODES, VINTAGES } from "../../../test/fixtures/icr";
import { build } from "../../helper";
import { DEV_URL, ERROR } from "../../test.constants";

describe("GET /vintages", () => {
  let fastify: FastifyInstance;
  let ICR_API_URL: string;

  // Setup the server
  beforeEach(async () => {
    const icrApiValues = ICR_API("polygon");
    ICR_API_URL = icrApiValues.ICR_API_URL;

    fastify = await build();
  });

  /** A default response for digital-carbon */
  beforeEach(() =>
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: [] } })
  );

  /** The happy path */
  test("Success", async () => {
    const mock = aProject();
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [mock] } });
    nock(ICR_API_URL).get("/public/projects/filters").reply(200, {
      vintages: VINTAGES,
      countryCodes: COUNTRY_CODES,
    });

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
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });

    nock(ICR_API_URL).get("/public/projects/filters").reply(200, {
      vintages: VINTAGES,
      countryCodes: COUNTRY_CODES,
    });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/vintages`,
    });

    expect(response.body).toContain("Graph error occurred");
    expect(response.statusCode).toEqual(502);
  });

  test("Empty data", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: [] } });

    nock(ICR_API_URL).get("/public/projects/filters").reply(200, {
      vintages: [],
      countryCodes: [],
    });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/vintages`,
    });

    expect(response.statusCode).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
  });

  test("Invalid data", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { projects: "invalid data" } });

    nock(ICR_API_URL).get("/public/projects/filters").reply(200, {
      vintages: "invalid data",
      countryCodes: "invalid data",
    });
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
