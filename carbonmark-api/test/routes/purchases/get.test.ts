import { FastifyInstance } from "fastify";
import { pick } from "lodash";
import nock from "nock";
import { aPurchase } from "../../../src/.generated/mocks/marketplace.mocks";
import { GRAPH_URLS } from "../../../src/app.constants";
import { Purchase } from "../../../src/models/Purchase.model";
import { build } from "../../helper";
import { DEV_URL, ERROR } from "../../test.constants";

const mockPurchase = aPurchase();

const responseFixture: Purchase = {
  ...pick(mockPurchase, ["amount", "id", "price"]),
  buyer: {
    id: mockPurchase.user.id,
  },
  seller: {
    id: mockPurchase.listing.seller.id,
  },
  listing: {
    id: mockPurchase.listing.id,
    project: {
      ...pick(mockPurchase.listing.project, [
        "key",
        "methodology",
        "name",
        "projectID",
        "vintage",
      ]),
      country: mockPurchase.listing.project?.country?.id || "",
    },
  },
};

describe("GET /purchases/:id", () => {
  let fastify: FastifyInstance;

  // Setup the server
  beforeEach(async () => {
    fastify = await build();
  });

  /** The happy path */
  test("Success", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { purchases: [mockPurchase] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/1234`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(responseFixture);
  });

  test("Accept polygon network param", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { purchases: [mockPurchase] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/1234?network=polygon`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(responseFixture);
  });

  test("Accept mumbai network param", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { purchases: [mockPurchase] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/1234?network=polygon`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(200);
    expect(data).toEqual(responseFixture);
  });

  test("Reject unknown network param", async () => {
    // Mock the response from the graph
    nock(GRAPH_URLS.marketplace)
      .post("")
      .reply(200, { data: { purchases: [mockPurchase] } });

    const response = await fastify.inject({
      method: "GET",
      url: `${DEV_URL}/purchases/1234?network=ethereum`,
    });

    const data = await response.json();
    expect(response.statusCode).toEqual(400);
    expect(data.error).toEqual("Bad Request");
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
    // silence expected console errors
    const mockConsole = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

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
    mockConsole.mockRestore();
  });
});
