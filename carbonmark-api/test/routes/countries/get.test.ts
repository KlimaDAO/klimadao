import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../../src/app.constants";
import { ICR_API } from "../../../src/utils/ICR/ICR_API_endpoints";
import { build } from "../../helper";
import {
  COUNTRIES,
  COUNTRY_CODES,
  DEV_URL,
  ERROR,
  VINTAGES,
} from "../../test.constants";

jest.mock("../../../src/utils/ICR/ICR_API_endpoints", () => ({
  ICR_API: () => ({
    ICR_API_URL: "https://api.carbonregistry.com/v0",
  }),
}));

describe("GET /countries", () => {
  let fastify: FastifyInstance;
  let ICR_API_URL: string;

  // Setup the server
  beforeEach(async () => {
    const icrApiValues = ICR_API("polygon");
    ICR_API_URL = icrApiValues.ICR_API_URL;

    fastify = await build();
    nock.cleanAll();
  });

  /** A default response for offsets */
  beforeEach(() =>
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: COUNTRIES } })
  );

  /** The happy path */
  test("Success", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { countries: COUNTRIES } });

    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: COUNTRIES } });

    nock(ICR_API_URL).get("/public/projects/filters").reply(200, {
      vintages: VINTAGES,
      countryCodes: COUNTRY_CODES,
    });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/countries`,
    });

    const data = await response.json();

    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(COUNTRIES);
  });

  // /** An issue with one of the graph APIs */
  test("Graph Error", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        errors: [ERROR],
      });

    nock(GRAPH_URLS["polygon"].digitalCarbon).post("").reply(200, []);

    nock(ICR_API_URL).get("/public/projects/filters").reply(200, {
      vintages: VINTAGES,
      countryCodes: COUNTRY_CODES,
    });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/countries`,
    });

    expect(response.body).toContain("Graph error occurred");
    expect(response.statusCode).toEqual(502);
  });

  test("Empty data", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { countries: [] } });

    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: [] } });

    nock(ICR_API_URL).get("/public/projects/filters").reply(200, {
      vintages: [],
      countryCodes: [],
    });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/countries`,
    });

    expect(response.statusCode).toBe(200);
    const data = await response.json();
    expect(data).toEqual([]);
  });

  test("Invalid data", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, { data: { categories: "invalid data" } });

    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, { data: { carbonProjects: "invalid data" } });

    nock(ICR_API_URL).get("/public/projects/filters").reply(200, {
      vintages: "invalid data",
      countryCodes: "invalid data",
    });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/countries`,
    });

    expect(response.statusCode).toEqual(502);
    expect(response.body).toContain(
      "Response from server did not match schema definition"
    );
  });
});
