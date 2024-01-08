import { FastifyInstance } from "fastify";
import nock from "nock";
import { GRAPH_URLS } from "../../../../src/app.constants";
import { fixtures } from "../../../fixtures";
import { build } from "../../../helper";
import { DEV_URL } from "../../../test.constants";

describe("GET /listings/:id", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    try {
      fastify = await build();
    } catch (e) {
      console.error("/listings/:id get.test.ts setup failed", e);
    }
  });
  test("Returns listing with token symbol", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: { listing: fixtures.marketplace.listing },
      });
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: { token: fixtures.digitalCarbon.token },
      });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/listings/0x123`,
    });
    expect(response.statusCode).toEqual(200);
    const json = await response.json();
    expect(json.symbol).toEqual(fixtures.digitalCarbon.token.symbol);
  });

  test("Returns 404 when listing is not found", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: { listing: null },
      });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/listings/0x123`,
    });
    expect(response.statusCode).toEqual(404);
  });

  test("Returns 500 when token is not found", async () => {
    nock(GRAPH_URLS["polygon"].marketplace)
      .post("")
      .reply(200, {
        data: { listing: fixtures.marketplace.listing },
      });
    nock(GRAPH_URLS["polygon"].digitalCarbon)
      .post("")
      .reply(200, {
        data: { token: null },
      });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/listings/0x123`,
    });
    expect(response.statusCode).toEqual(500);
  });
});
