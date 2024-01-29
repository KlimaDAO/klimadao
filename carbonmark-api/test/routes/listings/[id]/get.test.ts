import { FastifyInstance } from "fastify";
import { fixtures } from "../../../fixtures";
import { build } from "../../../helper";
import { DEV_URL } from "../../../test.constants";
import { mockGraphResponses } from "./get.test.mocks";

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

  test("Returns listing with token id if ICR project", async () => {
    mockGraphResponses({
      listing: fixtures.marketplace.icrListing,
      tokenId: fixtures.tokens.token,
    });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/listings/0x123`,
    });
    expect(response.statusCode).toEqual(200);
    const json = await response.json();
    expect(json.tokenId).toEqual(fixtures.tokens.token.id);
  });

  test("Returns listing with token symbol", async () => {
    mockGraphResponses({
      listing: fixtures.marketplace.listing,
      symbol: fixtures.tokens.token,
    });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/listings/0x123`,
    });
    expect(response.statusCode).toEqual(200);
    const json = await response.json();
    expect(json.symbol).toEqual(fixtures.tokens.token.symbol);
  });

  test("Returns 404 when listing is not found", async () => {
    mockGraphResponses({ symbol: fixtures.tokens.token });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/listings/0x123`,
    });
    expect(response.statusCode).toEqual(404);
  });

  test("Returns 500 when token symbol is not found", async () => {
    mockGraphResponses({ listing: fixtures.marketplace.listing });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/listings/0x123`,
    });
    expect(response.statusCode).toEqual(500);
  });

  test("Returns 500 when tokenId is not found", async () => {
    mockGraphResponses({ listing: fixtures.marketplace.icrListing });
    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/listings/0x123`,
    });
    expect(response.statusCode).toEqual(500);
  });
});
